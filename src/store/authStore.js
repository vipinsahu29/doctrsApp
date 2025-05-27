import { create } from 'zustand';
import { supabase } from '../supabaseClient';



 const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
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
}));

export default useAuthStore;    