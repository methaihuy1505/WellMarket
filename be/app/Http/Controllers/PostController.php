<?php
namespace App\Http\Controllers;

use App\Enums\ItemCondition;
use App\Enums\PaymentStatus;
use App\Enums\PostStatus;
use App\Http\Controllers\Controller;
use App\Models\BoostPackage;
use App\Models\Category;
use App\Models\Interaction;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Post;
use App\Models\PostAttribute;
use App\Models\PostBoost;
use App\Models\PostMedia;
use App\Models\Product;
use App\Models\ScheduledBoost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Enum;

class PostController extends Controller
{
    public function show($id)
    {
        $post = Post::with([
            'product.model',
            'postAttributes.attribute',
            'user',
            'category',
            'postMedias.file',
        ])->findOrFail($id);

        // ===== Media =====
        $medias = $post->postMedias
            ->sortBy('position')
            ->map(function ($m) {
                if (! $m->file) {
                    return null;
                }

                return [
                    'id'         => $m->id,
                    'type'       => $m->file->file_type, // image | video
                    'url'        => $m->file->url,
                    'thumbnail'  => $m->file->thumbnail_url,
                    'is_primary' => (bool) $m->is_primary,
                    'position'   => $m->position,
                ];
            })
            ->filter()
            ->values();

        // ===== Sold count =====
        $soldCount = Order::where('post_id', $post->id)
            ->where('status', 'completed')
            ->count();

        // ===== Reviews =====
        $reviewQuery = Interaction::where('target_type', 'post')
            ->where('target_id', $post->id)
            ->where('interaction_type', 'feedback')
            ->whereNotNull('rating');

        $reviewCount = (clone $reviewQuery)->count();
        $avgRating   = (clone $reviewQuery)->avg('rating');

        // ===== Attributes (FIX LẶP) =====
        $attributes = $post->product ? $post->postAttributes
            ->unique(function ($a) {
                return $a->attribute_id;
            })
            ->map(function ($a) {
                return $a->attribute->label . ': ' . $a->value;
            })
            ->values()
            ->all()
            : [];

        return response()->json([
            'id'             => $post->id,
            'title'          => $post->title,
            'description'    => $post->description,
            'model_name'     => optional($post->product->model)->name,
            'attributes'     => $attributes,
            'price'          => $post->price ? (float) $post->price : null,
            'location'       => $post->location,
            'item_condition' => $post->item_condition,
            'views_count'    => $post->views_count,
            'created_at'     => $post->created_at,
            'updated_at'     => $post->updated_at,
            'updated_ago'    => optional($post->updated_at)->diffForHumans(),
            'medias'         => $medias,
            'user_id'        => $post->user_id,
            'user_name'      => $post->user->name,
            'post_phone'     => $post->user->phone ?? null,
            'category_id'    => $post->category_id,
            'category_name'  => $post->category->name,
            'sold_count'     => $soldCount,
            'review_count'   => $reviewCount,
            'avg_rating'     => $avgRating ? round($avgRating, 1) : null,
            'warranty'       => $post->warranty,
        ]);
    }

    /**
     * Helper: Lấy danh sách ID danh mục con (đệ quy)
     */
    private function getAllSubCategoryIds($categoryId)
    {
        $ids      = [$categoryId];
        $children = Category::where('parent_id', $categoryId)->pluck('id');

        foreach ($children as $childId) {
            $ids = array_merge($ids, $this->getAllSubCategoryIds($childId));
        }

        return $ids;
    }

    /**
     * API: Lấy danh sách bài đăng (Public)
     * - Chỉ lấy bài Active
     * - Ưu tiên bài có gói Boost (còn hạn) lên đầu
     * - Hỗ trợ lọc & tìm kiếm
     */
    public function getall(Request $request)
    {
        // 1. Khởi tạo Query & Select bảng posts để tránh trùng ID khi join
        $query = Post::query()->select('posts.*');

        // 2. BẮT BUỘC: Chỉ lấy bài đang Active
        // (Nếu dùng Enum thì thay 'active' bằng PostStatus::ACTIVE->value)
        $query->where('posts.post_status', 'active');

        // 3. JOIN BẢNG BOOST (Đã sửa: Bỏ check status, chỉ check thời gian)
        $now = now();

        $query->leftJoin('post_boosts', function ($join) use ($now) {
            $join->on('posts.id', '=', 'post_boosts.post_id')
                ->where('post_boosts.start_at', '<=', $now) // Đã bắt đầu
                ->where('post_boosts.end_at', '>=', $now);  // Chưa kết thúc
        })
            ->leftJoin('boost_packages', 'post_boosts.boost_package_id', '=', 'boost_packages.id');

        // 4. EAGER LOAD
        $query->with([
            'primaryFile',
            'product.model',
            'postAttributes.attribute',
            'category',
            'user',
            'postMedias.file',
        ]);

        // ==================== CÁC BỘ LỌC (FILTERS) ====================
        // (Giữ nguyên phần filter như cũ)
        if ($request->filled('category')) {
            $categoryId  = $request->input('category');
            $categoryIds = $this->getAllSubCategoryIds($categoryId);
            $query->whereIn('posts.category_id', $categoryIds);
        }
        if ($request->filled('keyword')) {
            $query->where('posts.title', 'like', '%' . $request->input('keyword') . '%');
        }
        if ($request->filled('brands')) {
            $query->whereHas('product', function ($q) use ($request) {
                $q->whereIn('brand_id', (array) $request->input('brands'));
            });
        }
        if ($request->filled('models')) {
            $query->whereHas('product', function ($q) use ($request) {
                $q->whereIn('model_id', (array) $request->input('models'));
            });
        }
        if ($request->filled('price_min')) {
            $query->where('posts.price', '>=', $request->input('price_min'));
        }
        if ($request->filled('price_max')) {
            $query->where('posts.price', '<=', $request->input('price_max'));
        }
        if (is_array($request->input('attributes'))) {
            foreach ($request->input('attributes') as $attrId => $values) {
                $query->whereHas('postAttributes', function ($q) use ($attrId, $values) {
                    $q->where('attribute_id', $attrId)
                        ->whereIn('value', (array) $values);
                });
            }
        }
        if ($request->filled('item_condition')) {
            $query->whereIn('posts.item_condition', (array) $request->input('item_condition'));
        }
        if ($request->filled('warranty')) {
            $query->whereIn('posts.warranty', (array) $request->input('warranty'));
        }
        if ($request->filled('has_video') && $request->boolean('has_video')) {
            $query->whereHas('postMedias.file', function ($q) {
                $q->where('file_type', 'video');
            });
        }

        // ==================== SẮP XẾP (SORTING) ====================

        // 1. Ưu tiên theo CẤP ĐỘ GÓI (Priority) cao nhất
        // Dùng MAX: Nếu 1 bài mua nhiều gói, lấy gói có quyền lực cao nhất để xếp hạng
        $query->orderByRaw('COALESCE(MAX(boost_packages.priority), 0) DESC');

        // 2. Ưu tiên theo TỔNG GIÁ TRỊ (Nếu cùng cấp độ Priority)
        // Ai chi nhiều tiền hơn (mua số lượng nhiều hoặc mua thêm gói phụ) sẽ đứng trên
        $query->orderByRaw('COALESCE(SUM(boost_packages.price * post_boosts.quantity), 0) DESC');

        // 3. Các bộ lọc sắp xếp từ Client (User chọn)
        if ($request->input('sort') === 'price_asc') {
            $query->orderBy('posts.price', 'asc');
        } elseif ($request->input('sort') === 'price_desc') {
            $query->orderBy('posts.price', 'desc');
        } else {
            // Mặc định: Bài mới nhất lên đầu (trong nhóm cùng priority và cùng tiền boost)
            $query->orderBy('posts.created_at', 'desc');
        }

        // Gom nhóm để tránh trùng lặp
        $query->groupBy('posts.id');

        // ==================== TRẢ VỀ ====================

        $perPage = $request->input('per_page', 20);
        $posts   = $query->paginate($perPage);

        $user   = Auth::guard('api')->user();
        $userId = optional($user)->id;

        return response()->json([
            'data' => $posts->map(function ($post) use ($userId) {
                return [
                    'id'             => $post->id,
                    'title'          => $post->title,
                    'model_name'     => optional($post->product->model)->name,
                    'attributes'     => $post->postAttributes
                        ->map(function ($a) {
                            return optional($a->attribute)->name . ': ' . $a->value;
                        })->values()->all(),
                    'price'          => $post->price,
                    'location'       => $post->location,
                    'item_condition' => $post->item_condition,
                    'warranty'       => $post->warranty,
                    'views_count'    => $post->views_count,
                    'created_at'     => $post->created_at,
                    'image_url'      => optional($post->primaryFile)->url,

                    'is_favorited'   => $userId
                        ? $post->favorites()->where('user_id', $userId)->exists()
                        : false,

                    'author'         => [
                        'id'     => optional($post->user)->id,
                        'name'   => optional($post->user)->name,
                        'avatar' => optional(optional($post->user)->file)->url ?? optional($post->user)->avatar_url,
                    ],

                    // SỬA: Bỏ check status ở đây luôn
                    'is_boosted'     => $post->postBoosts()
                        ->where('start_at', '<=', now())
                        ->where('end_at', '>=', now())
                    // ĐÃ XÓA: ->where('status', 'active')
                        ->exists(),
                ];
            }),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page'    => $posts->lastPage(),
                'per_page'     => $posts->perPage(),
                'total'        => $posts->total(),
            ],
        ]);
    }

    public function checkFee(Request $request)
    {
        $user = $request->user();

        $postCount = $user->posts()->count();
        $baseFee   = $postCount >= 2 ? 6000 : 0;
        $extraFee  = 0;

        $images = $request->input('images_count', 0);
        $videos = $request->input('videos_count', 0);

        if ($videos > 0 && $images >= 3) {
            $extraFee += 2000;
        }

        $totalFee = $baseFee + $extraFee;

        return response()->json([
            'need_payment' => $totalFee > 0,
            'amount'       => $totalFee,
            'breakdown'    => ['base' => $baseFee, 'extra' => $extraFee],
        ]);
    }

    // Thêm bài đăng mới
    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'category_id'    => 'required|exists:categories,id',
            'brand_id'       => 'nullable|exists:brands,id',
            'model_id'       => 'required|exists:models,id',
            'title'          => 'required|string|max:255',
            'description'    => 'required|string',
            'price'          => 'required|numeric|min:0',
            'item_condition' => ['required', new Enum(ItemCondition::class)],
            'location'       => 'nullable|string|max:255',
            'warranty'       => 'nullable|string|max:255',
            'post_status'    => ['nullable', new Enum(PostStatus::class)],
            'images'         => 'nullable|array',
            'images.*'       => 'integer|exists:files,id',
            'videos'         => 'nullable|array',
            'videos.*'       => 'integer|exists:files,id',
            'attributes'     => 'nullable|array',
            'payment_id'     => 'nullable|exists:payments,id',
        ]);
        $data['brand_id'] = $data['brand_id'] ?: null;

        $payment = null;
        if (! empty($data['payment_id'])) {
            $payment = Payment::where('id', $data['payment_id'])
                ->where('user_id', $user->id)
                ->where('status', PaymentStatus::SUCCESS)
                ->first();
            if (! $payment) {
                return response()->json(['message' => 'Thanh toán không hợp lệ hoặc chưa hoàn tất'], 422);
            }
        }

        DB::beginTransaction();
        try {
            // Tìm product theo category_id, brand_id, model_id
            $product = Product::where('category_id', $data['category_id'])
                ->where('brand_id', $data['brand_id'])
                ->where('model_id', $data['model_id'])
                ->first();

            $incomingAttrs = $request->input('attributes', []);
            // Nếu chưa có product thì tạo mới
            if (! $product) {
                $product = Product::create([
                    'category_id' => $data['category_id'],
                    'brand_id'    => $data['brand_id'],
                    'model_id'    => $data['model_id'],
                ]);
            }

            // Sau đó tạo post gắn với product
            $post = Post::create([
                'user_id'        => $user->id,
                'product_id'     => $product->id,
                'category_id'    => $data['category_id'],
                'title'          => $data['title'],
                'description'    => $data['description'],
                'price'          => $data['price'],
                'item_condition' => $data['item_condition'],
                'location'       => $data['location'],
                'warranty'       => $data['warranty'] ?? null,
                'post_status'    => PostStatus::WAITING_APPROVAL,
            ]);

            $incomingAttrs = $request->input('attributes', []);
            foreach ($incomingAttrs as $attrId => $value) {
                PostAttribute::create([
                    'post_id'      => $post->id, // sau khi tạo post
                    'attribute_id' => (int) $attrId,
                    'value'        => $value,
                ]);
            }

            //  Lưu PostMedias (ảnh)
            if (! empty($data['images'])) {
                foreach ($data['images'] as $index => $fileId) {
                    PostMedia::create([
                        'post_id'    => $post->id,
                        'file_id'    => (int) $fileId,
                        'type'       => 'image',
                        'position'   => $index,
                        'is_primary' => $index === 0,
                    ]);
                }
            }
            //  Lưu PostMedias (video)
            if (! empty($data['videos'])) {
                foreach ($data['videos'] as $index => $fileId) {
                    PostMedia::create([
                        'post_id'    => $post->id,
                        'file_id'    => (int) $fileId,
                        'type'       => 'video',
                        'position'   => $index,
                        'is_primary' => false,
                    ]);
                }
            }
            // Liên kết payment với post
            if ($payment && empty($payment->post_id)) {
                $payment->post_id = $post->id;
                $payment->save();
            }
            //Tạo boost (nếu có)
            if ($payment) {
                $note   = json_decode($payment->note ?? '{}', true);
                $boosts = $note['boosts'] ?? []; // mảng [{boost_package_id, quantity, time_slots?, days?}, ...]

                foreach ($boosts as $boostData) {
                    $boostPackageId = $boostData['boost_package_id'] ?? null;
                    $quantity       = $boostData['quantity'] ?? 1;
                    $timeSlots      = $boostData['time_slots'] ?? [];
                    $days           = $boostData['days'] ?? 1;

                    if (! $boostPackageId) {
                        continue;
                    }

                    $boostPackage = BoostPackage::find($boostPackageId);
                    if (! $boostPackage) {
                        continue;
                    }

                    if ($boostPackage->category_id === 1) {
                        // Gói hẹn giờ
                        $endAt = now()->addDays($days - 1);
                        if (! empty($timeSlots)) {
                            [$lastStart, $lastEnd] = explode('-', end($timeSlots));
                            $endAt                 = $endAt->setTimeFromTimeString($lastEnd);
                        } else {
                            $endAt = $endAt->endOfDay();
                        }

                        $postBoost = PostBoost::create([
                            'post_id'          => $post->id,
                            'boost_package_id' => $boostPackageId,
                            'quantity'         => $quantity,
                            'start_at'         => now(),
                            'end_at'           => $endAt,
                        ]);

                        for ($d = 0; $d < $days; $d++) {
                            foreach ($timeSlots as $slot) {
                                [$startHour, $endHour] = explode('-', $slot);
                                $scheduledAt           = now()->addDays($d)->setTimeFromTimeString($startHour);
                                ScheduledBoost::create([
                                    'post_boost_id' => $postBoost->id,
                                    'scheduled_at'  => $scheduledAt,
                                ]);
                            }
                        }
                    } else {
                        // Các gói thường/ưu tiên/nâng cấp
                        $startAt = now();
                        $hours   = ($boostPackage->duration ?? 1) * $quantity;
                        $endAt   = (clone $startAt)->addHours($hours);

                        PostBoost::create([
                            'post_id'          => $post->id,
                            'boost_package_id' => $boostPackageId,
                            'quantity'         => $quantity,
                            'start_at'         => $startAt,
                            'end_at'           => $endAt,
                        ]);
                    }
                }
            }

            DB::commit();

            return response()->json([
                'message'         => 'Tạo bài đăng thành công',
                'post'            => $post->load('postMedias.file'),
                'product'         => $product,
                'post_attributes' => $post->postAttributes()->get(),

            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error($e);

            return response()->json(['message' => 'Error creating post', 'error' => $e->getMessage()], 500);
        }
    }

    // ... (Giữ nguyên các hàm show, store, update, checkFee, getAllSubCategoryIds...)

    // ==========================================
    // KHU VỰC ADMIN (ADDON) - KHÔNG ẢNH HƯỞNG LOGIC CŨ
    // ==========================================

    // ... (Giữ nguyên phần đầu file) ...

    // ==========================================
    // KHU VỰC ADMIN (ĐÃ SỬA THEO YÊU CẦU DUYỆT BÀI)
    // ==========================================

    /**
     * 1. Lấy danh sách bài đăng chính (Active, Rejected, Sold, Hidden...)
     * Loại bỏ bài 'waiting_approval' để hiển thị ở tab riêng
     */
    public function adminIndex(Request $request)
    {
        $posts = Post::with(['user', 'category'])
            ->where('post_status', '!=', 'waiting_approval') // Lọc bỏ bài chờ duyệt
            ->orderBy('created_at', 'desc')
            ->get();

        $data = $posts->map(function ($p) {
            $status = $p->post_status instanceof PostStatus ? $p->post_status->value : $p->post_status;
            return [
                'id'          => $p->id,
                'title'       => $p->title,
                'category'    => $p->category ? $p->category->name : 'N/A',
                'price'       => $p->price,
                'status'      => $status,
                'description' => $p->description,
                'author'      => $p->user ? $p->user->name : 'Unknown',
                'created_at'  => $p->created_at,
                'category_id' => $p->category_id,
            ];
        });

        return response()->json(['data' => $data]);
    }

    /**
     * 2. Lấy danh sách CHỜ DUYỆT (Pending)
     */
    public function getPendingPosts()
    {
        $posts = Post::with(['user', 'category'])
            ->where('post_status', 'waiting_approval') // Chỉ lấy bài chờ duyệt
            ->orderBy('created_at', 'desc')
            ->get();

        $data = $posts->map(function ($p) {
            return [
                'id'         => $p->id,
                'title'      => $p->title,
                'category'   => $p->category ? $p->category->name : 'N/A',
                'price'      => $p->price,
                'author'     => $p->user ? $p->user->name : 'Unknown',
                'created_at' => $p->created_at,
            ];
        });

        return response()->json(['data' => $data]);
    }

    /**
     * 3. Cập nhật trạng thái (Duyệt, Từ chối, Đảo trạng thái)
     */
    public function updateStatus(Request $request, $id)
    {
        $post = Post::find($id);
        if (! $post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        // Validate status gửi lên (nếu có) hoặc tự động đảo
        $request->validate([
            'status' => 'nullable|in:active,rejected',
        ]);

        $newStatus = $request->status;

        // Nếu không gửi status cụ thể -> Tự động toggle Active <-> Rejected
        if (! $newStatus) {
            $currentStatus = $post->post_status instanceof PostStatus ? $post->post_status->value : $post->post_status;
            if ($currentStatus === 'active') {
                $newStatus = 'rejected';
            } else {
                $newStatus = 'active';
            }
        }

        $post->post_status = $newStatus;
        $post->save();

        $msg = $newStatus === 'active' ? 'Đã duyệt bài đăng' : 'Đã từ chối bài đăng';

        return response()->json([
            'message' => $msg,
            'data'    => [
                'id'         => $post->id,
                'status'     => $newStatus,
                'updated_at' => $post->updated_at,
            ],
        ]);
    }

    public function getPostReports()
    {
        $reports = Interaction::where('interaction_type', 'report')
            ->where('target_type', 'post')
            ->with(['reason', 'user', 'target'])
            ->orderBy('created_at', 'desc')
            ->get();

        $data = $reports->map(function ($r) {
            $postTitle = "Unknown Post";
            $postId    = null;
            if ($r->target instanceof Post) {
                $postTitle = $r->target->title;
                $postId    = $r->target->id;
            } else {
                $postTitle = "Post #{$r->target_id}";
                $postId    = $r->target_id;
            }
            return [
                'id'           => $r->id,
                'postId'       => $postId,
                'postTitle'    => $postTitle,
                'reporterName' => $r->user ? $r->user->name : 'Anonymous',
                'reason'       => $r->reason_text ?? ($r->reason ? $r->reason->title : 'Other'),
                'created_at'   => $r->created_at,
            ];
        });
        return response()->json(['data' => $data]);
    }

    public function adminUpdate(Request $request, $id)
    {
        $post = Post::find($id);
        if (! $post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $post->update($request->only(['title', 'price', 'description', 'post_status'])); // lưu ý field post_status
        return response()->json(['message' => 'Update success', 'data' => $post]);
    }

    public function adminDestroy($id)
    {
        $post = Post::find($id);
        if (! $post) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $post->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

}
