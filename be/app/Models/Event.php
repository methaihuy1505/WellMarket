<?php
namespace App\Models;

use App\Enums\EventStatus;
use App\Enums\EventType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\belongsToMany;

class Event extends Model
{
    protected $table = 'events';

    protected $fillable = [
        'name',
        'description',
        'event_type',
        'reward_amount',
        'minigame_type_id',
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'reward_amount' => 'decimal:2',
        'start_date'    => 'datetime',
        'end_date'      => 'datetime',
        'created_at'    => 'datetime',
        'event_type'    => EventType::class,
        'status'        => EventStatus::class,
    ];
    public function minigameType(): BelongsTo
    {
        return $this->belongsTo(MinigameType::class);
    }

    public function participants(): belongsToMany
    {
        return $this->belongsToMany(User::class, 'event_participants', 'event_id', 'user_id')
            ->withPivot('participated_at', 'reward_claimed')
            ->withTimestamps();
    }
}
