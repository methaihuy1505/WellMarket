<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::middleware('auth:api')->group(function () {
        Route::get('/profile', [ProfileController::class, 'profile']);                     // tổng quan
        Route::get('/profile/favorited-by', [ProfileController::class, 'favoritedBy']);     // người yêu thích tôi
        Route::get('/profile/favorite-users', [ProfileController::class, 'favoriteUsers']); // tôi đã yêu thích ai
        Route::get('/profile/favorite-posts', [ProfileController::class, 'favoritePosts']); // bài đăng yêu thích
        Route::get('/profile/payments', [ProfileController::class, 'payments']);            // lịch sử giao dịch
        Route::get('/profile/reviews', [ProfileController::class, 'reviews']);  // đánh giá từ tôi
        Route::put('/profile/update-password', [ProfileController::class, 'updatePassword']);
        
    });
});
