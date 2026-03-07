<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Đây là nơi bạn đăng ký tất cả các kênh broadcast mà ứng dụng sẽ hỗ trợ.
| FE (Echo/Pusher) sẽ gọi tới /api/broadcasting/auth để xác thực join kênh.
|
*/

// Đăng ký route broadcasting với prefix "api"
Broadcast::routes([
    ['prefix' => 'api'  ],
]);
// Kênh presence cho hội thoại
Broadcast::channel('presence-conversation.{conversationId}', function ($user, $conversationId) {
    $conv = Conversation::find($conversationId);

    if (! $conv) {
        return false;
    }

    // Chỉ cho phép user_one hoặc user_two join
    return in_array($user->id, [$conv->user_one_id, $conv->user_two_id])
        ? ['id' => $user->id, 'name' => $user->name]
        : false;
});