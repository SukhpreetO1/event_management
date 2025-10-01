import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

type Event = {
  id: number;
  name: string;
  location?: string | null;
  start_time: string;
  end_time: string;
  max_capacity: number;
};

export default function EventCard({
  event,
  onDelete,
}: {
  event: Event;
  onDelete?: (id: number) => void; // callback to notify parent after deletion
}) {
  const API = process.env.NEXT_PUBLIC_API_BASE;

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete event "${event.name}"?`)) return;

    try {
      const res = await fetch(`${API}/events/${event.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Failed to delete event");
      }

      toast("Event deleted successfully");
      if (onDelete) onDelete(event.id);
    } catch (error) {
      toast((error as Error).message);
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm flex items-start justify-between">
      <div>
        <h3 className="text-lg font-medium">{event.name}</h3>
        <p className="text-sm text-slate-600">{event.location}</p>
        <p className="mt-1 text-sm text-slate-700">
          {new Date(event.start_time).toLocaleString()} — {new Date(event.end_time).toLocaleString()}
        </p>
      </div>

      <div className="items-end space-y-2">
        <span className="text-sm text-slate-500">Capacity: {event.max_capacity}</span>
        <div className="flex gap-3 pt-4">
          <Link href={`/events/${event.id}`}>
            <div className="text-blue-600 hover:underline text-sm cursor-pointer">View</div>
          </Link>

          <Link href={`/events/${event.id}/edit`}>
            <div className="text-green-600 hover:underline text-sm cursor-pointer">Edit</div>
          </Link>

          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-semibold cursor-pointer"
            aria-label={`Delete event ${event.name}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
