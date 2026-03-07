<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostBoost extends Model
{
    protected $fillable = [
        'post_id',
        'boost_package_id',
        'quantity',
        'start_at',
        'end_at',
        'status',
    ];
    protected $casts = [
        'quantity'   => 'integer',
        'start_at'   => 'datetime',
        'end_at'     => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
    public function boostPackage(): BelongsTo
    {
        return $this->belongsTo(BoostPackage::class);
    }
}