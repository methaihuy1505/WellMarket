<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    // API Login
    public function login(Request $request)
    {
        // Lấy phone + password từ request
        $credentials = $request->only('phone', 'password');

        try {
            // Thử đăng nhập và tạo token
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        // Trả về token nếu thành công
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
        ]);
    }

    // API Profile (test token)
    public function profile()
    {
        return response()->json(auth('api')->user());
    }
}
