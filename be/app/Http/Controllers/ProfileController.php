<?php
namespace App\Http\Controllers;

class ProfileController extends Controller
{
    // API Profile 
    public function profile()
    {
        $user = auth('api')->user()->loadCount([
            'favoritedBy as favorites_count',        // số người yêu thích mình
            'favoriteUsers as favorite_users_count', // số user mình đã yêu thích
        ]);

        return response()->json([
            'name'           => $user->name,
            'phone'          => $user->phone,
            'coins'          => $user->wallet_balance,
            'favorites'      => $user->favorites_count,
            'favorite_users' => $user->favorite_users_count,
            'avatar' => $user->file->url ?? null,
        ]);

    }

    public function updatePassword(Request $request)
    {
        $user = auth('api')->user();

        $validated = $request->validate([
            'current_password' => 'required',
            'new_password'     => 'required|min:6|confirmed', // confirmed = có field new_password_confirmation
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['message' => 'Mật khẩu hiện tại không đúng'], 400);
        }

        $user->password = Hash::make($validated['new_password']);
        $user->save();

        return response()->json(['message' => 'Đổi mật khẩu thành công']);
    }

    public function favoritedBy()
    {
        $user = auth('api')->user();
        return response()->json(
            $user->favoritedBy()->with('user')->get()
        );
    }

    public function favoriteUsers()
    {
        $user = auth('api')->user();
        return response()->json(
            $user->favoriteUsers()->with('targetUser')->get()
        );
    }

    public function favoritePosts()
    {
        $user = auth('api')->user();
        return response()->json(
            $user->favoritePosts()->with('post')->get()
        );
    }

    public function payments()
    {
        $user = auth('api')->user();
        return response()->json(
            $user->payments()->latest()->get()
        );
    }

    public function reviews()
    {
        $user = auth('api')->user();
        return response()->json(
            $user->feedbacks()->latest()->get()
        );
    }
}
