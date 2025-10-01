<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Event;
use Carbon\Carbon;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        $start = Carbon::now()->addDays($this->faker->numberBetween(1, 10));
        $end = (clone $start)->addHours(2);

        return [
            'name' => $this->faker->sentence(3),
            'location' => $this->faker->city,
            'start_time' => $start,
            'end_time' => $end,
            'max_capacity' => $this->faker->numberBetween(10, 100),
        ];
    }
}
