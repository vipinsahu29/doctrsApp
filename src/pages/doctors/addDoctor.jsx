import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
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
  mobile: Yup.string()
    .matches(
      /^\+(\d{2})\d{10}$|^\d{10}$/,
      "Mobile number must be in the format: +XX1234567890 or 1234567890"
    )
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  age: Yup.string().required("Age is required"),
  qualification: Yup.string().required("Qualification is required"),
  specialization: Yup.string().required("specialization is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  joiningDate: Yup.string()
    .required("Joining Date is required")
    .test(
      "is-future-date",
      "Joining date cannot be in the past",
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
  age: "",
  qualification: "",
  specialization: "",
  gender: "",
  address: "",
  images: null,
};
const AddDoctor = () => {
  // Formik hook to handle form state
  const formik = useFormik({
    initialValues,
    validationSchema,
    // Form submission handler
    onSubmit: (values, { resetForm }) => {
      console.log("Form Data:", values);
      alert("Doctor added!");
      resetForm();
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6 flex-col gap-7">
      <AppointmentRouting pageName="Doctors" />
      <div className="w-full max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">
          Add Doctor
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <p className="text-red-500 text-xs">{formik.errors.lastName}</p>
              ) : null}
            </div>
          </div>

          {/* 2.Email and Mobile Number Field */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              ) : null}
            </div>
          </div>

          {/* 3.Age, Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-white"
              >
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formik.touched.age && formik.errors.age ? (
                <p className="text-red-500 text-xs">{formik.errors.age}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="qualification"
                className="block text-sm font-medium text-white"
              >
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formik.values.qualification}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formik.touched.qualification && formik.errors.qualification ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.qualification}
                </p>
              ) : null}
            </div>
          </div>

          {/* specialization ,Gender,Address,joining Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-white"
              >
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formik.values.specialization}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formik.touched.specialization && formik.errors.specialization ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.specialization}
                </p>
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <p className="text-red-500 text-xs">{formik.errors.gender}</p>
              ) : null}
            </div>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.address && formik.errors.address ? (
              <p className="text-red-500 text-xs">{formik.errors.address}</p>
            ) : null}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="joiningDate"
                className="block text-sm font-medium text-white"
              >
                Joining Date
              </label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={formik.values.joiningDate}
                onChange={formik.handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formik.touched.joiningDate && formik.errors.joiningDate ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.joiningDate}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-white"
            >
              Photo
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={(e) =>
                formik.setFieldValue("images", e.target.files[0])
              }
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
