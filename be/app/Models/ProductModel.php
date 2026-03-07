<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductModel extends Model
{
    protected $table    = 'models';
    protected $fillable = ['name', 'brand_id', 'category_id'];
    protected $casts    = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
