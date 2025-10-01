"use client"
import React from "react";
import EventForm from "@/components/EventForm";

export default function NewEventPage() {
  return (
    <div className="flex flex-col text-center justify-center items-center">
      <h1 className="text-2xl font-semibold mb-4">Create Event</h1>
      <div className="w-2/5">
        <EventForm />
      </div>
    </div>
  );
}
