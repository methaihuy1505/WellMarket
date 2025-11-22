<?php
namespace App\Http\Controllers;

use App\Http\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    // API Login
    public function login(Request $request)
    {
        // Nếu request có email thì login bằng email, ngược lại login bằng phone
        if ($request->has('email')) {
            $credentials = $request->only('email', 'password');
        } else {
            $credentials = $request->only('phone', 'password');
        }

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
        // Lấy user từ token
        $user = JWTAuth::user();
        // Trả về token + role để FE biết là user hay admin
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
            'role'         => $user ? $user->role : null, // thêm role vào response
        ]);
    }

    // API Register
    public function register(Request $request)
    {

        // Validate dữ liệu đầu vào
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'phone'    => 'required|string|max:20|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Tạo user mới
        $user = User::create([
            'name'     => $validated['name'],
            'phone'    => $validated['phone'],
            'password' => bcrypt($validated['password']),
        ]);

        // Tạo token cho user mới
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
        ]);
    }

}
