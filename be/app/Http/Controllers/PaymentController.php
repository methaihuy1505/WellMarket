<?php
namespace App\Http\Controllers;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function create(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'amount'                    => 'required|numeric|min:0',
            'payment_method'            => 'required|in:' . implode(',', array_column(PaymentMethod::cases(), 'value')),
            'wc_used'                   => 'nullable|numeric|min:0',
            'quantity'                  => 'nullable|integer|min:1',
            'breakdown'                 => 'nullable|array',
            'boosts'                    => 'nullable|array',
            'boosts.*.boost_package_id' => 'required|integer',
            'boosts.*.quantity'         => 'required|integer|min:1',
            'boosts.*.time_slots'       => 'nullable|array',
            'boosts.*.days'             => 'nullable|integer|min:1',
        ]);

        if (($data['wc_used'] ?? 0) > $user->wallet_balance) {
            return response()->json([
                'success' => false,
                'message' => 'Số dư WC không đủ để sử dụng.',
            ], 400);
        }

        $payloadNote = [
            'breakdown' => $data['breakdown'] ?? [],
            'boosts'    => $data['boosts'] ?? [], // mảng các gói boost    
        ];

        $payment = Payment::create([
            'user_id'        => $user->id,
            'amount'         => $data['amount'],
            'payment_method' => PaymentMethod::from($data['payment_method']),
            'wc_used'        => $data['wc_used'] ?? 0,
            'status'         => PaymentStatus::PENDING,
            'transaction_id' => Str::uuid(),
            'note'           => json_encode($payloadNote),
        ]);

        // Nếu amount = 0 thì không cần thanh toán
        if ($data['amount'] == 0) {
            $payment->status = PaymentStatus::SUCCESS;
            $payment->save();
            // Trừ WC lúc này
            if ($payment->wc_used > 0) {
                $user->wallet_balance -= $payment->wc_used;
                $user->save();
            }
            return response()->json([
                'success'    => true,
                'payment_id' => $payment->id,
                'message'    => 'Thanh toán bằng WC thành công',
            ]);
        }

        if ($payment->payment_method === PaymentMethod::BANK_TRANSFER) {
            return response()->json([
                'redirect_url' => route('bank.transfer.instruction', ['payment' => $payment->id]),
                'payment_id'   => $payment->id,
            ]);
        }

        if ($payment->payment_method === PaymentMethod::MOMO) {
            return response()->json([
                'success' => false,
                'message' => 'Thanh toán qua Momo chưa được kích hoạt. Vui lòng chọn Bank Transfer.',
            ], 400);
        }

        return response()->json([
            'success' => false,
            'message' => 'Phương thức thanh toán không hợp lệ.',
        ], 400);
    }

}