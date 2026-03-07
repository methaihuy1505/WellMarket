<?php
namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    // GET /categories/{id}/brands
    public function getByCategory($categoryId)
    {
        $brands = Brand::where('category_id', $categoryId)->get();
        return response()->json($brands);
    }
}

?>