<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{

    protected $fillable = [
        'category_id',
        'brand_id',
        'model_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }
    public function model(): BelongsTo
    {
        return $this->belongsTo(ProductModel::class);
    }
    public function productImages(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }


}