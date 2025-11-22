<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'message_id',
        'post_id',
        'note',
        'status',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'created_at'   => 'datetime',
        'status'       => OrderStatus::class,
    ];

    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
