<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Payment extends Model
{
    protected $fillable = [
        'user_id',
        'amount',
        'transaction_id',
        'payment_proof_url',
        'note',
        'wc_used',
        'status',
        'payment_method',
    ];

    protected $casts = [
        'amount'         => 'decimal:2',
        'wc_used'        => 'decimal:2',
        'created_at'     => 'datetime',
        'updated_at'     => 'datetime',
        'status'         => PaymentStatus::class,
        'payment_method' => PaymentMethod::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function postBoosts(): HasMany
    {
        return $this->hasMany(PostBoost::class);
    }
}
