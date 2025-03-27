export const navigation = [
  {
    name: "Appointment",
    current: true,
    options: [
      { name: "Book Appointment", path: "/book_appointment" },
      { name: "Appointment List", path: "/appointment_list" },
    ],
  },
  {
    name: "Patients",
    current: false,
    options: [
      { name: "Add Patients", path: "/" },
      { name: "Patients List", path: "/" },
    ],
  },
  {
    name: "Doctors",
    current: true,
    options: [
      { name: "Add Doctors", path: "/add_doctor" },
      { name: "Doctors List", path: "/doctor_list" },
    ],
  },
  {
    name: "More",
    current: false,
    options: [
      { name: "Staff", path: "/add_staff" },
      { name: "Salary", path: "/" },
      { name: "Others", path: "/" },
      { name: "Dashboard", path: "/" },
    ],
  },
];
