<?php
namespace App\Http\Controllers;

use App\Enums\PaymentStatus;
use App\Enums\UserStatus; // Import model Post để check instanceof
use App\Models\Interaction;
use App\Models\Payment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    // Lấy danh sách tất cả tài khoản
    public function index(Request $request)
    {
        $users = User::with('file')->orderBy('created_at', 'desc')->get();

        $data = $users->map(function ($u) {
            return [
                'id'         => $u->id,
                'name'       => $u->name,
                'email'      => $u->email,
                'phone'      => $u->phone,
                'role'       => $u->role,
                'status'     => $u->status,
                'coins'      => $u->wallet_balance,
                'avatar'     => $u->file ? $u->file->url : null,
                'created_at' => $u->created_at,
            ];
        });

        return response()->json(['data' => $data]);
    }

    // Lấy chi tiết 1 tài khoản
    public function show($id)
    {
        $user = User::with('file')->find($id);

        if (! $user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'data' => [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'phone'      => $user->phone,
                'role'       => $user->role,
                'status'     => $user->status,
                'coins'      => $user->wallet_balance,
                'avatar'     => $user->file ? $user->file->url : null,
                'created_at' => $user->created_at,
            ],
        ]);
    }

    // Cập nhật thông tin tài khoản
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'name'  => 'required|string|max:150',
            'email' => 'required|email|unique:users,email,' . $id,
            'role'  => 'required',
            'coins' => 'numeric|min:0',
        ]);

        $user->name           = $request->name;
        $user->email          = $request->email;
        $user->role           = $request->role;
        $user->wallet_balance = $request->coins;

        if ($request->has('phone')) {
            $user->phone = $request->phone;
        }

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        if ($request->has('status')) {
            $user->status = $request->status;
        }

        $user->save();

        return response()->json(['message' => 'Update success', 'data' => $user]);
    }

    public function toggleStatus($id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $currentStatusValue = $user->status instanceof UserStatus
            ? $user->status->value
            : $user->status;

        // So sánh string với string
        if ($currentStatusValue === UserStatus::BANNED->value) {
            // Đang bị khóa -> Mở khóa
            $user->status = UserStatus::ACTIVE;
            $msg          = 'Đã bỏ chặn tài khoản thành công';
        } else {
            // Đang active hoặc inactive -> Khóa
            $user->status = UserStatus::BANNED;
            $msg          = 'Đã khóa tài khoản thành công';
        }

        $user->save();

        return response()->json([
            'message' => $msg,
            'data'    => [
                'id'     => $user->id,
                // Trả về value string cho Frontend dễ hiển thị
                'status' => $user->status instanceof UserStatus ? $user->status->value : $user->status,
            ],
        ]);
    }

    public function getUserReports()
    {
        $reports = Interaction::where('interaction_type', 'report')
            ->where('target_type', 'user')
            ->with(['reason', 'user', 'target'])
            ->orderBy('created_at', 'desc')
            ->get();

        $data = $reports->map(function ($r) {
            $targetName = "Unknown";
            $accountId  = null;

            // Vì đã lọc target_type='user' ở trên, nên $r->target chắc chắn là User (hoặc null nếu user đã bị xóa)
            if ($r->target instanceof User) {
                $targetName = $r->target->name;
                $accountId  = $r->target->id;
            } else {
                // Trường hợp User đã bị xóa khỏi database nhưng record report vẫn còn
                $targetName = "User #{$r->target_id} (Đã xóa)";
                $accountId  = $r->target_id;
            }

            return [
                'id'         => $r->id,
                'accountId'  => $accountId,
                'name'       => $targetName,
                'reason'     => $r->reason_text ?? ($r->reason ? $r->reason->title : 'Other'),
                'created_at' => $r->created_at,
                'reporter'   => $r->user ? $r->user->name : 'Anonymous',
            ];
        });

        return response()->json(['data' => $data]);
    }

    // Lấy danh sách tài khoản bị chặn
    public function getBlocked()
    {
        $blockedUsers = User::where('status', 'banned')->get();

        $data = $blockedUsers->map(function ($u) {
            return [
                'id'        => $u->id,
                'name'      => $u->name,
                'email'     => $u->email,
                'accountId' => $u->id,
                'reason'    => 'Vi phạm chính sách',
                'blockedAt' => $u->updated_at,
            ];
        });

        return response()->json(['data' => $data]);
    }

    public function dashboardStats()
    {
        // 1. Thống kê User
        $totalUsers = User::count();
        $newUsers   = User::where('created_at', '>=', now()->subDays(7))->count();

        // 2. Thống kê Bài đăng
        $totalPosts = Post::count();
        // Kiểm tra bài chờ duyệt (dựa trên string hoặc enum 'waiting_approval' như bạn đã làm ở PostController)
        $pendingPosts = Post::where('post_status', 'waiting_approval')->count();

        // 3. Thống kê Báo cáo (đếm tất cả report)
        $totalReports = Interaction::where('interaction_type', 'report')->count();

        // 4. Thống kê Doanh thu từ bảng Payment
        $totalRevenue = Payment::where('status', PaymentStatus::SUCCESS)->sum('amount');

        return response()->json([
            'data' => [
                'users'   => [
                    'total' => $totalUsers,
                    'new'   => $newUsers,
                ],
                'posts'   => [
                    'total'   => $totalPosts,
                    'pending' => $pendingPosts,
                ],
                'reports' => $totalReports,
                'revenue' => $totalRevenue,
            ],
        ]);
    }

}
