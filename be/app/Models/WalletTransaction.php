<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WalletTransaction extends Model
{
    protected $fillable = [
        'user_id',
        'amount',
        'description',
        'reference_table',
        'reference_id',
        'anchored',
        'anchor',
        'type',
    ];

    protected $casts = [
        'amount'          => 'decimal:2',
        'anchored'        => 'boolean',
        'created_at'      => 'datetime',
        'updated_at'      => 'datetime',
        'reference_table' => WalletReferenceTable::class,
        'reference_id'    => 'integer',
        'type'            => TransactionType::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function anchor(): BelongsTo
    {
        return $this->belongsTo(WalletAnchor::class, 'anchor');
    }
    public function reference()
    {
        return $this->morphTo(null, 'reference_table', 'reference_id');
    }

}
