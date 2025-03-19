"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const AppointmentViewDetailsModal = ({
  isOpen,
  onClose,
  data,
  onNewAppointment,
}) => {
  const handleBookAppointment = () => {
    onClose(false);
    onNewAppointment(true);
  };
  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto top-[100px]">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative md:bottom-0 sm: bottom-[73px] transform overflow-hidden rounded-lg bg-gray-700 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg md:max-w-5xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <DialogTitle
                as="h3"
                className="text-base font-semibold text-gray-900"
              >
                Patient Details
              </DialogTitle>
              <div className="grid sm: grid-cols-2 md:grid-cols-4 md:gap-4 sm: gap-2 pt-3">
                <div className="flex flex-col">
                  <h2 className="font-bold">Name:</h2>
                  {data.FirstName + " " + data.LastName}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Mobile:</h2>
                  {data.Mobile}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Gender:</h2>
                  {data.Gender}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">AppointmentDate:</h2>
                  {data.AppointmentDate}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Time:</h2>
                  {data.Time}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Email:</h2>
                  {data.Email}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Age:</h2>
                  {data.Age}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Weight:</h2>
                  {data.Weight + "kg"}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Height:</h2>
                  {data.Height}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Doctor:</h2>
                  {data.DoctorName}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold text-red-600">Payment:</h2>
                  {data.Payment}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Blood Group:</h2>
                  {data.BooldGroup}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Close
              </button>
              <button
                type="button"
                data-autofocus
                onClick={handleBookAppointment}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-green-400 sm:mt-0 sm:w-auto"
              >
                Book new appointment
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
export default AppointmentViewDetailsModal;
