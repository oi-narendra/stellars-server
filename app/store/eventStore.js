import { create } from "zustand";
import { eventService } from "../services/eventService";

export const useEventStore = create((set, get) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const events = await eventService.getAllEvents();
      set({ events });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getEventById: (id) => {
    return get().events.find(event => event.id === id);
  },
})); 