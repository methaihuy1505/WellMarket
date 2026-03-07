<?php
namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Post;
use App\Services\FileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    // API Profile 
    public function profile(Request $request)
    {
        $user = $request->user()->loadCount([
            'favoritedBy as favorites_count',        // số người yêu thích mình
            'favoriteUsers as favorite_users_count', // số user mình đã yêu thích
        ]);

        return response()->json([
            'id'             => $user->id,
            'name'           => $user->name,
            'phone'          => $user->phone,
            'email'          => $user->email,
            'coins'          => $user->wallet_balance,
            'favorites'      => $user->favorites_count,
            'favorite_users' => $user->favorite_users_count,
            'avatar'         => $user->file->url ?? null,
            'avatar_key'     => $user->file->object_key ?? null,
            // Thêm ngày tham gia để frontend hiển thị
            'created_at'     => $user->created_at,
        ]);
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => 'required',
            'new_password'     => 'required|min:6|confirmed',
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['message' => 'Mật khẩu hiện tại không đúng'], 400);
        }

        $user->password = Hash::make($validated['new_password']);
        $user->save();

        return response()->json(['message' => 'Đổi mật khẩu thành công']);
    }

    public function uploadAvatar(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'file_id' => 'required|exists:files,id',
        ]);

        if ($user->avatar_file_id) {
            $oldFile = File::find($user->avatar_file_id);
            if ($oldFile) {
                $this->fileService->deleteFile($oldFile);
            }
        }

        $file                 = File::find($data['file_id']);
        $user->avatar_file_id = $file->id;
        $user->save();

        return response()->json([
            'avatar_url' => $file->url,
            'avatar_key' => $file->object_key,
        ], 200);
    }

    public function favoritedBy(Request $request)
    {
        $user = $request->user();
        return response()->json(
            $user->favoritedBy()->with('user')->get()
        );
    }

    public function favoriteUsers(Request $request)
    {
        $user = $request->user();
        return response()->json(
            $user->favoriteUsers()->with('targetUser')->get()
        );
    }

    public function favoritePosts(Request $request)
    {
        $user = $request->user();

        $interactions = $user->favoritePosts()
            ->whereHasMorph('target', [Post::class], function ($query) {
                $query->where('post_status', 'active');
            })
            ->with('target.primaryFile')
            ->get();

        // Map dữ liệu để tạo trường 'image_url' cho Frontend
        $interactions->transform(function ($interaction) {
            if ($interaction->target) {
                // Frontend đang gọi post.image_url
                $interaction->target->image_url = optional($interaction->target->primaryFile)->url;
            }
            return $interaction;
        });

        return response()->json($interactions);
    }

    public function payments(Request $request)
    {
        $user = $request->user();
        return response()->json(
            $user->payments()->latest()->get()
        );
    }

    public function reviews(Request $request)
    {
        $user = $request->user();
        // Chỉ lấy feedback có rating (khác null)
        return response()->json(
            $user->feedbacks()
                ->whereNotNull('rating')
                ->latest()
                ->get()
        );
    }
}
