<?php
namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    // GET /categories cấp cha
    public function getall()
    {
        // load luôn quan hệ image (hasOne hoặc hasOneThrough)
        $categories = Category::with('image')
            ->whereNull('parent_id')
            ->get();

        // chuẩn hóa dữ liệu trả về
        $data = $categories->map(function ($cat) {
            return [
                'id'        => $cat->id,
                'name'      => $cat->name,
                'image_url' => $cat->image ? $cat->image->url : null, // lấy từ bảng files
            ];
        });

        return response()->json($data);
    }

    // GET /categories/{id}
    public function show($id)
    {
        $category = Category::with([
            // load subcategories
            'subs',
            // load brands
            'brands',
            // load models
            'models',
            // load attributes và options của attribute
            'attributes.options',
        ])->findOrFail($id);

        return response()->json($category);
    }
}
