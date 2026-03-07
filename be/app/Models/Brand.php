<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    protected $table    = 'brands';
    protected $fillable = ['name', 'category_id'];
    protected $casts    = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function models(): HasMany
    {
        return $this->hasMany(ProductModel::class);
    }
}