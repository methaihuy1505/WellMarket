<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScheduledBoost extends Model
{
    protected $fillable = [
        'post_boost_id',
        'scheduled_at',
    ];
    protected $casts = [
        'scheduled_at' => 'datetime',
        'created_at'   => 'datetime',
        'updated_at'   => 'datetime',
    ];

    public function postBoost(): BelongsTo
    {
        return $this->belongsTo(PostBoost::class);
    }
}
    
?>