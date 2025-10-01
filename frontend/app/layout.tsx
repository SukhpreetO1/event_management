import type { Metadata } from "next";
import './globals.css'
import React from 'react'
import Link from 'next/link'
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: 'Mini Event Management',
  description: 'Frontend for Mini Event Management System'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white shadow-sm">
          <div className="py-4 px-4 flex items-center justify-between">
            <Link href="/">
              <div className="text-xl font-semibold">Mini Events</div>
            </Link>
            <nav className="space-x-4 flex-row flex">
              <Link href="/events">
                <div className="text-slate-600 hover:text-slate-900">Events</div>
              </Link>
              <Link href="/events/new">
                <div className="text-blue-600 hover:text-blue-700">Create Event</div>
              </Link>
            </nav>
          </div>
        </header>

        <main className="py-8 pb-0 max-w-5xl mx-auto px-4">
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </main>
        <footer className="py-4 text-center text-sm text-slate-500">
          Built with ❤️
        </footer>
      </body>
    </html>
  )
}
