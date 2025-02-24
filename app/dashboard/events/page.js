"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/app/components/EventCard";

export default function EventsPage() {
  // Temporary mock data - replace with actual data fetching
  const [events] = useState([
    {
      id: 1,
      title: "Tech Conference 2024",
      shortDescription: "Annual technology conference featuring industry leaders",
      imageUrl: "https://picsum.photos/800/400",
      meetingLink: null,
      dateTime: new Date("2024-06-15T09:00:00"),
      location: "San Francisco Convention Center",
      additionalData: {
        capacity: 500,
        ticketPrice: "$299",
      },
    },
    // Add more mock events as needed
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
} 