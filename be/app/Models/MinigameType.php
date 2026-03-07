<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MiniGameType extends Model
{
    protected $table    = 'minigame_types';
    protected $fillable = [
        'name',
        'description',
        'rule',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',

        'rule'       => 'array',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
