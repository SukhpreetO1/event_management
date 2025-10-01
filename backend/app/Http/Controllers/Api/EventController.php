<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\RegisterAttendeeRequest;
use App\Models\Attendee;
use App\Models\Event;
use App\Services\EventRegistrationService;
use Illuminate\Http\Request;

class EventController extends Controller
{
    protected $registrationService;
    public function __construct(EventRegistrationService $registrationService)
    {
        $this->registrationService = $registrationService;
    }

    // POST /events
    public function store(StoreEventRequest $req)
    {
        // Assume client may send times in local timezone; convert to UTC before storing
        $data = $req->validated();
        $start = \Carbon\Carbon::parse($data['start_time'])->timezone('UTC');
        $end = \Carbon\Carbon::parse($data['end_time'])->timezone('UTC');
        $event = Event::create([
            'name' => $data['name'],
            'location' => $data['location'] ?? null,
            'start_time' => $start,
            'end_time' => $end,
            'max_capacity' => $data['max_capacity'],
        ]);
        return response()->json($event, 201);
    }

    // GET /events
    public function index(Request $req)
    {
        // Filter upcoming events (current UTC time)
        $nowUtc = \Carbon\Carbon::now('UTC');
        $events = Event::where('end_time', '>=', $nowUtc)
            ->orderBy('start_time', 'asc')
            ->get();
        return response()->json($events);
    }

    // POST /events/{event_id}/register
    public function register(RegisterAttendeeRequest $req, $eventId)
    {
        $data = $req->validated();
        try {
            $attendee = $this->registrationService->register($eventId, $data['name'], $data['email']);
            return response()->json($attendee, 201);
        } catch (\Exception $e) {
            // Force 409 for overbooking
            if (str_contains($e->getMessage(), 'full')) {
                $code = 409;
            } else {
                $code = $e->getCode() ?: 400;
            }
            return response()->json(['message' => $e->getMessage()], $code);
        }
    }

    // Update event detail
    public function update(Request $request, Event $event)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after_or_equal:start_time',
            'max_capacity' => 'required|integer|min:1',
        ]);

        $event->update([
            'name' => $data['name'],
            'location' => $data['location'],
            'start_time' => \Carbon\Carbon::parse($data['start_time'])->timezone('UTC'),
            'end_time' => \Carbon\Carbon::parse($data['end_time'])->timezone('UTC'),
            'max_capacity' => $data['max_capacity'],
        ]);

        return response()->json($event);
    }

    // DELETE the event
    public function delete_event(Request $req, $eventId)
    {
        Attendee::where('event_id', $eventId)->delete();
        Event::where('id', $eventId)->delete();
        return response()->json(["message" => "Event deleted successfully", 200]);
    }

    // GET /events/{event_id}/attendees
    public function attendees(Request $req, $eventId)
    {
        $perPage = (int) $req->query('per_page', 20);
        $attendees = Event::findOrFail($eventId)->attendees()->orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($attendees);
    }

    // DELETE the attendee record 
    public function delete_attendee(Request $req, $eventId, $attendeeId) 
    {
        Attendee::where('id', $attendeeId)->where('event_id', $eventId)->delete();
        return response()->json(["message" => "Attendee deleted successfully", 200]);
    }
}
