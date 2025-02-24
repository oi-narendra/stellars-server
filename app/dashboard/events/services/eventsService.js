import { supabase } from "@/app/core/services/supabase-service";

export const eventsService = {
  getAllEvents: async () => {
    const { data, error } = await supabase.from("events").select("*");
    return data;
  },

  createEvent: async (eventData) => {
    const { data, error } = await supabase.from("events").insert(eventData);
    return data;
  },
};
