import { create } from "zustand";
import { persist } from "zustand/middleware";
const initialState = {
  accessToken: null,
  isAuthenticated: false,
  setAccessToken: (_accessToken) => null,
  setIsAuthenticated: (_isAuthenticated) => null,
};
const Store = create(
  persist((set) => ({
    ...initialState,
    setAccessToken: (_accessToken) => set({ accessToken: _accessToken }),
    setIsAuthenticated: (_isAuthenticated) =>
      set({ isAuthenticated: _isAuthenticated }),
  }),
  {
    name: 'auth-storage', // localStorage key
    partialize: (state) => ({ userSession: state.userSession }), // optional but safe
  }
)
);

export default Store;
