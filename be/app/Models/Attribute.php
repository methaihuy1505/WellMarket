<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attribute extends Model
{
    protected $fillable = [
        'name',
        'label',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function options(): HasMany
    {
        return $this->hasMany(AttributeOption::class);
    }

    public function postAttributes(): HasMany
    {
        return $this->hasMany(PostAttribute::class);
    }
    public function categories(): BeLongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_attributes');
    }

}