export const navigation = [
  {
    name: "Appointment",
    current: true,
    options: [
      { name: "Book Appointment", path: "/book_appointment" },
      { name: "Appointment List", path: "/appointment_list" },
      { name: "Edit Appointment", path: "/edit_appointment" },
    ],
  },
  {
    name: "Patients",
    current: false,
    options: [
      { name: "Add Patients", path: "/" },
      { name: "Patients List", path: "/" },
      { name: "Edit Patient", path: "/" },
    ],
  },
  {
    name: "Doctors",
    current: false,
    options: [
      { name: "Add Doctors", path: "}/" },
      { name: "Doctors List", path: "/" },
      { name: "Edit Doctors", path: "/" },
    ],
  },
  {
    name: "More",
    current: false,
    options: [
      { name: "Staff", path: "/" },
      { name: "Salary", path: "/" },
      { name: "Others", path: "/" },
      { name: "Dashboard", path: "/" },
    ],
  },
];
