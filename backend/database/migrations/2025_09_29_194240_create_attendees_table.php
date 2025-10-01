<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendeesTable extends Migration {
    public function up(): void {
        Schema::create('attendees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->timestamps();
            $table->unique(['event_id', 'email']); // prevents duplicate at DB level
        });
    }
    public function down(): void {
        Schema::dropIfExists('attendees');
    }
}
