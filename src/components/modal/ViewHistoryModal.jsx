"use client";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintPrescription from "../../pages/checkin/PrintPrescription";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PropTypes from "prop-types";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const ITEMS_PER_PAGE = 5;

const ViewHistoryModal = ({ open, onClose, history, isLoading, patientData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState({});
  const [printData, setPrintData] = useState(null);
  const componentRef = useRef();
  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
  });
  if (!open) return null;

  const totalPages = Math.max(
    1,
    Math.ceil((history?.length || 0) / ITEMS_PER_PAGE),
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHistory =
    history?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];
  const handleCheckin = (id) => {
    if (!history || !patientData) return;
    // Find the matching history record by appointment_id
    const historyRecord = history.find((record) => record.appointment_id === id);
    if (!historyRecord) return;

    // Map history record fields to PrintPrescription expected format
    // PrintPrescription expects:
    //   data[0] = patient info (fname, lname, gender, height, weight, dob)
    //   data.selectedSymptoms, data.familyHistory, data.medicines[], data.labTest, data.advice, data.diet, data.followUpDate
    const printPayload = {
      ...patientData, // Patient info at index 0 (fname, lname, gender, height, weight, dob etc.)
      selectedSymptoms: historyRecord.symptoms || "",
      familyHistory: historyRecord.family_history || "",
      medicines: Array.isArray(historyRecord.medicine_details)
        ? historyRecord.medicine_details.map((med) => ({
            medicineName: med.medicine || med.medicineName || "",
            dose: med.dosage || med.dose || "",
            timeADay: med.timing || med.timeADay || "",
            durationDays: med.days || med.durationDays || "",
            remark: med.remark || "",
          }))
        : [],
      labTest: historyRecord.pathology_test || "",
      advice: historyRecord.advice || "",
      diet: historyRecord.diet || "",
      followUpDate: historyRecord.followup_date || "",
    };
    setPrintData(printPayload);
    // Trigger print on next tick after state update
    setTimeout(() => reactToPrintFn(), 100);
  };
  const toggleExpand = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto top-[60px]">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative md:bottom-0 sm:bottom-[73px] transform overflow-hidden rounded-lg bg-gray-700 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg md:max-w
-6xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <DialogTitle
                  as="h3"
                  className="text-lg text-indigo-700 font-bold mb-4"
                >
                  Patient History
                </DialogTitle>
                <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
                  <p className="text-lg font-medium">
                    Loading history records...
                  </p>
                  <p className="text-sm mt-1">
                    Please wait while we fetch the data.
                  </p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }

  const formatMedicineDetails = (medicines, rowIndex) => {
    if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return <span className="text-gray-400 italic">No medicines</span>;
    }
    const isExpanded = expandedRows[rowIndex];
    const displayMedicines = isExpanded ? medicines : medicines.slice(0, 2);

    return (
      <div>
        {displayMedicines.map((med, medIdx) => (
          <div
            key={medIdx}
            className="text-xs border-b border-dashed border-gray-300 py-1"
          >
            <span className="font-semibold">
              {med.medicine || med.medicineName}
            </span>
            {med.dosage || med.dose ? ` - ${med.dosage || med.dose}` : ""}
            {med.timing || med.timeADay
              ? ` | ${med.timing || med.timeADay}`
              : ""}
            {med.days || med.durationDays
              ? ` | ${med.days || med.durationDays}d`
              : ""}
          </div>
        ))}
        {medicines.length > 2 && (
          <button
            onClick={() => toggleExpand(rowIndex)}
            className="text-blue-600 text-xs mt-1 hover:underline cursor-pointer"
          >
            {isExpanded ? "Show less ▲" : `Show all (${medicines.length}) ▼`}
          </button>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto top-[60px]">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative md:bottom-0 sm:bottom-[73px] transform overflow-hidden rounded-lg bg-gray-700 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg md:max-w-6xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <DialogTitle
                as="h3"
                className="text-lg text-indigo-700 font-bold mb-4"
              >
                Patient History
              </DialogTitle>

              {!history || history.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
                  <p className="text-lg font-medium">
                    No history records found.
                  </p>
                  <p className="text-sm mt-1">
                    This patient has no previous visit records.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-900 text-sm">
                    <thead>
                      <tr className="bg-gray-300 uppercase text-xs">
                        <th className="border border-gray-900 px-2 py-2 w-10">
                          #
                        </th>
                        <th className="border border-gray-900 px-2 py-2">
                          Symptoms
                        </th>
                        <th className="border border-gray-900 px-2 py-2 min-w-[180px]">
                          Medicine Details
                        </th>
                        <th className="border border-gray-900 px-2 py-2">
                          Pathology Test
                        </th>
                        <th className="border border-gray-900 px-2 py-2">
                          Advice
                        </th>
                        <th className="border border-gray-900 px-2 py-2">
                          Diet
                        </th>
                        <th className="border border-gray-900 px-2 py-2">
                          Follow-up
                        </th>
                        <th className="border border-gray-900 px-2 py-2">
                          Allergies
                        </th>
                        <th className="border border-gray-900 px-2 py-2">
                          Notes
                        </th>
                        <th className="border border-gray-900 px-2 py-2">
                          Medical History
                        </th>
                        <th className="border border-gray-900 px-2 py-2">
                          Family History
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedHistory.map((record, idx) => {
                        const globalIdx = startIndex + idx;
                        return (
                          <tr
                            key={globalIdx}
                            className="bg-white hover:bg-blue-50 border border-gray-900"
                          >
                            <td className="border border-gray-900 px-2 py-2 text-center font-bold">
                              {globalIdx + 1}
                            </td>
                            <td className="border border-gray-900 px-2 py-2 max-w-[150px] break-words">
                              {record.symptoms || "N/A"}
                            </td>
                            <td className="border border-gray-900 px-2 py-2">
                              {formatMedicineDetails(
                                record.medicine_details,
                                globalIdx,
                              )}
                            </td>
                            <td className="border border-gray-900 px-2 py-2 max-w-[130px] break-words">
                              {record.pathology_test || "N/A"}
                            </td>
                            <td className="border border-gray-900 px-2 py-2 max-w-[130px] break-words">
                              {record.advice || "N/A"}
                            </td>
                            <td className="border border-gray-900 px-2 py-2 max-w-[120px] break-words">
                              {record.diet || "N/A"}
                            </td>
                            <td className="border border-gray-900 px-2 py-2 whitespace-nowrap">
                              {record.followup_date || "N/A"}
                            </td>
                            <td className="border border-gray-900 px-2 py-2 max-w-[120px] break-words">
                              {record.allergies || "N/A"}
                            </td>
                            <td className="border border-gray-900 px-2 py-2 max-w-[120px] break-words">
                              {record.notes || "N/A"}
                            </td>
                            <td className="border border-gray-900 px-2 py-2 max-w-[130px] break-words">
                              {record.medical_history || "N/A"}
                            </td>
                            <td className="border border-gray-900 px-2 py-2 max-w-[130px] break-words">
                              {record.family_history || "N/A"}
                            </td>
                            <td className="border border-gray-900 px-2 py-2 max-w-[130px] break-words">
                              <div className="print:hidden text-center">
                                <button
                                  onClick={() =>
                                    handleCheckin(record.appointment_id)
                                  }
                                  className="md:px-6 md:py-2 sm:px-2 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 md:m-1 sm:m-1 focus:ring-4 focus:ring-blue-300 font-medium text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                  aria-label="Print prescription"
                                >
                                  Print
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {history && history.length > ITEMS_PER_PAGE && (
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-600">
                    Showing {startIndex + 1}–
                    {Math.min(startIndex + ITEMS_PER_PAGE, history.length)} of{" "}
                    {history.length} records
                  </span>
                  <ul className="flex gap-3 items-center">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={`w-[63px] h-[23px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] ${
                        currentPage < 2
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer hover:bg-slate-400"
                      }`}
                      disabled={currentPage < 2}
                    >
                      <MdOutlineKeyboardDoubleArrowLeft />
                    </button>
                    <span className="text-sm font-semibold text-gray-800 bg-white px-3 py-1 rounded-full">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={`w-[63px] h-[23px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] ${
                        currentPage >= totalPages
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer hover:bg-slate-400"
                      }`}
                      disabled={currentPage >= totalPages}
                    >
                      <MdOutlineKeyboardDoubleArrowRight />
                    </button>
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto cursor-pointer"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
      {
        /* Hidden component for printing */
        printData && (
          <div className="hidden">
            <PrintPrescription ref={componentRef} data={printData} />
          </div>
        )
      }
    </Dialog>
  );
};

export default ViewHistoryModal;

ViewHistoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      clinic_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      patient_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      appointment_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      symptoms: PropTypes.string,
      medicine_details: PropTypes.array,
      pathology_test: PropTypes.string,
      advice: PropTypes.string,
      diet: PropTypes.string,
      followup_date: PropTypes.string,
      allergies: PropTypes.string,
      notes: PropTypes.string,
      medical_history: PropTypes.string,
      family_history: PropTypes.string,
    }),
  ),
};
