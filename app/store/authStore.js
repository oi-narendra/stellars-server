import { create } from "zustand";
import { supabase } from "../services/supabaseService";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user });
      return { success: true };
    } catch (error) {
      set({ error: "Invalid login credentials" });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  checkUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ user });
    return user;
  },
}));
