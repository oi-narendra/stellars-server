export interface Event {
  id: number;
  title: string;
  short_description: string;
  long_description?: string;
  image_url?: string;
  date_time: Date;
  meeting_link?: string | null;
  location: {
    name: string;
    latitude?: number;
    longitude?: number;
  };
}

export interface CreateEventData extends Omit<Event, 'id'> {} 