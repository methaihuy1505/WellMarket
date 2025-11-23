<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    protected $fillable = [
        'storage_provider',
        'object_key',
        'url',
        'thumbnail_url',
        'file_name',
        'content_type',
        'file_size',
        'width',
        'height',
        'file_type',
        'uploaded_by',
        'is_public',
        'meta',
    ];

    protected $casts = [
        'file_size'  => 'integer',
        'width'      => 'integer',
        'height'     => 'integer',
        'is_public'  => 'boolean',
        'meta'       => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
