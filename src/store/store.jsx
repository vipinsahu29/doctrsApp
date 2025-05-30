import { create } from "zustand";
import { persist } from "zustand/middleware";
const initialState = {
  accessToken: null,
  isAuthenticated: false,
  UID: (_uid) => null,
  clinicId: (_clinicId) => null,
};
const Store = create(
  persist((set) => ({
    ...initialState,
    setUID: (_uid) => set({ UID: _uid }),
    setClinicId: (_clinicId) =>
      set({ isAuthenticated: _clinicId }),
  }),
  {
    name: 'local-storage', // localStorage key
    partialize: (state) => ({ UUID: state.UUID }), // optional but safe
  }
)
);

export default Store;
