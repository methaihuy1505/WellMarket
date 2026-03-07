<?php 
namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\AttributeOption;
use App\Models\CategoryAttribute;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    // GET /categories/{id}/attributes
    public function getByCategory($categoryId)
    {
        $attributes = CategoryAttribute::where('category_id', $categoryId)
            ->with('attribute')
            ->get()
            ->pluck('attribute');
        return response()->json($attributes);
    }

    // GET /attributes/{id}/options
    public function getOptions($attributeId)
    {
        $options = AttributeOption::where('attribute_id', $attributeId)->get();
        return response()->json($options);
    }
}