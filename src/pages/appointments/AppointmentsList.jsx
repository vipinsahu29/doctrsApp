import React, { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Paginations";
import { FaEdit, FaRegEye, FaHistory } from "react-icons/fa";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import AppointmentViewDetailsModal from "../../components/modal/AppointmentViewDetailsModal";
import EditPatientModal from "../../components/modal/EditPatientModal";
import { useNavigate } from "react-router-dom";
import Store from "../../store/store";
import { getPatientDetails } from "../../SupaBase/PatientAPI";
import { fetchJoinedAppointmentData } from "../../SupaBase/AppointmentAPI";
import PropTypes from "prop-types";
const appointmentColumns = [
  "No.",
  "Full Name",
  "Mobile",
  "Gender",
  "Appointment date",
  "Time",
  "Payment Status",
  "Action",
];

const patientsColumns = [
  "No.",
  "Full Name",
  "Mobile",
  "Gender",
  "Last Visit",
  "Blood Group",
  "Action",
];

const AppointmentsList = ({ source = "" }) => {
  const clinic_id = Store((state) => state.clinicId);
  const [viewData, setViewData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [viewDetails, setViewDetails] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newAppointment, setNewAppointment] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [patientData, setPatientData] = useState([]);
  const isPatient = source === "Patients";
  const filteredColums = isPatient ? patientsColumns : appointmentColumns;
  const [serialNumber, setSerialNumber] = useState(1);
  const getAppointmentList = React.useCallback(async (clinicId, pageNumber) => {
    try {
      const data = await fetchJoinedAppointmentData(clinicId, pageNumber);
      if (!data || data.length === 0) {
        setErrorMessage(
          "No data found for the your clinic. Please ensure that there are appointments available. Or try to logout and login again."
        );
      }
      setPatientData(data);
    } catch (error) {
      setErrorMessage("An error occurred while fetching appointments.");
      console.error(error);
    }
  }, []);

  const getPatientsDetails = React.useCallback(async (clinicId) => {
    await getPatientDetails(clinicId).then((data) => {
      if (!data || data.length === 0) {
        setErrorMessage(
          "No data found for the your clinic. Please ensure that there are patients available. Or try to logout and login again."
        );
      }
      setPatientData(data || []);
    });
  }, []);

  useEffect(() => {
    if (!isPatient && currentPage) {
      setSerialNumber(currentPage);
      getAppointmentList(clinic_id, currentPage);
    } else if (isPatient) {
      getPatientsDetails(clinic_id);
    }
  }, [source, clinic_id, getAppointmentList, getPatientsDetails, currentPage, isPatient]);

  const filteredUsers = patientData ?? [];
  const totalPages =
    filteredUsers && filteredUsers.length > 0 && filteredUsers[0].total_pages
      ? filteredUsers[0].total_pages
      : 1;

  const navigate = useNavigate();
  const handleEditmodal = () => {
    setNewAppointment(false);
    setIsEditOpen(false);
  };
  const handleViewDetails = (patientId, appointmentId) => {
    console.log("patientId:", patientId, "appointmentId:", appointmentId, 'filteredUsers-', filteredUsers);
    setViewDetails(true);
    setViewData(
      filteredUsers.filter(
        (value) =>
          value.patient_id === patientId &&
          value.appointment_id === appointmentId
      )
    );
  };
  const handleEditDetails = (patientId, appointmentId) => {
    setNewAppointment(false);
    setIsEditOpen(true);

    setViewData(filteredUsers.filter((value) =>value.patient_id === patientId &&
          value.appointment_id === appointmentId));
  };
  const handleSearch = (e) => {
    setTimeout(() => {
      setSearchValue(e.target.value);
    }, 1000);
  };
  const handleCheckinClick = (id) => {
    const checkinData = filteredUsers.filter(
      (value) => value.patient_id === id
    );
    navigate("/checkin", { state: checkinData });
  };
  const heading = isPatient ? "Patients List" : "Appointment List";
  const pageName = isPatient ? "Patients" : "Appointment";
  return (
    <div className="min-h-screen flex md:items-center bg-gray-400 flex-col gap-1 ">
      <AppointmentRouting pageName={pageName} />
      <div className="flex flex-wrap w-auto flex-col gap-7 items-center ">
        <div className="w-full md:max-w-5xl  bg-slate-700 p-6 rounded-lg shadow-lg space-y-6 mx-4">
          <h2 className="text-2xl font-semibold text-center text-yellow-400">
            {heading}
          </h2>
          <div className="flex justify-between items-center md:flex-row sm: flex-col">
            <input
              className="px-4 mx-3 py-2 focus:border-[#030331] outline-none bg-[#efeff2] border  border-slate-700 rounded-md text-[#0b0b0b]"
              type="text"
              placeholder="search"
              onChange={(e) => handleSearch(e)}
            />
            <div className="w-full flex md:justify-end sm: justify-center mt-4 bottom-4 right-4">
              {/*isFetching && (
          <h3 className="text-lg text-yellow-50 font-semibold">Loading...</h3>
        )*/}
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                total_page={totalPages}
              />
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-600 text-center bg-yellow-200 ">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-center items-center">
            <div className="overflow-x-auto min-h-auto pb-5">
              <table className="w-full mt-4 border-collapse border border-gray-900 p-2">
                <thead className=" uppercase">
                  <tr className="bg-gray-200">
                    {filteredColums.map((items) => (
                      <th
                        scope="col"
                        className="py-3 px-4 border border-gray-900"
                        key={items}
                      >
                        {items}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/*isLoadingProducts && (
              <tr>
                <td>Loading...</td>
              </tr>
            )*/}
                  {/*productDataError ? (
              <tr>
                <td>No response from server..</td>
              </tr>
            ) : (*/}
                  {filteredUsers.map((d, i) => (
                    <tr
                      key={isPatient ? d.patient_id : d.appointment_id}
                      className="text-center bg-gray-100 border border-gray-900"
                    >
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-900"
                      >
                        {20 * (serialNumber - 1) + (i + 1)}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-900"
                      >
                        {d.fname + " " + d.lname}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-900"
                      >
                        {d.mobile}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-900"
                      >
                        {d.gender}
                      </td>
                      {!isPatient && (
                        <>
                          <td
                            scope="row"
                            className="py-1 px-4 font-medium whitespace-nowrap border border-gray-900"
                          >
                            {d?.appointment_date}
                          </td>
                          <td
                            scope="row"
                            className="py-1 px-4 font-medium whitespace-nowrap border border-gray-900"
                          >
                            {d.appointment_time}
                          </td>
                          <td
                            scope="row"
                            className={`py-1 px-4 font-medium whitespace-nowrap border border-gray-900 ${
                              d.payment_mode === "Pending" || !d.payment_mode
                                ? " text-red-600 font-semibold"
                                : " text-green-700"
                            }`}
                          >
                            {d.payment_mode ? d.payment_mode : "N/A"}
                          </td>
                        </>
                      )}

                      {isPatient && (
                        <>
                          <td
                            scope="row"
                            className="py-1 px-4 font-medium whitespace-nowrap border border-gray-900"
                          >
                            {d?.last_visit_date || "N/A"}
                          </td>
                          <td
                            scope="row"
                            className="py-1 px-4 font-medium whitespace-nowrap border border-gray-900"
                          >
                            {d?.blood_group || "N/A"}
                          </td>
                        </>
                      )}
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-900"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <button
                            title="Edit"
                            tabIndex={-1}
                            onClick={() => handleEditDetails(d.patient_id, d.appointment_id)}
                            className="p-[6px] bg-yellow-300 rounded hover:shadow-lg hover:shadow-orange-500/50 cursor-pointer"
                          >
                            {" "}
                            <FaEdit color="black" />{" "}
                          </button>

                          <button
                            title="View"
                            tabIndex={-1}
                            className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
                            onClick={() =>
                              handleViewDetails(d.patient_id, d.appointment_id)
                            }
                          >
                            {" "}
                            <FaRegEye />{" "}
                          </button>
                          {isPatient && (
                            <button
                              title="History"
                              tabIndex={-1}
                              className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer"
                              onClick={() => ""}
                            >
                              {" "}
                              <FaHistory />{" "}
                            </button>
                          )}
                          {!isPatient && (
                            <button
                              tabIndex={-1}
                              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-small rounded-lg text-sm px-3 py-1 text-center me-1 mb-1 border-2 border-gray-900"
                              onClick={() => handleCheckinClick(d?.patient_id)}
                            >
                              {" "}
                              Check-in
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {viewDetails && (
        <AppointmentViewDetailsModal
          isOpen={viewDetails}
          onClose={() => setViewDetails(false)}
          data={viewData[0]}
          isPatient={isPatient}
          onNewAppointment={() => setNewAppointment(true)}
        />
      )}
      {(isEditOpen || newAppointment) && (
        <EditPatientModal
          isOpen={isEditOpen || newAppointment}
          patient={viewData[0]}
          isNewAppointment={newAppointment}
          onClose={handleEditmodal}
          isPatient={isPatient}
        />
      )}
    </div>
  );
};
export default AppointmentsList;
AppointmentsList.propTypes = {
  source: PropTypes.string.isRequired,
};
