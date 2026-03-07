<?php 
namespace App\Http\Controllers;

use App\Models\ProductModel;
use Illuminate\Http\Request;

class ProductModelController extends Controller
{
    // GET /brands/{id}/models
    public function getByBrand($brandId)
    {
        $models = ProductModel::where('brand_id', $brandId)->get();
        return response()->json($models);
    }

    // GET /categories/{id}/models
    public function getByCategory($categoryId)
    {
        $models = ProductModel::where('category_id', $categoryId)->get();
        return response()->json($models);
    }
    
}

?>