import { supabase } from "../lib/supabase";

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
};
