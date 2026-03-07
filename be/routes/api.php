<?php
use App\Http\Controllers\AccountController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BankTransferController;
use App\Http\Controllers\BoostPackageController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductModelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportReasonController;
use App\Http\Controllers\UserController;
use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

// ... trong file routes/api.php

Broadcast::routes(['middleware' => ['api', 'auth:api']]);

// --- (Dành cho tính năng Online/Offline) ---
Broadcast::channel('presence-conversation.{conversationId}', function ($user, $conversationId) {
    $conv = Conversation::find($conversationId);
    if (! $conv) {
        return false;
    }

    return in_array($user->id, [$conv->user_one_id, $conv->user_two_id])
        ? ['id' => $user->id, 'name' => $user->name]
        : false;
});

Broadcast::channel('conversation.{conversationId}', function ($user, $conversationId) {
    // Logic: Chỉ người trong cuộc hội thoại mới được nghe tin nhắn
    $conv = Conversation::find($conversationId);
    if (! $conv) {
        return false;
    }

    // Kiểm tra user hiện tại có phải là người trong cuộc hội thoại không
    return in_array($user->id, [$conv->user_one_id, $conv->user_two_id]);
});

// ... các route khác
Route::middleware('api')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    // Get report reasons
    Route::get('/report-reasons', [ReportReasonController::class, 'index']);

    Route::get('/bank/transfer/{payment}', [BankTransferController::class, 'instruction'])
        ->name('bank.transfer.instruction');
    // Mock callback để set payment thành công
    Route::post('/bank/transfer/callback', [BankTransferController::class, 'callback'])
        ->name('bank.transfer.callback');
    //Lấy danh sách gói đẩy tin
    Route::get('/boost-packages', [BoostPackageController::class, 'index']);
    // danh sách bài đăng
    Route::get('/posts', [PostController::class, 'getall']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    //Lấy bình luận của bài đăng
    Route::get('/posts/{id}/comments', [InteractionController::class, 'comments']);
    // danh sách sự kiện
    Route::get('/events', [EventController::class, 'getall']);
                                                                                              //lấy danh sách category,brand,model,attribute,option                                                                                          // ====== form data APIs ======
    Route::get('/categories', [CategoryController::class, 'getall']);                         // danh sách category
    Route::get('/categories/{id}', [CategoryController::class, 'show']);                      // chi tiết category
    Route::get('/categories/{id}/brands', [BrandController::class, 'getByCategory']);         // brand theo category
    Route::get('/brands/{id}/models', [ProductModelController::class, 'getByBrand']);         // model theo brand
    Route::get('/categories/{id}/models', [ProductModelController::class, 'getByCategory']);  // model theo category (nếu không có brand)
    Route::get('/categories/{id}/attributes', [AttributeController::class, 'getByCategory']); // attribute theo category
    Route::get('/attributes/{id}/options', [AttributeController::class, 'getOptions']);       // option theo attribute

    Route::middleware('auth:api')->group(function () {

        // user profile
        Route::get('/profile', [ProfileController::class, 'profile']);
        Route::get('/profile/favorited-by', [ProfileController::class, 'favoritedBy']);
        Route::get('/profile/favorite-users', [ProfileController::class, 'favoriteUsers']);
        Route::get('/profile/favorite-posts', [ProfileController::class, 'favoritePosts']);
        Route::get('/profile/payments', [ProfileController::class, 'payments']);
        Route::get('/profile/reviews', [ProfileController::class, 'reviews']);
        Route::put('/profile/update-password', [ProfileController::class, 'updatePassword']);
        Route::post('/profile/upload-avatar', [ProfileController::class, 'uploadAvatar']);
        // interactions
        Route::post('/interactions', [InteractionController::class, 'store']);
        // Yêu thích
        Route::post('/interactions/favorite/toggle', [InteractionController::class, 'toggleFavorite']);
        // Báo cáo
        Route::post('/interactions/report', [InteractionController::class, 'report']);

        // routes/api.php

        // User
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::get('/users/{id}/posts', [UserController::class, 'posts']);

        // Conversations
        Route::get('/conversations', [ConversationController::class, 'index']);
        Route::post('/conversations/find-or-create', [ConversationController::class, 'findOrCreate']);
        Route::get('/conversations/{id}/media', [ConversationController::class, 'media']);
        Route::post('/conversations/{id}/mark-read', [ConversationController::class, 'markRead']);
                                                                       // Messages (gom lại 1 route chung)
        Route::get('/messages', [MessageController::class, 'list']);   // lấy tin nhắn theo conversation_id hoặc receiver_id
        Route::post('/messages', [MessageController::class, 'store']); // gửi tin nhắn

        // post management
        Route::post('/posts/check-fee', [PostController::class, 'checkFee']);
        Route::post('/posts', [PostController::class, 'store']);
        Route::put('/posts/{id}', [PostController::class, 'update']);
        Route::delete('/posts/{id}', [PostController::class, 'destroy']);

        // payment management
        Route::post('/payments', [PaymentController::class, 'create']);
        //File upload
        Route::post('/files', [FileController::class, 'store']);

        // admin dashboard
        Route::middleware(['role:admin'])->group(function () {
            // --- QUẢN LÝ SỰ KIỆN ---
            Route::get('/admin/events', [EventController::class, 'index']);
            Route::post('/events', [EventController::class, 'store']);
            Route::put('/events/{id}', [EventController::class, 'update']);
            Route::delete('/events/{id}', [EventController::class, 'destroy']);

            // Route lấy danh sách loại game
            Route::get('/minigame-types', [EventController::class, 'getMiniGameTypes']);

            // Account management
            // Lấy danh sách tài khoản
            Route::get('/accounts', [AccountController::class, 'index']);
            // Chi tiết tài khoản
            Route::get('/accounts/{id}', [AccountController::class, 'show']);
            // Cập nhật tài khoản (Sửa, Khóa, Ban)
            Route::put('/accounts/{id}', [AccountController::class, 'update']);
            // chuyển đổi trạng thái user (Khóa <-> Mở khóa)
            Route::post('/accounts/{id}/toggle-status', [AccountController::class, 'toggleStatus']);

            // User bị report
            Route::get('/reports/users', [AccountController::class, 'getUserReports']);
            // Lấy danh sách bị chặn (Blocked/Banned)
            Route::get('/blocked', [AccountController::class, 'getBlocked']);

                                                                               // --- QUẢN LÝ BÀI ĐĂNG (POSTS) ---
            Route::get('/admin/posts', [PostController::class, 'adminIndex']); // Lấy danh sách chính

            // API Lấy danh sách chờ duyệt (MỚI)
            Route::get('/admin/posts/pending', [PostController::class, 'getPendingPosts']);

            // API Cập nhật trạng thái (Duyệt/Từ chối/Đảo trạng thái)
            Route::post('/admin/posts/{id}/status', [PostController::class, 'updateStatus']);

            // Báo cáo
            Route::get('/reports/posts', [PostController::class, 'getPostReports']);

            // Admin xóa bài
            Route::delete('/admin/posts/{id}', [PostController::class, 'adminDestroy']);
            // Admin cập nhật bài
            Route::put('/admin/posts/{id}', [PostController::class, 'adminUpdate']);

            // THỐNG KÊ DASHBOARD
            Route::get('/admin/stats', [AccountController::class, 'dashboardStats']);
        });
    });

});