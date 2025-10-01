"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

type Props = {
  eventId: number;
  onRegistered?: () => void;
};

type FormValues = {
  name: string;
  email: string;
};

export default function RegistrationForm({ eventId, onRegistered }: Props) {
  const API = process.env.NEXT_PUBLIC_API_BASE;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ defaultValues: { name: "", email: "" } });

  async function onSubmit(data: FormValues) {
    const res = await fetch(`${API}/events/${eventId}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.status === 201) {
      toast("Registered successfully");
      if (onRegistered) onRegistered();
      // Optionally refresh the page or attendees list
      return;
    }

    const json = await res.json().catch(() => ({}));
    toast(json.message || res.statusText);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Label>Name</Label>
        <Input {...register("name", { required: true })} placeholder="Your name" />
        {errors.name && <p className="text-sm text-red-600">Required</p>}
      </div>

      <div>
        <Label>Email</Label>
        <Input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="your@example.com" />
        {errors.email && <p className="text-sm text-red-600">A valid email is required</p>}
      </div>

      <div>
        <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>{isSubmitting ? "Registering..." : "Register"}</Button>
      </div>
    </form>
  );
}
