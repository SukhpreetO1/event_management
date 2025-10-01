"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  location?: string;
  start_time: string; // ISO local: e.g. "2025-10-01T09:00"
  end_time: string;
  max_capacity: number;
};

export default function EventForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      name: "",
      location: "",
      start_time: "",
      end_time: "",
      max_capacity: 10
    }
  });

  const API = process.env.NEXT_PUBLIC_API_BASE;

  function toUtcIso(localDatetime: string) {
    // localDatetime from <input type="datetime-local"> like "2025-10-01T09:00"
    // create a Date using local timezone and convert to ISO (UTC)
    return new Date(localDatetime).toISOString();
  }

  async function onSubmit(data: FormValues) {
    const payload = {
      name: data.name,
      location: data.location,
      start_time: toUtcIso(data.start_time),
      end_time: toUtcIso(data.end_time),
      max_capacity: Number(data.max_capacity)
    };

    const res = await fetch(`${API}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      toast("Error creating event: " + (json.message || res.statusText));
      return;
    }

    toast("Event created");
    // redirect to events list:
    window.location.href = "/events";
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 rounded">
      <div>
        <Label>Name</Label>
        <Input {...register("name", { required: true })} placeholder="Event name" />
        {errors.name && <p className="text-sm text-red-600">Required</p>}
      </div>

      <div>
        <Label>Location</Label>
        <Input {...register("location")} placeholder="Location (optional)" />
      </div>

      <div>
        <Label>Start time (your local timezone)</Label>
        <Input type="datetime-local" {...register("start_time", { required: true })} />
        {errors.start_time && <p className="text-sm text-red-600">Required</p>}
      </div>

      <div>
        <Label>End time (your local timezone)</Label>
        <Input type="datetime-local" {...register("end_time", { required: true })} />
        {errors.end_time && <p className="text-sm text-red-600">Required</p>}
      </div>

      <div>
        <Label>Max capacity</Label>
        <Input type="number" {...register("max_capacity", { required: true, min: 1 })} />
        {errors.max_capacity && <p className="text-sm text-red-600">Must be at least 1</p>}
      </div>

      <div className="pt-3">
        <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create Event"}</Button>
      </div>
    </form>
  );
}
