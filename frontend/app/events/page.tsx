"use client"
import React, { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";

type Event = {
  id: number;
  name: string;
  location?: string | null;
  start_time: string;
  end_time: string;
  max_capacity: number;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]|null>(null);
  const [loading, setLoading] = useState(true);
  const API = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/events`)
      .then(r => r.json())
      .then(data => setEvents(data))
      .catch(err => {
        console.error(err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, [API]);

  function handleDelete(id: number) {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Upcoming events</h1>

      {loading && <div className="text-slate-500">Loading events…</div>}
      {!loading && events && events.length === 0 && (
        <div className="bg-white p-6 rounded shadow-sm text-slate-600">No upcoming events found.</div>
      )}

      <div className="grid gap-4">
        {events?.map(ev => <EventCard key={ev.id} event={ev} onDelete={handleDelete} />)}
      </div>
    </div>
  );
}
