import { create } from "zustand";
import { persist } from "zustand/middleware";
const Store = create(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      UID: null,
      clinicId: null,

      // Setters
      setUID: (uid) => set({ UID: uid }),
      setClinicId: (clinicId) => set({ clinicId }),
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: 'local-store', // Key in localStorage
      partialize: (state) => ({
        UID: state.UID,
        clinicId: state.clinicId,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
    }
  )
);

export default Store;
