<?php
namespace App\Models;

use App\Enums\InteractionType;
use App\Enums\ItemCondition;
use App\Enums\PostStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Post extends Model
{

    protected $fillable = [
        'user_id',
        'product_id',
        'category_id',
        'title',
        'description',
        'price',
        'item_condition',
        'location',
        'contact_phone',
        'contact_email',
        'post_status',
        'views_count',
        'waranty',
    ];

    protected $casts = [
        'price'          => 'decimal:2',
        'views_count'    => 'integer',
        'created_at'     => 'datetime',
        'updated_at'     => 'datetime',
        'post_status'    => PostStatus::class,
        'item_condition' => ItemCondition::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function postBoosts(): HasMany
    {
        return $this->hasMany(PostBoost::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function postImages(): HasMany
    {
        return $this->hasMany(PostImage::class);
    }

    public function interactions()
    {
        return $this->morphMany(Interaction::class, 'target');
    }

    public function favorites()
    {
        return $this->interactions()->where('interaction_type', InteractionType::FAVORITE);
    }

    public function reports()
    {
        return $this->interactions()->where('interaction_type', InteractionType::REPORT);

    }

    public function feedbacks()
    {
        return $this->interactions()->where('interaction_type', InteractionType::FEEDBACK);
    }

}
