<?php 

namespace App\Events;

use App\Models\Message;
// use Illuminate\Broadcasting\Channel; // <-- XÓA HOẶC COMMENT DÒNG NÀY
use Illuminate\Broadcasting\PrivateChannel; // <-- THÊM DÒNG NÀY
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessageSent implements ShouldBroadcast
{
    public $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('conversation.' . $this->message->conversation_id);
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}