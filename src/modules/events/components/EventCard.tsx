"use client";

import { format } from "date-fns";
import { MapPin, Video, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { DriveImage } from "./DriveImage";

export default function EventCard({ event }) {
  return (
    <Card>
      {event.image_url && (
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <DriveImage
            fileId={event.image_url}
            alt={event.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{event.short_description}</p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{format(event.date_time, "PPP 'at' p")}</span>
          </div>
          <div className="flex items-center space-x-2">
            {event.meeting_link ? (
              <>
                <Video className="h-4 w-4" />
                <span>Virtual Event</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" />
                <span>{event.location.name}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
