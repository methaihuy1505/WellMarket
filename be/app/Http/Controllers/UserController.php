<?php
namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;

class UserController extends Controller
{
    // Lấy thông tin user (receiver)
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'id'     => $user->id,
            'name'   => $user->name,
            'avatar' => $user->file->url ?? null,
        ]);
    }

    // Lấy danh sách posts của user
    public function posts($id)
    {
        $posts = \App\Models\Post::where('user_id', $id)
            ->latest()
            ->with(['primaryMedia.file', 'postMedias.file']) // load quan hệ
            ->get();

        return response()->json($posts->map(function ($p) {
            return [
                'id'             => $p->id,
                'title'          => $p->title,
                'price'          => $p->price,
                'post_status'    => $p->post_status,
                'location'       => $p->location,
                'item_condition' => $p->item_condition,
                'warranty'       => $p->warranty,
                'image'          => $p->primaryMedia->file->url,
            ];
        }));
    }

}
