import { supabase } from "@/app/services/supabaseService";

export const eventService = {
  /**
   * @returns {Promise<Array<Event>>}
   */
  async getAllEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date_time", { ascending: true });

    if (error) throw error;

    return data.map((event) => ({
      ...event,
      date_time: new Date(event.date_time),
    }));
  },

  /**
   * @param {number} id
   * @returns {Promise<Event>}
   */
  async getEventById(id) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return {
      ...data,
      date_time: new Date(data.date_time),
    };
  },

  async createEvent(eventData) {
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          ...eventData,
          date_time: eventData.date_time.toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      date_time: new Date(data.date_time),
    };
  },
};
