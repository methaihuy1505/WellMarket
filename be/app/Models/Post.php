<?php
namespace App\Models;

use App\Enums\InteractionType;
use App\Enums\ItemCondition;
use App\Enums\PostStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
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
        'post_status',
        'views_count',
        'warranty',
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

    public function postMedias(): HasMany
    {
        return $this->hasMany(PostMedia::class);
    }
    public function postAttributes(): HasMany
    {
        return $this->hasMany(PostAttribute::class);
    }

    // Nếu muốn lấy trực tiếp file ảnh chính (is_primary = 1)
    public function primaryMedia(): HasOne
    {
        return $this->hasOne(PostMedia::class)->where('is_primary', 1);
    }

    public function primaryFile(): HasOneThrough
    {
        return $this->hasOneThrough(
            File::class,
            PostMedia::class,
            'post_id', // FK trên post_medias
            'id',      // PK trên files
            'id',      // PK trên posts
            'file_id'  // FK trên post_medias
        )->where('post_medias.is_primary', 1);
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