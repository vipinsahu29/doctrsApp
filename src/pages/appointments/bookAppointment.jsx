import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const BookAppointment = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'First Name must be at least 2 characters')
      .matches(/^[A-Za-z]+$/, 'First Name should contain only alphabets')
      .required('First Name is required'),
    lastName: Yup.string()
      .min(2, 'Last Name must be at least 2 characters')
      .matches(/^[A-Za-z]+$/, 'Last Name should contain only alphabets')
      .required('Last Name is required'),
    mobile: Yup.string()
      .matches(/^\+(\d{2})\d{10}$|^\d{10}$/, 'Mobile number must be in the format: +XX1234567890 or 1234567890')
      .required('Mobile number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    age : Yup.string().required('Age is required'),
    height : Yup.string().required('Height is required'),
    weight : Yup.string().required('Weight is required'),
    gender : Yup.string().required("Gender is required"),
    address: Yup.string().required('Address is required'),
    appointmentDate: Yup.string().required('Appointment Date is required')
      .required('Appointment date is required')
      .test('is-future-date', 'Appointment date cannot be in the past', (value) => {
        const today = new Date();
        const selectedDate = new Date(value);
        selectedDate.setHours(0, 0, 0, 0);  // Ensure no time is included for comparison
        today.setHours(0, 0, 0, 0);  // Set today’s date to have no time
        return selectedDate >= today
      }),
    doctor: Yup.string().required('Consulting Doctor is required'),
    treatment: Yup.string().required('Treatment is required'),
    notes: Yup.string().required('Notes are required'),
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-6">
      <div className="w-full max-w-3xl bg-slate-700 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-white">Appointment Form</h2>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            age: '',
            height: '',
            weight: '',
            gender: '',
            address: '',
            appointmentDate: '',
            appointmentTime: '',
            doctor: '',
            images: null
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Form Data:', values) // You can replace this with the logic to save or send the data
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              {/* Patient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white">First Name</label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="firstName" component="p" className="text-red-500 text-xs" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white">Last Name</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="lastName" component="p" className="text-red-500 text-xs" />
                </div>
              </div>

              {/* Other form fields like mobile, email, etc. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-white">Mobile</label>
                  <Field
                    type="text"
                    id="mobile"
                    name="mobile"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="mobile" component="p" className="text-red-500 text-xs" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-xs" />
                </div>
              </div>
              {/* New Fields: Age, Height, Weight, Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-white">Age</label>
                  <Field
                    type="number"
                    id="age"
                    name="age"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="age" component="p" className="text-red-500 text-xs" />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-white">Height (cm)</label>
                  <Field
                    type="number"
                    id="height"
                    name="height"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="height" component="p" className="text-red-500 text-xs" />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-white">Weight (kg)</label>
                  <Field
                    type="number"
                    id="weight"
                    name="weight"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="weight" component="p" className="text-red-500 text-xs" />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-white">Gender</label>
                  <Field as="select" id="gender" name="gender" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="gender" component="p" className="text-red-500 text-xs" />
                </div>
              </div>
              {/* Appointment Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="appointmentDate" className="block text-sm font-medium text-white">Date of Appointment</label>
                  <Field
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="appointmentDate" component="p" className="text-red-500 text-xs" />
                </div>
                <div>
                  <label htmlFor="appointmentTime" className="block text-sm font-medium text-white">Time</label>
                  <Field
                    type="time"
                    id="appointmentTime"
                    name="appointmentTime"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="appointmentTime" component="p" className="text-red-500 text-xs" />
                </div>
              </div>

              {/* Other fields like Doctor, Treatment, Notes, and File Upload */}
              <div>
                <label htmlFor="doctor" className="block text-sm font-medium text-white">Consulting Doctor</label>
                <Field
                  as="select"
                  id="doctor"
                  name="doctor"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Dr. Smith</option>
                  <option>Dr. Jane</option>
                  <option>Dr. Johnson</option>
                </Field>
                <ErrorMessage name="doctor" component="p" className="text-red-500 text-xs" />
              </div>

              {/* File Upload */}
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-white">Photo</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={(e) => setFieldValue('images', e.target.files[0])}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-white focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Submit Appointment</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default BookAppointment
