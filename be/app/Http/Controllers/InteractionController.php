<?php
namespace App\Http\Controllers;

use App\Models\Interaction;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use App\Models\Message;

class InteractionController extends Controller
{
    // Lấy tất cả bình luận cho 1 post
    public function comments($postId)
    {
        $interactions = Interaction::with(['user', 'replies.user'])
            ->where('target_type', 'post')
            ->where('target_id', $postId)
            ->where('interaction_type', 'feedback')
            ->whereNull('parent_id')
            ->orderBy('created_at', 'desc')
            ->get();

        $data = $interactions->map(function ($i) {
            return [
                'id'      => $i->id,
                'name'    => $i->user->name,
                'avatar'  => $i->user->avatar_url,
                'content' => $i->comment,
                'rating'  => $i->rating, // thêm rating nếu có
                'time'    => $i->created_at->diffForHumans(),
                'replies' => $i->replies->map(function ($r) {
                    return [
                        'id'      => $r->id,
                        'name'    => $r->user->name,
                        'avatar'  => $r->user->avatar_url,
                        'content' => $r->comment,
                        'rating'  => $r->rating,
                        'time'    => $r->created_at->diffForHumans(),
                    ];
                }),
            ];
        });

        return response()->json($data);
    }

    // Lưu bình luận hoặc rating
    public function store(Request $request)
    {
        $interaction = Interaction::create([
            'user_id'          => $request->input('user_id'),
            'target_id'        => $request->input('target_id'),
            'target_type'      => $request->input('target_type'),
            'interaction_type' => 'feedback',
            'comment'          => $request->input('comment'),
            'rating'           => $request->input('rating'),    // nếu có
            'parent_id'        => $request->input('parent_id'), // nếu là reply
        ]);

        return response()->json([
            'success' => true,
            'id'      => $interaction->id,
        ]);
    }

    // Toggle yêu thích
    public function toggleFavorite(Request $request)
    {
        $request->validate([
            'target_id'   => 'required|integer',
            'target_type' => 'required|in:post,message,user,other',
        ]);

        $user = $request->user(); // lấy từ token

        $interaction = Interaction::where([
            'user_id'          => $user->id,
            'target_id'        => $request->target_id,
            'target_type'      => $request->target_type,
            'interaction_type' => 'favorite',
        ])->first();

        if ($interaction) {
            $interaction->delete();
            return response()->json(['favorited' => false]);
        }

        Interaction::create([
            'user_id'          => $user->id,
            'target_id'        => $request->target_id,
            'target_type'      => $request->target_type,
            'interaction_type' => 'favorite',
        ]);

        return response()->json(['favorited' => true]);
    }

    // Lưu báo cáo
    public function report(Request $request)
    {
        $interaction = Interaction::create([
            'user_id'          => $request->user()->id, 
            'target_id'        => $request->input('target_id'),
            'target_type'      => $request->input('target_type'),
            'interaction_type' => 'report',
            'reason_id'        => $request->input('reason_id'),
            'reason_text'      => $request->input('reason_text'),
        ]);

        return response()->json(['success' => true, 'id' => $interaction->id]);
    }

}