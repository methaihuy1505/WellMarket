<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
    protected $fillable = ['user_one_id', 'user_two_id', 'last_message_id'];

    // Accessor để lấy đối phương
    protected $appends = ['receiver_name'];

    public function getReceiverNameAttribute()
    {
        $currentUserId = auth()->id();
        if ($this->user_one_id == $currentUserId) {
            return $this->userTwo->name;
        }
        return $this->userOne->name;
    }

    public function userOne(): BelongsTo
    {return $this->belongsTo(User::class, 'user_one_id');}
    public function userTwo(): BelongsTo
    {return $this->belongsTo(User::class, 'user_two_id');}
    public function messages(): HasMany
    {return $this->hasMany(Message::class);}
    public function lastMessage(): BelongsTo
    {return $this->belongsTo(Message::class, 'last_message_id');}

    public static function findOrCreatePair(int $a, int $b): self
    {
        [$u1, $u2] = $a < $b ? [$a, $b] : [$b, $a];
        return static::firstOrCreate(['user_one_id' => $u1, 'user_two_id' => $u2]);
    }
}