import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mini Event Management</h1>
      <p className="text-slate-600">A small demo project based on the Mini Event Management.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/events">
          <div className="block p-6 rounded-lg shadow-sm bg-white hover:shadow-md">
            <h3 className="text-lg font-medium">Events</h3>
            <p className="text-sm text-slate-500 mt-1">Browse upcoming events and register attendees.</p>
          </div>
        </Link>

        <Link href="/events/new">
          <div className="block p-6 rounded-lg shadow-sm bg-white hover:shadow-md">
            <h3 className="text-lg font-medium">Create Event</h3>
            <p className="text-sm text-slate-500 mt-1">Create a new event with capacity and timings.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
