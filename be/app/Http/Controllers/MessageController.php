<?php
namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function list(Request $request)
    {
        $userId         = $request->user()->id;
        $conversationId = $request->query('conversation_id');
        $receiverId     = $request->query('receiver_id');
        $limit          = $request->query('limit', 20);
        $before         = $request->query('before');

        // Xác định hội thoại
        if ($conversationId) {
            $conv = Conversation::findOrFail($conversationId);
            if (! in_array($userId, [$conv->user_one_id, $conv->user_two_id])) {
                return response()->json(['message' => 'Forbidden'], 403);
            }
        } elseif ($receiverId) {
            $conv = Conversation::where(function ($q) use ($userId, $receiverId) {
                $q->where('user_one_id', $userId)->where('user_two_id', $receiverId);
            })->orWhere(function ($q) use ($userId, $receiverId) {
                $q->where('user_one_id', $receiverId)->where('user_two_id', $userId);
            })->first();

            if (! $conv) {
                return response()->json([], 200);
            }
        } else {
            return response()->json(['message' => 'Missing receiver_id or conversation_id'], 400);
        }

        // Query messages
        $query = Message::where('conversation_id', $conv->id)
            ->orderBy('created_at', 'desc') // giảm dần: cũ -> mới
            ->limit($limit);

        if ($before) {
            $query->where('created_at', '<', $before);
        }

        return response()->json($query->get()->values());

    }

    // Gửi tin nhắn mới + broadcast realtime
    public function store(Request $request)
    {
        $request->validate([
            'receiver_id'   => 'required|exists:users,id|different:' . $request->user()->id,
            'content'       => 'nullable|string',
            'attachments'   => 'array',
            'attachments.*' => 'exists:files,id',
        ]);

        $senderId   = $request->user()->id;
        $receiverId = (int) $request->receiver_id;

        // Tìm hoặc tạo conversation
        $conv = Conversation::findOrCreatePair($senderId, $receiverId);

        // Tạo message
        $msg = Message::create([
            'conversation_id' => $conv->id,
            'sender_id'       => $senderId,
            'receiver_id'     => $receiverId,
            'content'         => $request->content,
            'is_read'         => false,
            'status'          => 'sent',
        ]);

        // Nếu có attachments thì tạo record trong bảng message_attachments
        if ($request->attachments) {
            foreach ($request->attachments as $index => $fileId) {
                $msg->attachments()->create([
                    'file_id'    => $fileId,
                    'file_order' => $index,
                ]);
            }
        }

        // Cập nhật last_message_id
        $conv->update(['last_message_id' => $msg->id]);

        // Broadcast realtime qua Pusher
        event(new \App\Events\MessageSent($msg->load('attachments.file')));

        return response()->json($msg->load('attachments.file'), 201);
    }

}
