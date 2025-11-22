<?php
namespace App\Models;

use App\Enums\InteractionType;
use App\Enums\ReportStatus;
use App\Enums\TargetType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Interaction extends Model
{
    protected $fillable = [
        'target_id',
        'user_id',
        'rating',
        'comment',
        'reason_id',
        'reason_text',
        'meta',
        'target_type',
        'status',
        'interaction',
    ];

    protected $casts = [
        'rating'      => 'integer',
        'meta'        => 'array',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
        'status'      => ReportStatus::class,
        'interaction' => InteractionType::class,
        'target_type' => TargetType::class,
    ];

    // Quan hệ với User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Quan hệ với ReportReason
    public function reason(): BelongsTo
    {
        return $this->belongsTo(ReportReason::class);
    }
    // Quan hệ đa hình ngược đến mục tiêu tương tác (Message, Post, Comment, v.v.)
    public function target()
    {
        return $this->morphTo();
    }
}
