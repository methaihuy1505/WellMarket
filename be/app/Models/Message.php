<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Message extends Model
{
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'content',
        'is_read',
        'transaction_count',
        'status',
    ];

    protected $casts = [
        'is_read'           => 'boolean',
        'transaction_count' => 'integer',
        'created_at'        => 'datetime',
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

    public function messageAttachments(): HasMany
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
        return $this->interactions()->where('interaction', InteractionType::FAVORITE);
    }

    public function reports()
    {
        return $this->interactions()->where('interaction', InteractionType::REPORT);

    }

    public function feedbacks()
    {
        return $this->interactions()->where('interaction', InteractionType::FEEDBACK);
    }
}
