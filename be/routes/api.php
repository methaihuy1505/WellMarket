<?php
use App\Http\Controllers\AuthController;

Route::middleware('api')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/profile', [AuthController::class, 'profile'])->middleware('auth:api');
});
