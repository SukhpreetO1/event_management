<?php

namespace Tests\Feature;

use App\Models\Attendee;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_prevent_overbooking()
    {
        $event = Event::factory()->create(['max_capacity' => 2]);
        // create 2 attendees
        Attendee::factory()->create(['event_id'=>$event->id]);
        Attendee::factory()->create(['event_id'=>$event->id]);

        $response = $this->postJson("/api/events/{$event->id}/register", [
            'name'=>'Third',
            'email'=>'third@example.com'
        ]);

        $response->assertStatus(409);
    }
}
