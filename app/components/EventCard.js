import { format } from "date-fns";
import { MapPin, Video, Calendar } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {event.imageUrl && (
        <div className="mb-4">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {event.title}
      </h3>
      <p className="text-gray-600 mb-4">{event.shortDescription}</p>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Calendar size={16} />
          <span>{format(event.dateTime, "PPP 'at' p")}</span>
        </div>

        <div className="flex items-center space-x-2">
          {event.meetingLink ? (
            <>
              <Video size={16} />
              <span>Virtual Event</span>
            </>
          ) : (
            <>
              <MapPin size={16} />
              <span>{event.location}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
