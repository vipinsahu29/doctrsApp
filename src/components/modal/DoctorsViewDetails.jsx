"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { calculateExperience } from "../../utility/util";

const DoctorsViewDetails = ({ isOpen, onClose, data, onNewAppointment }) => {
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
                className="text-lg text-indigo-700 font-bold"
              >
                Doctors Details
              </DialogTitle>
              <div className="grid sm: grid-cols-2 md:grid-cols-4 md:gap-4 sm: gap-2 pt-3">
                <div className="flex flex-col">
                  <h2 className="font-bold">Name:</h2>
                  {data.name}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Mobile1:</h2>
                  {data.mobile1}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Mobile2:</h2>
                  {data.mobile2}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">DOB:</h2>
                  {data.dob}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Qualification:</h2>
                  {data.qualification}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">University:</h2>
                  {data.univercity}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Collage:</h2>
                  {data.college}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Specialization:</h2>
                  {data?.specialization}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Email:</h2>
                  {data.email}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Age:</h2>
                  {calculateExperience(data.dob)}
                </div>
                 <div className="flex flex-col">
                  <h2 className="font-bold">Total Exp:</h2>
                  {calculateExperience(data.careerStartDate)}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Gender:</h2>
                  {data.gender}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Shift-1:</h2>
                  <table>
                    <thead>
                      <tr className="bg-gray-300">
                        <th className="border border-gray-600 p-1">Days</th>
                        <th className="border border-gray-600 p-1">
                          Shift Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.shift[0].Days.map((days) => (
                        <tr key={days} className="bg-gray-100">
                          <td className="border border-gray-600 p-1">{days}</td>
                          <td className="border border-gray-600 p-1">
                            {data.shift[0].StartTime} to{" "}
                            {data.shift[0].EndTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Shift-2:</h2>
                  <table>
                    <thead>
                      <tr className="bg-gray-300">
                        <th className="border border-gray-600 p-1">Days</th>
                        <th className="border border-gray-600 p-1">
                          Shift Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.shift[1].Days.map((days) => (
                        <tr key={days} className="bg-gray-100">
                          <td className="border border-gray-600 p-1">{days}</td>
                          <td className="border border-gray-600 p-1">
                            {data.shift[1].StartTime} to{" "}
                            {data.shift[1].EndTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col">
                <h2 className="font-bold">Shift-3:</h2>
                  {data.shift[2].length > 0 ? (
                      <table>
                        <thead>
                          <tr className="bg-gray-300">
                            <th className="border border-gray-600 p-1">Days</th>
                            <th className="border border-gray-600 p-1">
                              Shift Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.shift[2].Days.map((days) => (
                            <tr key={days} className="bg-gray-100">
                              <td className="border border-gray-600 p-1">
                                {days}
                              </td>
                              <td className="border border-gray-600 p-1">
                                {data.shift[2].StartTime} to{" "}
                                {data.shift[2].EndTime}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                  ) : (
                    "N.A."
                  )}
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
export default DoctorsViewDetails;
DoctorsViewDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  data: PropTypes.object,
  onNewAppointment: PropTypes.func,
};
