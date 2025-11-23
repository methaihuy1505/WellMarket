<?php
namespace App\Models;

use App\Enums\ReportScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ReportReason extends Model
{
    protected $fillable = [
        'code',
        'title',
        'is_active',
        'sort_order',
        'scope',
    ];

    protected $casts = [
        'is_active'  => 'boolean',
        'sort_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'scope'      => ReportScope::class,
    ];

    public function interactions(): HasMany
    {
        return $this->hasMany(Interaction::class);
    }

    public static function userReasons()
    {
        return self::where('scope', ReportScope::USER)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();
    }

    public static function messageReasons()
    {
        return self::where('scope', ReportScope::MESSAGE)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();
    }

    public static function postReasons()
    {
        return self::where('scope', ReportScope::POST)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();
    }

    public static function bothReasons()
    {
        return self::where('scope', ReportScope::BOTH)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();
    }
}
