import { create } from "zustand";
import { supabase } from "../supabaseClient";
import { persist } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: false,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),

      login: async (email, password) => {
        await supabase.auth.signOut();
        set({ loading: true, user: null, session: null });
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Login error:", error.message);
          set({ loading: false });
          return { error };
        }

        set({
          user: data.user,
          session: data.session,
          loading: false,
        });

        return { data };
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
      },

      fetchSession: async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        set({
          user: session?.user || null,
          session: session || null,
        });
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({ user: state.user, session: state.session }), // optional but safe
    }
  )
);

export default useAuthStore;
