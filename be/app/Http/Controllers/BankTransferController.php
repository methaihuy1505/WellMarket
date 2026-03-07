<?php
namespace App\Http\Controllers;

use App\Enums\PaymentStatus;
use App\Models\Payment;
use Illuminate\Http\Request;

class BankTransferController extends Controller
{
    // Trả về thông tin chuyển khoản + QR
    public function instruction($paymentId)
    {
        $payment = Payment::findOrFail($paymentId);

        // Tạo link QR VietQR (public API)
        $qrUrl = "https://img.vietqr.io/image/VCB-1042328247-compact.png?amount={$payment->amount}&addInfo=Thanh+toan+don+{$payment->id}";

        return response()->json([
            'bank_name'    => 'Vietcombank',
            'account_no'   => '1042328247',
            'account_name' => 'Me Thai Huy',
            'amount'       => $payment->amount,
            'note'         => 'Thanh toán cho đơn #' . $payment->id,
            'qr_code'      => $qrUrl,
        ]);
    }

    // Mock callback: sau khi bạn test chuyển khoản xong thì gọi API này để set SUCCESS
    public function callback(Request $request)
    {
        $payment         = Payment::findOrFail($request->input('payment_id'));
        $payment->status = PaymentStatus::SUCCESS;
        $payment->save();
        if ($payment->wc_used > 0) {
            $user = $payment->user;
            $user->wallet_balance -= $payment->wc_used;
            $user->save();
        }
        return response()->json([
            'success'    => true,
            'payment_id' => $payment->id,
            'message'    => 'Thanh toán Bank Transfer thành công (mock)',
        ]);
    }
}
