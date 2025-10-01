<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Attendee;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class EventRegistrationService {
    /**
     * Registers an attendee with concurrency protection.
     * Throws exceptions on duplicate or capacity full.
     */
    public function register(int $eventId, string $name, string $email): Attendee {
        return DB::transaction(function() use ($eventId, $name, $email) {
            // Lock the event row to prevent race conditions
            $event = Event::lockForUpdate()->findOrFail($eventId);

            // Check if email already registered
            $exists = $event->attendees()->where('email', $email)->exists();
            if ($exists) {
                throw new HttpException(409, 'This email is already registered for the event.');
            }

            // Check max capacity
            $registeredCount = $event->attendees()->count();
            if ($registeredCount >= $event->max_capacity) {
                throw new HttpException(409, 'Event is fully booked.');
            }

            // Register attendee
            return $event->attendees()->create([
                'name' => $name,
                'email' => $email,
            ]);
        });
    }
}
