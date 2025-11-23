<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MessageAttachment extends Model
{
    protected $fillable = [
        'message_id',
        'file_id',
        'file_order',
    ];

    protected $casts = [
        'file_order' => 'integer',
        'created_at' => 'datetime',
    ];

    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }

    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class);
    }
}
