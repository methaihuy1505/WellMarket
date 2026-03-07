<?php
namespace App\Http\Controllers;

use App\Enums\EventStatus;
use App\Enums\EventType;
use App\Models\Event;
use App\Models\MiniGameType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class EventController extends Controller
{
    /**
     * Lấy danh sách sự kiện (kèm filter)
     */

    public function index(Request $request)
    {
        $query = Event::with('minigameType')->orderBy('created_at', 'desc');

        // 1. Filter: Search theo tên
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // 2. Filter: Loại sự kiện (daily/monthly)
        if ($request->type) {
            $query->where('event_type', $request->type);
        }

        // 3. Filter: Loại trò chơi (Bổ sung thêm cái này)
        if ($request->game_id) {
            $query->where('minigame_type_id', $request->game_id);
        }

        // 4. Filter: Ngày
        if ($request->from) {
            $query->whereDate('start_date', '>=', $request->from);
        }
        if ($request->to) {
            $query->whereDate('end_date', '<=', $request->to);
        }

        $events = $query->get();

        $data = $events->map(function ($e) {
            return [
                'id'          => $e->id,
                'title'       => $e->name,
                'type'        => $e->event_type instanceof EventType ? $e->event_type->value : $e->event_type,
                'gameType'    => $e->minigameType ? $e->minigameType->name : 'N/A',
                'gameTypeId'  => $e->minigame_type_id,
                'coins'       => $e->reward_amount,
                'start'       => $e->start_date,
                'end'         => $e->end_date,

                'status'      => $e->status instanceof EventStatus ? $e->status->value : $e->status,

                'description' => $e->description,
            ];
        });

        return response()->json(['data' => $data]);
    }

    /**
     * Lấy danh sách các loại Mini Game (để đổ vào dropdown)
     */
    public function getMiniGameTypes()
    {
        $types = MiniGameType::select('id', 'name')->get();
        return response()->json(['data' => $types]);
    }

    /**
     * Tạo sự kiện mới
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'             => 'required|string|max:255',
            'event_type'       => ['required', new Enum(EventType::class)],
            'minigame_type_id' => 'nullable|exists:minigame_types,id',
            'reward_amount'    => 'required|numeric|min:0',
            'start_date'       => 'required|date',
            'end_date'         => 'required|date|after:start_date',
            'description'      => 'nullable|string',
        ]);

        // Mặc định status là active
        $data['status'] = EventStatus::ACTIVE;

        $event = Event::create($data);

        return response()->json(['message' => 'Tạo sự kiện thành công', 'data' => $event]);
    }

    /**
     * Cập nhật sự kiện
     */
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $data = $request->validate([
            'name'             => 'sometimes|string|max:255',
            'event_type'       => ['sometimes', new Enum(EventType::class)],
            'minigame_type_id' => 'sometimes|exists:mini_game_types,id',
            'reward_amount'    => 'sometimes|numeric|min:0',
            'start_date'       => 'sometimes|date',
            'end_date'         => 'sometimes|date|after:start_date',
            'description'      => 'nullable|string',
        ]);

        $event->update($data);

        return response()->json(['message' => 'Cập nhật thành công', 'data' => $event]);
    }

    /**
     * Xóa sự kiện
     */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return response()->json(['message' => 'Đã xóa sự kiện']);
    }
}