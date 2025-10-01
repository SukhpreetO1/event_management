"use client"
import React, { useEffect, useState } from "react";
import RegistrationForm from "../../../components/RegistrationForm";
import AttendeesList from "../../../components/AttendeesList";

type Event = {
  id:number; name:string; location?:string|null;
  start_time:string; end_time:string; max_capacity:number;
};

export default function EventDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshAttendees, setRefreshAttendees] = useState(0);
  const API = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/events`)
      .then(r => r.json())
      .then((data: Event[]) => {
        const found = data.find(e => String(e.id) === String(id));
        if (found) setEvent(found);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [API, id]);

  return (
    <div>
      {loading && <div className="text-slate-500">Loading…</div>}
      {!loading && !event && <div className="text-red-500">Event not found</div>}
      {event && (
        <>
          <h1 className="text-2xl font-semibold">{event.name}</h1>
          <p className="text-slate-600">{event.location}</p>
          <p className="mt-2 text-sm text-slate-700">
            {new Date(event.start_time).toLocaleString()} — {new Date(event.end_time).toLocaleString()}
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="font-medium mb-3">Register</h3>
              <RegistrationForm eventId={event.id} onRegistered={() => setRefreshAttendees(prev => prev + 1)} />
            </div>

            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="font-medium mb-3">Attendees</h3>
              <AttendeesList eventId={event.id} refreshTrigger={refreshAttendees} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
