import React, { useState } from "react";
import { FaEdit, FaRegEye } from "react-icons/fa";
import Pagination from "../../components/pagination/Paginations";

import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import { doctorsData } from "../../Constants/doctorsListData";
import { calculateExperience } from "../../utility/util";
import DoctorsViewDetails from "../../components/modal/DoctorsViewDetails";
import EditDoctorsModal from "../../components/modal/EditDoctorsModal";

const columns = [
  "No.",
  "Name",
  "Specialization",
  "Total Exp",
  "Qualification",
  "Timing-1",
  "Timing-2",
  "Timing-3",
  "Action",
];
const DoctrsList = () => {
  const [parPage, setParPage] = useState(10);
  const [viewData, setViewData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [viewDetails, setViewDetails] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredUsers =
    searchValue && isNaN(searchValue)
      ? doctorsData.filter((user) =>
          user.FirstName.toLowerCase().includes(searchValue.toLowerCase())
        )
      : doctorsData.filter((user) =>
          user.Mobile.toLowerCase().includes(searchValue.toLowerCase())
        );
  console.log(isNaN(searchValue));
  const handleEditmodal = () => {
    setIsEditOpen(false);
  };
  const handleViewDetails = (id) => {
    console.log("view-",id)
    setViewDetails(true);
    setViewData(doctorsData.filter((value) => value.Id === id));
  };
  const handleCloseView = ()=>{
    setViewDetails(false)
    setIsEditOpen(false)
    setViewData("")
  }
  const handleEditDetails = (id) => {
    setIsEditOpen(true);
    setViewData(doctorsData.filter((value) => value.Id === id));
  };
  const handleSearch = (e) => {
    setTimeout(() => {
      setSearchValue(e.target.value);
    }, 1000);
  };
  return (
    <div className="min-h-screen flex items-center bg-white flex-col gap-7 mt-7">
      <AppointmentRouting pageName="Doctors" />
      <div className="flex flex-wrap w-full py-2 flex-col gap-7 items-center justify-center">
        <div className="w-full max-w-5xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-center text-white">
            Doctors List
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
                <thead className=" text-sm 1 uppercase">
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
                        {d.Specialization}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {calculateExperience(d.CareerStartDate)}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.Qualification}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                      >
                        {d.Shifts[0].StartTime + " - " + d.Shifts[0].EndTime}
                      </td>
                      <td
                        scope="row"
                        className={
                          "py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                        }
                      >
                        {d.Shifts[1].Days.length > 0
                          ? d.Shifts[1].StartTime + " - " + d.Shifts[1].EndTime
                          : "N.A."}
                      </td>
                      <td
                        scope="row"
                        className={
                          "py-1 px-4 font-medium whitespace-nowrap border border-gray-300"
                        }
                      >
                        {d.Shifts[2].Days.length > 0
                          ? d.Shifts[2].StartTime + " - " + d.Shifts[2].EndTime
                          : "N.A."}
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
              totalItem={doctorsData.length}
              parPage={parPage}
              showItem={10}
            />
          </div>
        </div>
      </div>
      {viewDetails && (
        <DoctorsViewDetails
          isOpen={viewDetails}
          onClose={handleCloseView}
          data={viewData[0]}
          onNewAppointment={() => {}}
        />
      )}
      {(isEditOpen) && (
        <EditDoctorsModal
          isOpen={isEditOpen}
          doctor={viewData[0]}
          onSave={""}
          onClose={handleEditmodal}
        />
      )}
    </div>
  );
};

export default DoctrsList;
