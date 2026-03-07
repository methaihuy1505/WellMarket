<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BoostPackage extends Model
{
    protected $fillable = [
        'name',
        'description',
        'category_id',
        'price',
        'priority',
    ];

    protected $casts = [
        'price'         => 'decimal:2',
        'priority'      => 'integer',
        'created_at'    => 'datetime',
        'updated_at'    => 'datetime',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(BoostPackageCategory::class);
    }

    public function postBoosts(): HasMany
    {
        return $this->hasMany(PostBoost::class);
    }
}