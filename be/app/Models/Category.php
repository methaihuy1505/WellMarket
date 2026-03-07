<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BeLongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Category extends Model
{

    protected $fillable = [
        'name',
        'parent_id',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Quan hệ
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function subs(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function brands(): HasMany
    {
        return $this->hasMany(Brand::class);
    }
    public function models(): HasMany
    {
        return $this->hasMany(ProductModel::class);
    }
    public function attributes(): BeLongsToMany
    {
        return $this->belongsToMany(Attribute::class, 'category_attributes');
    }
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function image(): HasOneThrough
    {
        return $this->hasOneThrough(
            File::class,          // model đích
            CategoryImage::class, // model trung gian
            'category_id',        // FK trên category_images
            'id',                 // FK trên files
            'id',                 // PK trên categories
            'file_id'             // FK trên category_images
        );
    }

}
