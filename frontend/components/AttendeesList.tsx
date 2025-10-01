"use client"
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Attendee = {
  id: number;
  name: string;
  email: string;
  created_at?: string;
};

export default function AttendeesList({ eventId, refreshTrigger }: { eventId: number; refreshTrigger?: number }) {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const API = process.env.NEXT_PUBLIC_API_BASE;
  const perPage = 10;

  function fetchPage(p: number) {
    setLoading(true);
    fetch(`${API}/events/${eventId}/attendees?per_page=${perPage}&page=${p}`)
      .then(async r => {
        const json = await r.json();
        // Laravel paginated response: data + meta
        if (json.data) {
          setAttendees(json.data);
          setTotalPages(json.last_page || Math.ceil((json.total || 0) / (json.per_page || perPage)));
        } else {
          // fallback: array
          setAttendees(json);
          setTotalPages(undefined);
        }
      })
      .catch(err => {
        console.error(err);
        setAttendees([]);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchPage(1); setPage(1); }, [eventId, refreshTrigger]);

  async function deleteAttendee(attendeeId: number) {
    if (!confirm("Are you sure you want to delete this attendee?")) return;

    try {
      const res = await fetch(`${API}/events/${eventId}/attendees/${attendeeId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete attendee");

      // Refresh attendees list after deletion
      fetchPage(page);
    } catch (err) {
      toast((err as Error).message || "Error deleting attendee");
    }
  }

  return (
    <div>
      {loading && <div className="text-slate-500">Loading attendees…</div>}
      {!loading && attendees.length === 0 && <div className="text-slate-600">No attendees yet.</div>}

      <ul className="space-y-2">
        {attendees.map(a => (
          <li key={a.id} className="flex justify-between bg-slate-50 p-3 rounded">
            <div>
              <div className="font-medium">{a.name}</div>
              <div className="text-sm text-slate-600">{a.email}</div>
            </div>
            <div className="text-sm text-slate-400">{a.created_at ? new Date(a.created_at).toLocaleString() : ""}</div>
            <button
              onClick={() => deleteAttendee(a.id)}
              className="text-red-600 hover:text-red-800 text-sm font-semibold cursor-pointer"
              aria-label={`Delete attendee ${a.name}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {totalPages ? (
        <div className="mt-4 flex items-center gap-2">
          <button className="px-3 py-1 rounded border cursor-pointer" disabled={page <= 1} onClick={() => { setPage(p => Math.max(1, p - 1)); fetchPage(page - 1); }}>
            Prev
          </button>
          <span className="text-sm text-slate-600">Page {page} / {totalPages}</span>
          <button className="px-3 py-1 rounded border cursor-pointer" disabled={totalPages !== undefined && page >= totalPages} onClick={() => { setPage(p => p + 1); fetchPage(page + 1); }}>
            Next
          </button>
        </div>
      ) : (
        <div className="mt-4 text-sm text-slate-500">No pagination metadata available.</div>
      )}
    </div>
  );
}
