import { create } from "zustand";
import { getGoogleToken } from "../actions/googleAuth";

export const useGoogleAuthStore = create((set, get) => ({
  token: null,
  loading: false,
  error: null,
  expiresAt: null,

  getToken: async (force = false) => {
    const state = get();
    const now = Date.now();
    
    // Return cached token if it's still valid
    if (!force && state.token && state.expiresAt && now < state.expiresAt) {
      return state.token;
    }

    set({ loading: true, error: null });
    try {
      const { token, error } = await getGoogleToken();
      if (error) throw new Error(error);
      
      set({ 
        token,
        expiresAt: now + 60 * 60 * 1000,
        loading: false,
      });
      return token;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  clearToken: () => set({ token: null, expiresAt: null }),
}));
