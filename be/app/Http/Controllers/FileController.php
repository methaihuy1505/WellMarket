<?php
namespace App\Http\Controllers;

use App\Models\File;
use App\Services\FileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FileController extends Controller
{
    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    /**
     * Lưu metadata file (Cloudinary) vào DB
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'storage_provider' => 'required|string|in:cloudinary',
            'object_key'       => 'required|string',
            'url'              => 'required|url',
            'thumbnail_url'    => 'nullable|url',
            'file_name'        => 'nullable|string',
            'content_type'     => 'nullable|string',
            'file_size'        => 'nullable|integer',
            'width'            => 'nullable|integer',
            'height'           => 'nullable|integer',
            'file_type'        => 'nullable|string|in:image,video',
            'meta'             => 'nullable',
        ]);

        DB::beginTransaction();
        try {
            $file = $this->fileService->createFile($data, $user->id);

            DB::commit();

            return response()->json([
                'message' => 'File saved',
                'file'    => $file,
                'file_id' => $file->id,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error saving file',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Xóa file cả trên Cloudinary và trong DB
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        DB::beginTransaction();
        try {
            $file = File::where('id', $id)
                ->where('uploaded_by', $user->id)
                ->first();

            if (! $file) {
                return response()->json([
                    'message' => 'File không tồn tại hoặc không thuộc về bạn',
                ], 404);
            }

            // Nếu file đang được gắn làm avatar thì bỏ liên kết
            if ($user->avatar_file_id === $file->id) {
                $user->avatar_file_id = null;
                $user->save();
            }

            // Nếu có PostMedia liên kết thì xóa luôn
            $file->postMedias()->delete();

            // Gọi service để xóa file trên Cloudinary + DB
            $this->fileService->deleteFile($file);

            DB::commit();

            return response()->json(['message' => 'Xóa file thành công'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error deleting file',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
