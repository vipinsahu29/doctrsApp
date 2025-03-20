import React, { useState } from "react";
import Pagination from "../../components/pagination/Paginations";
import { AppointmentData } from "../../Constants/AppointmentData";
import { FaEdit, FaRegEye } from "react-icons/fa";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import AppointmentViewDetailsModal from "../../components/modal/AppointmentViewDetailsModal";
import EditPatientModal from "../../components/modal/EditPatientModal";

const columns = [
  "No.",
  "Full Name",
  "Mobile",
  "Gender",
  "Appointment date",
  "Time",
  "Payment Status",
  "Action",
];

const AppointmentsList = () => {
  const [parPage, setParPage] = useState(10);
  const [viewData, setViewData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [viewDetails, setViewDetails] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newAppointment, setNewAppointment] = useState(false);
  const filteredUsers = searchValue && isNaN(searchValue) 
    ? AppointmentData.filter((user) =>
        user.FirstName.toLowerCase().includes(searchValue.toLowerCase())
      )
    : AppointmentData.filter((user) =>
      user.Mobile.toLowerCase().includes(searchValue.toLowerCase())
    )
  console.log(isNaN(searchValue))
  const handleEditmodal = () => {
    setNewAppointment(false);
    setIsEditOpen(false);
  };
  const handleViewDetails = (id) => {
    setViewDetails(true);
    setViewData(AppointmentData.filter((value) => value.Id === id));
  };
  const handleEditDetails = (id) => {
    setNewAppointment(false);
    setIsEditOpen(true);
    setViewData(AppointmentData.filter((value) => value.Id === id));
  };
  const handleSearch = (e) =>{
    setTimeout(() => {
      setSearchValue(e.target.value)}, 1000)
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6 flex-col gap-7">
      <AppointmentRouting pageName="Appointment" />
      <div className="flex flex-wrap w-full py-2 flex-col gap-7 items-center justify-center">
        <div className="w-full max-w-5xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-center text-white">
            Appointment List
          </h2>
          <input
            className="px-4 py-2 focus:border-[#030331] outline-none bg-[#efeff2] border  border-slate-700 rounded-md text-[#0b0b0b]"
            type="text"
            placeholder="search"
            onChange={(e) => handleSearch(e)}
          />
          <div className="flex justify-center items-center">
            <div className="relative overflow-x-auto min-h-auto pb-5">
              <table className=" border-collapse border border-gray-400 w-full text-sm text-left text-[#d0d2d6]">
                <thead className=" text-sm text-[#d0d2d6] uppercase">
                  <tr>
                    {columns.map((items) => (
                      <th
                        scope="col"
                        className="py-3 px-4 border border-gray-300"
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
                    <tr key={d.Mobile + d.FirstName}>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.FirstName + " " + d.LastName}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.Mobile}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.Gender}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.AppointmentDate}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.Time}
                      </td>
                      <td
                        scope="row"
                        className={`py-1 px-4 font-medium whitespace-nowrap border border-gray-300 ${
                          d.Payment === "Pending"
                            ? " text-red-400"
                            : " text-green-400"
                        }`}
                      >
                        {d.Payment}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <button
                            tabIndex={-1}
                            onClick={() => handleEditDetails(d.Id)}
                            className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 cursor-pointer"
                          >
                            {" "}
                            <FaEdit color="black" />{" "}
                          </button>

                          <button
                            tabIndex={-1}
                            className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
                            onClick={() => handleViewDetails(d.Id)}
                          >
                            {" "}
                            <FaRegEye />{" "}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            {/*isFetching && (
          <h3 className="text-lg text-yellow-50 font-semibold">Loading...</h3>
        )*/}
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={AppointmentData.length}
              parPage={parPage}
              showItem={10}
            />
          </div>
        </div>
      </div>
      {viewDetails && (
        <AppointmentViewDetailsModal
          isOpen={viewDetails}
          onClose={() => setViewDetails(false)}
          data={viewData[0]}
          onNewAppointment={() => setNewAppointment(true)}
        />
      )}
      {(isEditOpen || newAppointment) && (
        <EditPatientModal
          isOpen={isEditOpen || newAppointment}
          patient={viewData[0]}
          onSave={""}
          isNewAppointment={newAppointment}
          onClose={handleEditmodal}
        />
      )}
    </div>
  );
};

export default AppointmentsList;
