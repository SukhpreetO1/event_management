<?php

use App\Http\Controllers\Api\EventController;
use Illuminate\Support\Facades\Route;

Route::post('/events', [EventController::class,'store']);
Route::get('/events', [EventController::class,'index']);
Route::put('/events/{event}', [EventController::class, 'update']);
Route::post('/events/{event}/register', [EventController::class,'register']);
Route::delete('/events/{event}', [EventController::class,'delete_event']);
Route::get('/events/{event}/attendees', [EventController::class,'attendees']);
Route::delete('/events/{event}/attendees/{attendee_id}', [EventController::class,'delete_attendee']);