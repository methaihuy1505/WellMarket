<?php
namespace App\Models;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\belongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
        'status',
        'wallet_balance',
        'avatar_file_id',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'wallet_balance' => 'decimal:2',
        'created_at'     => 'datetime',
        'updated_at'     => 'datetime',
        'role'           => UserRole::class,
        'status'         => UserStatus::class,
    ];

    // Quan hệ
    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class, 'avatar_file_id');
    }
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function sentMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function walletTransactions(): HasMany
    {
        return $this->hasMany(WalletTransaction::class);
    }

    public function eventParticipationHistory(): belongsToMany
    {
        return $this->belongsToMany(Event::class, 'event_participants', 'user_id', 'event_id')
            ->withPivot('participated_at', 'reward_claimed')
            ->withTimestamps();
    }

    public function interactions(): HasMany
    {
        return $this->hasMany(Interaction::class);
    }

    public function favoritePosts()
    {
        return $this->interactions()
            ->where('interaction', InteractionType::FAVORITE)
            ->where('target_type', TargetType::POST);
    }

    public function favoriteUsers()
    {
        return $this->interactions()
            ->where('interaction', InteractionType::FAVORITE)
            ->where('target_type', TargetType::USER);
    }

    public function reportedPosts()
    {
        return $this->interactions()
            ->where('interaction', InteractionType::REPORT)
            ->where('target_type', TargetType::POST);
    }

    public function reportedUsers()
    {
        return $this->interactions()
            ->where('interaction', InteractionType::REPORT)
            ->where('target_type', TargetType::USER);
    }
    public function reportedMessages()
    {
        return $this->interactions()
            ->where('interaction', InteractionType::REPORT)
            ->where('target_type', TargetType::MESSAGE);
    }

    public function feedbacks()
    {
        return $this->interactions()
            ->where('interaction', InteractionType::FEEDBACK);
    }
}
