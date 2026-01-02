import React, { useEffect, useRef, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import { useLocation } from "react-router-dom";
import {
  fetchAppointmentDataByDate,
  createAppt,
  fetchFilteredPatientData,
} from "../../SupaBase/AppointmentAPI";
import Store from "../../store/store";
import { generateTimeSlotsV2 } from "../../utility/util";
import { fetchDocters } from "../../SupaBase/DoctorsApi";
// Validation schema for the form
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .matches(/^[A-Za-z]+$/, "First Name should contain only alphabets")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .matches(/^[A-Za-z]+$/, "Last Name should contain only alphabets")
    .required("Last Name is required"),
  // mobile: Yup.string()
  //   .matches(
  //     /^\d{10}$/,
  //     "Mobile number must be in the format: +XX1234567890 or 1234567890"
  //   )
  //   .required("Mobile number is required"),
  dob: Yup.string().required("DOB is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  appointmentTime: Yup.string().required("Appointment Time is required"),
  appointmentDate: Yup.string()
    .required("Appointment Date is required")
    .test(
      "is-future-date",
      "Appointment date cannot be in the past",
      (value) => {
        const today = new Date();
        const selectedDate = new Date(value);
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }
    ),
});

// Initial values for the form
const initialValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  dob: "",
  height: "",
  weight: "",
  gender: "",
  address: "",
  appointmentDate: "",
  appointmentTime: "",
  doctor: "",
  images: null,
};
const BookAppointment = () => {
  // Formik hook to handle form state
  const clinic_id = Store.getState().clinicId;
  const [searchValue, setSearchValue] = React.useState("");
  const [PaymentMode, setPaymentMode] = React.useState("pending");
  const [selectDoctor, setSelectDoctor] = React.useState("");
  const [doctorsList, setDoctorsList] = React.useState([]);
  const [fee, setFee] = React.useState(0);
  const [time, setTime] = React.useState([]);
  // React.useState({startTime1: "00:00", endTime1: "00:00", startTime2: "00:00", endTime2: "00:00", startTime3: "00:00", endTime3: "00:00"})
  const [patientId, setPatientId] = React.useState(null);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const [error, setError] = React.useState(null);
  const inputRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];
  const location = useLocation();
  const apoointmentData = useMemo(() => location.state || {}, [location.state]);
  const [patientData, setPatientData] = React.useState(
    [apoointmentData].length > 0 ? [apoointmentData] : []
  );
  const [appointmentListData, setAppointmentListData] = React.useState([]);
  const formik = useFormik({
    initialValues,
    validationSchema,
    // Form submission handler
    onSubmit: async (values, { resetForm }) => {
      const result = await bookAppointmentPostData();
      if (result.success) {
        resetForm();
        alert("Appointment submitted successfully!");
      } else {
        alert("Error: " + result.error);
        setError(null);
      }
    },
  });

  const getAppointmentListByDate = React.useCallback(
    async (clinicId) => {
      try {
        const data = await fetchAppointmentDataByDate(
          clinicId,
          1,
          50,
          formik.values.appointmentDate
        );
        if (!data || data.length === 0) {
          setError(
            "No data found for the your clinic. Please ensure that there are appointments available. Or try to logout and login again."
          );
        }
        if (data || data.length > 0) {
          setError("");
        }
        setAppointmentListData(data || []);
      } catch (error) {
        setError("An error occurred while fetching appointments.");
        console.error(error);
      }
    },
    [formik.values.appointmentDate]
  );

  const bookedAppointmentTime = useMemo(() => {
    if (!selectDoctor) return null;
    return appointmentListData
      ?.filter((appt) => appt.drname === selectDoctor)
      .map((appt) => appt?.appointment_time.split(":").slice(0, 2).join(":"));
  }, [appointmentListData, selectDoctor]);
  useEffect(() => {
    if (formik.values.appointmentDate) {
      getAppointmentListByDate(clinic_id);
    }
  }, [formik.values.appointmentDate, clinic_id, getAppointmentListByDate]);
  const bookAppointmentPostData = async () => {
    try {
      const { data } = await createAppt({
        clinic_id: clinic_id,
        patient_id: patientId,
        appointment_date: formik.values.appointmentDate,
        appointment_time: formik.values.appointmentTime,
        payment_mode: PaymentMode,
        fees: fee || 0,
        dr_name: selectDoctor,
        height: formik.values.height || 0,
        weight: formik.values.weight || 0,
      });
      if (data) {
        setPaymentMode("pending");
        setFee(0);
        setSelectDoctor("");
        return { success: true };
      } else {
        setError(error?.message || "Error creating appointment");
        return {
          success: false,
          error: error?.message || "Error creating appointment",
        };
      }
    } catch (err) {
      console.error("Error creating appointment:", err);
      setError(err?.message || "Error creating appointment");
      return {
        success: false,
        error: err?.message || "Error creating appointment",
      };
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const getFilteredData = async (searchValue) => {
      if (!searchValue || searchValue.length <= 2) {
        setPatientData([]);
        setHighlightedIndex(-1);
        return;
      }
      if (searchValue.length > 2) {
        const isMobile = searchValue.match(/^\d{10}$/);
        const { data, error } = await fetchFilteredPatientData(
          clinic_id,
          isMobile ? null : searchValue,
          isMobile ? Number(searchValue) : null
        );
        if (error) {
          console.error("Error fetching filtered data:", error);
        }
        if (data && data.length > 0) {
          setPatientData(data);
        }
        if (!data || data.length === 0) {
          setPatientData([]);
        }
      }
    };
    getFilteredData(searchValue);
  }, [searchValue, clinic_id]);
  useEffect(() => {
    const getDoctors = async () => {
      const { data } = await fetchDocters(clinic_id);
      setDoctorsList(data); //(data.map((doc)=> doc.name))
      Store.getState().setDoctorsNameList(data.map((doc) => doc.name));
    };
    getDoctors();
  }, [clinic_id]);

  useEffect(() => {
    if (selectDoctor) {
      const timeSlots =
        doctorsList
          ?.find((doc) => doc.name === selectDoctor)
          ?.shift?.map((item) => ({
            startTime: item.StartTime,
            endTime: item.EndTime,
          })) || [];
      setTime(timeSlots);
    }
  }, [selectDoctor, doctorsList]);

  useEffect(() => {
    if (apoointmentData && Object.keys(apoointmentData).length > 0) {
      setPatientData([apoointmentData]);
    }
  }, [apoointmentData]);
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Move selection down
      setHighlightedIndex((prevIndex) =>
        prevIndex < patientData.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      // Move selection up
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : patientData.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (highlightedIndex >= 0 && patientData.length > 0) {
        handleSelecedSearch(patientData[highlightedIndex]);
      }
      // setSearchValue(e.target.value);
      // if (highlightedIndex >= 0 && patientData.length > 0) {
      //   addSymptom(patientData[highlightedIndex]);
      // }
    }
  };
  const handleSelecedSearch = (item) => {
    formik.setFieldValue("firstName", item.fname);
    formik.setFieldValue("lastName", item.lname);
    formik.setFieldValue("mobile", item.mobile);
    formik.setFieldValue("email", item.email);
    formik.setFieldValue("dob", item.dob);
    formik.setFieldValue("gender", item.gender);

    formik.setFieldValue(
      "address",
      item.address.city +
        ", " +
        item.address.state +
        ", " +
        item.address.country
    );
    setPatientId(item?.patient_id);
    setSearchValue("");
    setPatientData([]);
    setSelectDoctor("");
    setHighlightedIndex(-1);
    inputRef.current?.focus(); // Keep focus on the input field
  };
  return (
    <div className="min-h-screen flex items-center justify-cente py-6 flex-col gap-1 bg-gray-400">
      <AppointmentRouting pageName="Appointment" />
      <div className="w-full max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-yellow-400">
          Appointment Form
        </h2>
        <input
          className="px-4 mx-1 py-2 focus:border-[#030331] outline-none bg-[#efeff2] border  border-slate-700 rounded-md text-[#0b0b0b]"
          type="text"
          value={searchValue}
          placeholder="search by name/mobile"
          onChange={(e) => handleSearch(e)}
          onKeyDown={handleKeyDown} // Handle Enter key
          autoFocus
        />
        {patientData.length > 0 && (
          <ul className="border p-2 bg-white shadow mt-1 h-[200px] overflow-auto">
            {patientData.map((items, index) => (
              <button
                key={items.patient_id}
                className={`cursor-pointer p-1 flex w-full ${
                  highlightedIndex === index
                    ? "bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
                tabIndex={0}
                onClick={() => handleSelecedSearch(items)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSelecedSearch(items)
                }
              >
                {items.fname + " " + items.lname + " - " + items.mobile}
              </button>
            ))}
          </ul>
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. FirstName and LastName Field  */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-white font-medium"
                disabled
              />
              {/* Showing Error If User touched Field and not filled*/}
              {formik.touched.firstName && formik.errors.firstName ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.firstName}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-white font-medium"
                disabled
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <p className="text-red-500 text-xs">{formik.errors.lastName}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-white"
              >
                Mobile
              </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                maxLength="10"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-white font-medium"
                disabled
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <p className="text-red-500 text-xs">{formik.errors.mobile}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-white font-medium"
                disabled
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              ) : null}
            </div>
            <div>
              <label className="mb-1 text-white" htmlFor="dob">
                Date of birth:
              </label>
              <input
                type="date"
                name="dob"
                value={formik.values.dob}
                max={today} // Prevent past dates
                placeholder="mm-dd--yyyy"
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-white font-medium"
                disabled
              />

              {formik.touched.dob && formik.errors.dob ? (
                <p className="text-red-500 text-xs">{formik.errors.dob}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-white"
              >
                Height
              </label>
              <input
                type="text"
                id="height"
                name="height"
                value={formik.values.height}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formik.touched.height && formik.errors.height ? (
                <p className="text-red-500 text-xs">{formik.errors.height}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-white"
              >
                Weight
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formik.values.weight}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formik.touched.weight && formik.errors.weight ? (
                <p className="text-red-500 text-xs">{formik.errors.weight}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-white"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md font-medium"
                disabled
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <p className="text-red-500 text-xs">{formik.errors.gender}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-white"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-white font-medium "
                disabled
              />
              {formik.touched.address && formik.errors.address ? (
                <p className="text-red-500 text-xs">{formik.errors.address}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="doctor"
                className="block text-sm font-medium text-white"
              >
                Doctor
              </label>
              <select
                name="doctor"
                id="doctor"
                value={selectDoctor}
                onChange={(e) => {
                  setSelectDoctor(e.target.value);
                }}
                className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="select_option">Select Option</option>
                {doctorsList.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="appointmentDate"
                className="block text-sm font-medium text-white"
              >
                Appointment Date
              </label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                min={today} // Prevent past dates
                value={formik.values.appointmentDate}
                onChange={formik.handleChange}
                className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-md"
              />
              {formik.touched.appointmentDate &&
              formik.errors.appointmentDate ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.appointmentDate}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="appointmentTime"
                className="block text-sm font-medium text-white"
              >
                Appointment Time
              </label>
              <select
                name="appointmentTime"
                id="appointmentTime"
                value={formik.values.appointmentTime}
                onChange={formik.handleChange}
                className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-md"
                disabled={!selectDoctor}
              >
                <option value="">Select Time</option>
                {generateTimeSlotsV2(time).map((time) => (
                  <option
                    key={time}
                    value={time}
                    className={`${
                      time.includes("Shift")
                        ? "font-bold bg-yellow-200 cursor-not-allowed"
                        : ""
                    } ${
                      bookedAppointmentTime?.includes(time)
                        ? "bg-red-400 text-white cursor-not-allowed"
                        : !time.includes("Shift") &&
                          "bg-green-200 cursor-pointer"
                    }`}
                    disabled={
                      time.includes("Shift") ||
                      time === "00:00" ||
                      bookedAppointmentTime?.includes(time)
                    }
                  >
                    {time}
                  </option>
                ))}
              </select>
              {!selectDoctor && (
                <option className="text-red-500">
                  Select Doctor to see time slots
                </option>
              )}
              {formik.touched.appointmentTime &&
              formik.errors.appointmentTime ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.appointmentTime}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 pl-1 text-red-600 font-bold bg-yellow-300 w-[150px]"
                htmlFor="payment_mode"
              >
                Payment Method:
              </label>
              <select
                name="payment_mode"
                id="payment_mode"
                value={PaymentMode}
                onChange={(e) => {
                  setPaymentMode(e.target.value);
                }}
                className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="select_option">Select Option</option>
                <option value="Pending">Pending</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="No Fee">No Fee</option>
                <option value="Cancel">Cancel</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="fee"
                className="mb-1 pl-1 text-red-600 font-bold bg-yellow-300 w-[80px]"
              >
                Total Fee:
              </label>
              <input
                type="number"
                id="fee"
                value={fee < 0 ? 0 : fee}
                className="mt-1 block w-[200px] px-3 py-2 border border-gray-300 rounded-md"
                required
                onChange={(e) =>
                  setFee(e.target.value < 0 ? 0 : e.target.value)
                }
                min="0"
              />
            </div>
          </div>

          {/* Submit Button handle*/}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 mt-10 font-semibold bg-yellow-300 text-gray-900 rounded-md hover:bg-yellow-600 hover:text-gray-50 hover:font-bold border-2 border-gray-200"
              // disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
