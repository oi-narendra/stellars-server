import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
  EventCard,
  CreateEventDrawer,
  useEvents,
} from '@/modules/events';

export default function EventsPage() {
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <Button onClick={() => setCreateDrawerOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>

      <CreateEventDrawer
        open={createDrawerOpen}
        onOpenChange={setCreateDrawerOpen}
      />

      {events.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No events found. Create your first event!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
} 