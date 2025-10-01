"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function EditEventPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        location: "",
        start_time: "",
        end_time: "",
        max_capacity: 1,
    });
    const router = useRouter();
    const API = process.env.NEXT_PUBLIC_API_BASE;

    useEffect(() => {
        fetch(`${API}/events`)
            .then((res) => res.json())
            .then((events) => {
                const event = events.find((e: any) => String(e.id) === id);
                if (event) {
                    setForm({
                        name: event.name,
                        location: event.location || "",
                        start_time: new Date(event.start_time).toISOString().slice(0, 16),
                        end_time: new Date(event.end_time).toISOString().slice(0, 16),
                        max_capacity: event.max_capacity,
                    });
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [API, id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch(`${API}/events/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            toast.success("Event updated");
            router.push(`/events`);
        } else {
            const json = await res.json().catch(() => ({}));
            toast.error(json.message || "Failed to update event");
        }
    }

    if (loading) return <div className="text-slate-500">Loading event...</div>;

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-sm">
            <h1 className="text-xl font-semibold mb-4">Edit Event</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Name</Label>
                    <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <Label>Location</Label>
                    <Input
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                </div>

                <div>
                    <Label>Start Time</Label>
                    <Input
                        type="datetime-local"
                        value={form.start_time}
                        onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <Label>End Time</Label>
                    <Input
                        type="datetime-local"
                        value={form.end_time}
                        onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <Label>Max Capacity</Label>
                    <Input
                        type="number"
                        min="1"
                        value={form.max_capacity}
                        onChange={(e) =>
                            setForm({ ...form, max_capacity: parseInt(e.target.value) })
                        }
                        required
                    />
                </div>

                <Button type="submit" className="mt-4 cursor-pointer">
                    Update Event
                </Button>
            </form>
        </div>
    );
}
