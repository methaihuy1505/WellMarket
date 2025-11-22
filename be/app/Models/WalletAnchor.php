<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WalletAnchor extends Model
{
    protected $fillable = [
        'merkle_root',
        'tx_hash',
        'block_number',
        'total_transactions',
        'note',
    ];

    protected $casts = [
        'block_number'       => 'integer',
        'total_transactions' => 'integer',
        'created_at'         => 'datetime',
        'updated_at'         => 'datetime',
    ];

    public function walletTransactions(): HasMany
    {
        return $this->hasMany(WalletTransaction::class, 'anchor');
    }
}
