<?php
namespace App\Services;

use App\Models\File;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Cloudinary\Api\Admin\AdminApi;
use Illuminate\Support\Facades\Log;

class FileService
{
    /**
     * Tạo record File mới từ metadata (Cloudinary)
     */
    public function createFile(array $data, int $userId): File
    {
        return File::create([
            'storage_provider' => $data['storage_provider'],
            'object_key'       => $data['object_key'],
            'url'              => $data['url'],
            'thumbnail_url'    => $data['thumbnail_url'] ?? null,
            'file_name'        => $data['file_name'] ?? null,
            'content_type'     => $data['content_type'] ?? null,
            'file_size'        => $data['file_size'] ?? null,
            'width'            => $data['width'] ?? null,
            'height'           => $data['height'] ?? null,
            'file_type'        => $data['file_type'] ?? 'image',
            'uploaded_by'      => $userId,
            'is_public'        => true,
            'meta'             => $data['meta'] ?? null,
        ]);
    }

    /**
     * Xóa file cả trên Cloudinary và trong DB
     */
    public function deleteFile(File $file): void
    {
        try {
            $adminApi = new AdminApi();
            $adminApi->deleteAssets([$file->object_key], [
                'resource_type' => $file->file_type ?? 'image',
            ]);
        } catch (\Exception $e) {
            Log::warning('Cloudinary delete failed', ['error' => $e->getMessage()]);
        }

        $file->delete();
    }

}
