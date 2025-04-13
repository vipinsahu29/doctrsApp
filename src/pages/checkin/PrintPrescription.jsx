import React, { forwardRef } from "react";
import { calculateExperience } from "../../utility/util";

const PrintPrescription = forwardRef(({ data }, ref) => {
  console.log(data[0]?.Id);
  return (
    <div
      ref={ref}
      className="p-4 bg-gray-100 text-black print:text-black print:bg-white"
    >
      {/* Printable Area */}
      <div className="max-w-[794px] mx-auto text-xs  bg-white p-6 border border-gray-300 shadow-md print:shadow-none print:border-none print:p-0">
        <hr className="border-t border-gray-500 dark:border-neutral-500 mt-[160px] mb-4 w-full" />
        <div className="flex">
          <div>
            <div className="w-px h-[842px] bg-gray-500 dark:bg-neutral-500 mr-4 ml-36"></div>
          </div>
          <div>
            {/* Header */}
            <div className="grid grid-cols-2 gap-x-24 gap-y-2 mb-2 text-xs">
              <div>
                <strong>Patient-ID:</strong>123
              </div>
              <div>
                <strong>OPD-ID:</strong>232
              </div>
              <div>
                <strong>Name:</strong> {data[0].FirstName + ' ' + data[0].LastName}
                Doe
              </div>
              <div>
                <strong>Gender:</strong> {data[0].Gender}
              </div>
              <div>
                <strong>Height:</strong> {data[0].Height}
              </div>
              <div>
                <strong>Weight:</strong> {data[0].Weight}
              </div>
              <div>
                <strong>Age:</strong> {calculateExperience(data[0].Dob)}
              </div>
              <div>
                <strong>Appointment:</strong> {data[0].AppointmentDate}
              </div>
            </div>
            <hr className="border-gray-500 dark:border-neutral-500 my-4" />
            {/* Symptoms */}
            <div className="mb-3">
              <strong>Symptoms/History:</strong>
              <div className="border p-2 mt-1 min-h-[40px]">
                Selected symptoms will appear here...
              </div>
            </div>

            {/* Family History */}
            <div className="mb-3">
              <strong>Family History:</strong>
              <div className="border p-2 mt-1 min-h-[40px]">NA</div>
            </div>

            {/* Medicines */}
            <div className="mt-4 mb-3">
              <strong>Prescription:</strong>
              <table className="w-full border mt-2">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-1">Medicine Name</th>
                    <th className="border p-1">Dose (ML/MG)</th>
                    <th className="border p-1">Times/Day</th>
                    <th className="border p-1">Duration (Days)</th>
                    <th className="border p-1">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-1 text-center">paracitamol</td>
                    <td className="border p-1 text-center">500mg</td>
                    <td className="border p-1 text-center">1-0-1</td>
                    <td className="border p-1 text-center">5</td>
                    <td className="border p-1 text-center">AF</td>
                  </tr>
                  <tr>
                    <td className="border p-1 text-center">
                      paracitamol paracitamol paracitamol paracitamol
                      paracitamol
                    </td>
                    <td className="border p-1 text-center">500mg</td>
                    <td className="border p-1 text-center">1-0-1</td>
                    <td className="border p-1 text-center">5</td>
                    <td className="border p-1 text-center">AF</td>
                  </tr>
                  <tr>
                    <td className="border p-1 text-center">paracitamol</td>
                    <td className="border p-1 text-center">500mg</td>
                    <td className="border p-1 text-center">1-0-1</td>
                    <td className="border p-1 text-center">5</td>
                    <td className="border p-1 text-center">AF</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Advice & Diet */}
            <div className="mb-3">
              <strong>Advice:</strong>
              <div className="border p-2 mt-1 min-h-[40px]">
                dont go outside
              </div>
            </div>
            <div className="mb-3">
              <strong>Diet:</strong>
              <div className="border p-2 mt-1 min-h-[40px]">
                dont eat anything
              </div>
            </div>

            {/* Follow-up */}
            <div className="text-right mt-4">
              <strong>Follow-up Date:</strong> 19-04-2025
            </div>
          </div>
        </div>
        {/*<hr className="border-gray-500 dark:border-neutral-500  mb-[80px] mt-4" />*/}
      </div>
    </div>
  );
});

export default PrintPrescription;
