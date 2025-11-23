<?php
namespace App\Models;

use App\Enums\PostBoostStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostBoost extends Model
{
    protected $fillable = [
        'post_id',
        'boost_package_id',
        'payment_id',
        'start_at',
        'end_at',
        'status',
    ];
    protected $casts = [
        'start_at'   => 'datetime',
        'end_at'     => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'status'     => PostBoostStatus::class,
    ];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
    public function boostPackage(): BelongsTo
    {
        return $this->belongsTo(BoostPackage::class);
    }
    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }
}
