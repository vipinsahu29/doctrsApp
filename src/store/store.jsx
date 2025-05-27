import { create } from "zustand";

const Store = create((set) => ({
  appointmentsList: [], // Store for appointments
  addAppointment: (appointment) =>
    set((state) => {
      const newAppointment = {
        ...appointment,
        id: state.appointmentsList.length,
      }; // Using length of the list as the id
      return { appointmentsList: [...state.appointmentsList, newAppointment] };
    }),
  // Inside your Zustand store
  removeAppointment: (id) => {
    set((state) => ({
      appointmentsList: state.appointmentsList.filter(
        (appointment) => appointment.id !== id
      ),
    }));
  },
  // Inside your Zustand store
  updateAppointment: (updatedAppointment) => {
    set((state) => ({
      appointmentsList: state.appointmentsList.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment
      ),
    }));
  },
}));

export default Store;
