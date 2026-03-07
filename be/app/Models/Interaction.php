<?php
namespace App\Models;

use App\Enums\InteractionType;
use App\Enums\ReportStatus;
use App\Enums\TargetType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Interaction extends Model
{
    protected $fillable = [
        'target_id',
        'user_id',
        'parent_id',
        'rating',
        'comment',
        'reason_id',
        'reason_text',
        'meta',
        'target_type',
        'status',
        'interaction_type',
    ];

    protected $casts = [
        'rating'           => 'integer',
        'meta'             => 'array',
        'created_at'       => 'datetime',
        'updated_at'       => 'datetime',
        'status'           => ReportStatus::class,
        'interaction_type' => InteractionType::class,
        'target_type'      => TargetType::class,
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
    // Quan hệ đa hình ngược đến mục tiêu tương tác (Message, Post, User, v.v.)
    public function target()
    {
        return $this->morphTo();
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Interaction::class, 'parent_id');
    }

    public function parent(): BeLongsTo
    {
        return $this->belongsTo(Interaction::class, 'parent_id');
    }
    public function targetUser()
    {
        return $this->belongsTo(User::class, 'target_id')->where('target_type', 'user');
    }

}