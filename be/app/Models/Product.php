<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsTo;
use Illuminate\Database\Eloquent\Relations\hasMany;

class Product extends Model
{

    protected $fillable = [
        'name',
        'brand',
        'category_id',
        'attributes',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function category(): belongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function productImages(): hasMany
    {
        return $this->hasMany(ProductImage::class);
    }
    public function posts(): hasMany
    {
        return $this->hasMany(Post::class);
    }

}
