import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { calculateExperience } from "../../utility/util";

const PrintPrescription = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="p-4 bg-gray-100 text-black print:text-black print:bg-white"
    >
      {/* Printable Area */}
      <div className="mx-auto text-xs  bg-white p-6 border border-gray-300 shadow-md print:shadow-none print:border-none print:p-0">
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
                <strong>Name:</strong>{" "}
                {data[0].fname + " " + data[0].lname}
                Doe
              </div>
              <div>
                <strong>Gender:</strong> {data[0]?.gender}
              </div>
              <div>
                <strong>Height:</strong> {data[0].height}
              </div>
              <div>
                <strong>Weight:</strong> {data[0].weight}
              </div>
              <div>
                <strong>Age:</strong> {calculateExperience(data[0].dob)}
              </div>
              <div>
                <strong>Appointment:</strong> {data[0]?.AppointmentDate}
              </div>
            </div>
            <hr className="border-gray-500 dark:border-neutral-500 my-4" />
            {/* Symptoms */}
            <div className="mb-3">
              <strong>Symptoms/History:</strong>
              <div className="border p-2 mt-1 min-h-[40px]">
                {data?.selectedSymptoms}
              </div>
            </div>

            {/* Family History */}
            <div className="mb-3">
              <strong>Family History:</strong>
              <div className="border p-2 mt-1 min-h-[40px]">
                {data.familyHistory ? data.familyHistory : "N.A."}
              </div>
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
                  {data.medicines.map((items) => (
                    <tr key={items.medicineName}>
                      <td className="border p-1 text-center">
                        {items.medicineName}
                      </td>
                      <td className="border p-1 text-center">{items.dose}</td>
                      <td className="border p-1 text-center">
                        {items.timeADay}
                      </td>
                      <td className="border p-1 text-center">
                        {items.durationDays}
                      </td>
                      <td className="border p-1 text-center">{items.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Advice & Diet */}
            <div className="mb-3">
              <strong>Pathology Test:</strong>
              <div className="border p-2 mt-1 min-h-[40px]">
                {data.labTest ? data.labTest : "Not required."}
              </div>
            </div>
            <div className="mb-3">
              <div className="flex">
                <strong>Advice </strong>{" "}
                <h6 className="text-[8px]">( X-Ray, Sonography, CT-Scan...):</h6>
              </div>
              <div className="border p-2 mt-1 min-h-[40px]">
                {data.advice
                  ? data.advice
                  : "Enjoy the life, Dont think too much, do exersice"}
              </div>
            </div>
            <div className="mb-3">
              <strong>Diet:</strong>
              <div className="border p-2 mt-1 min-h-[40px]">
                {data.diet
                  ? data.diet
                  : " eat healthy, avoid oily food, eat home made food, avoid extra sugar and salt, include more fiber foods "}
              </div>
            </div>

            {/* Follow-up */}
            <div className="text-right mt-4">
              <strong>Follow-up Date:</strong> {data.followUpDate}
            </div>
          </div>
        </div>
        {/*<hr className="border-gray-500 dark:border-neutral-500  mb-[80px] mt-4" />*/}
      </div>
    </div>
  );
});
PrintPrescription.propTypes = {
  data: PropTypes.shape({
    0: PropTypes.shape({
      fname: PropTypes.string,
      lname: PropTypes.string,
      gender: PropTypes.string,
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dob: PropTypes.string,
      AppointmentDate: PropTypes.string,
    }),
    selectedSymptoms: PropTypes.string,
    familyHistory: PropTypes.string,
    medicines: PropTypes.arrayOf(
      PropTypes.shape({
        medicineName: PropTypes.string.isRequired,
        dose: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        timeADay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        durationDays: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        remark: PropTypes.string,
      })
    ),
    labTest: PropTypes.string,
    advice: PropTypes.string,
    diet: PropTypes.string,
    followUpDate: PropTypes.string,
  }).isRequired,
};

export default PrintPrescription;
