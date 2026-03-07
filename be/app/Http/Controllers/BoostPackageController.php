<?php
namespace App\Http\Controllers;

use App\Models\BoostPackage;

class BoostPackageController extends Controller
{
    // Lấy tất cả gói boost kèm category
    public function index()
    {
        $packages = BoostPackage::with('category')->get();

        return response()->json($packages);
    }
}
