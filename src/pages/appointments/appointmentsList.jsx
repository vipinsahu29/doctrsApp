import React, { useState } from "react";
import Pagination from "../../components/pagination/Paginations";
import { AppointmentData } from "../../Constants/AppointmentData";
import { FaEdit, FaTrash, FaCopy } from "react-icons/fa";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
// import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ThemeProvider, Typography } from "@mui/material";
// import Store from "../../store/store"
// import { format } from 'date-fns'; // Import date-fns for date formatting
// import { theme } from "../../utility/theme";

const columns = [
  "No.",
  "Full Name",
  "Mobile",
  "Gender",
  "Appointment date",
  "Time",
  "Action",
];

const AppointmentsList = () => {
  const [parPage, setParPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6 flex-col gap-7">
      <AppointmentRouting pageName="Appointment" />
      <div className="flex flex-wrap w-full py-6 flex-col gap-7 items-center justify-center">
        <div className="w-full max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-center text-white">
            Appointment List
          </h2>
          <div className="flex justify-between items-center">
            <div className="relative overflow-x-auto min-h-auto pb-11">
              <table className="w-full text-sm text-left text-[#d0d2d6]">
                <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                  <tr>
                    {columns.map((items) => (
                      <th scope="col" className="py-3 px-4" key={items}>
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
                  {AppointmentData.map((d, i) => (
                    <tr key={d.Mobile}>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {d.FirstName + " " + d.LastName}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {d.Mobile}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {d.Gender}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {d.AppointmentDate}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {d.Time}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <div
                            tabIndex={-1}
                            className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 cursor-pointer"
                          >
                            {" "}
                            <FaEdit color="black" />{" "}
                          </div>
                          <div className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 cursor-pointer">
                            {" "}
                            <FaCopy color="black" />{" "}
                          </div>
                          <div className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 cursor-pointer">
                            {" "}
                            <FaTrash />{" "}
                          </div>
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
    </div>
  );
};

export default AppointmentsList;
