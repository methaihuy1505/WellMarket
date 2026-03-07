<?php
namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    // Danh sách hội thoại của user hiện tại
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $convs = Conversation::with(['userOne', 'userTwo', 'lastMessage'])
            ->where(function ($q) use ($userId) {
                $q->where('user_one_id', $userId)
                    ->orWhere('user_two_id', $userId);
            })
            ->orderByDesc('updated_at')
            ->get()
            ->map(function ($conv) use ($userId) {
                // tên đối phương
                $conv->receiver_name = $conv->user_one_id == $userId
                    ? $conv->userTwo->name
                    : $conv->userOne->name;

                // unread: nếu lastMessage chưa đọc và receiver là user hiện tại
                $last               = $conv->lastMessage;
                $conv->unread       = $last && $last->receiver_id == $userId && ! $last->is_read;
                $conv->last_message = $last ? $last->content : null;
                return $conv;
            });

        return response()->json($convs);
    }

    // Tìm hoặc tạo hội thoại với receiver
    public function findOrCreate(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id|different:' . $request->user()->id,
        ]);

        $authId     = $request->user()->id;
        $receiverId = (int) $request->receiver_id;

        $conv = Conversation::findOrCreatePair($authId, $receiverId);

        return response()->json($conv);
    }

    public function media($id)
    {
        $conversation = Conversation::findOrFail($id);

        // Lấy tất cả attachments thuộc messages của conversation này
        $attachments = $conversation->messages()
            ->with(['attachments.file'])
            ->get()
            ->pluck('attachments')
            ->flatten();

        // Map ra dữ liệu media
        $media = $attachments->map(function ($att) {
            $file = $att->file;
            return [
                'id'           => $att->id,
                'message_id'   => $att->message_id,
                'type'         => $file->file_type, // 'image' hoặc 'video'
                'url'          => $file->url,
                'thumbnail'    => $file->thumbnail_url,
                'file_name'    => $file->file_name,
                'content_type' => $file->content_type,
                'file_size'    => $file->file_size,
                'created_at'   => $att->created_at,
            ];
        });

        return response()->json($media);
    }

    public function markRead($id)
    {
        $userId = auth()->id();

        Message::where('conversation_id', $id)
            ->where('receiver_id', $userId)
            ->where('is_read', 0)
            ->update(['is_read' => 1]);

        return response()->json(['status' => 'ok']);
    }

}