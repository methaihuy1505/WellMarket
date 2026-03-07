<?php
namespace App\Http\Controllers;

use App\Models\ReportReason;
use Illuminate\Http\Request;

class ReportReasonController extends Controller
{
    public function index(Request $request)
    {
        $scope = $request->query('scope', 'post'); // mặc định scope = post

        $query = ReportReason::where('is_active', true)
            ->orderBy('sort_order');

        if ($scope !== 'both') {
            $query->where(function ($q) use ($scope) {
                $q->where('scope', $scope)
                    ->orWhere('scope', 'both');
            });
        }

        return response()->json($query->get());
    }
}
