<?php
namespace App\Models;

use App\Enums\InteractionType;
use App\Enums\MessageStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Message extends Model
{
    protected $fillable = [
        'conversation_id',
        'sender_id',
        'receiver_id',
        'content',
        'is_read',
        'status',
    ];

    protected $casts = [
        'is_read'           => 'boolean',
        'transaction_count' => 'integer',
        'created_at'        => 'datetime',
        'updated_at'        => 'datetime',
        'status'            => MessageStatus::class,
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(MessageAttachment::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function interactions()
    {
        return $this->morphMany(Interaction::class, 'target');
    }

    public function favorites()
    {
        return $this->interactions()->where('interaction_type', InteractionType::FAVORITE);
    }

    public function reports()
    {
        return $this->interactions()->where('interaction_type', InteractionType::REPORT);

    }

    public function feedbacks()
    {
        return $this->interactions()->where('interaction_type', InteractionType::FEEDBACK);
    }
    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }

}