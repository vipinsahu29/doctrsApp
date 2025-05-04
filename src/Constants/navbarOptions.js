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
    current: true,
    options: [
      { name: "Add Patients", path: "/addPatient" },
      { name: "Patients List", path: "/patientList" },
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
      { name: "Salary & Expenses", path: "/" },
      { name: "Others", path: "/" },
      { name: "Dashboard", path: "/dashboard" },
    ],
  },
];
export const moreNavigation = [
  {
    name: "MoreStaff",
    current: true,
    options: [
      { name: "Add Staff", path: "/add_staff" },
      { name: "Staff List", path: "/staffs_list" },
    ],
  },
  {
    name: "MoreSalary",
    current: false,
    options: [
      { name: "Salary", path: "/salary" },
      { name: "Expences", path: "/expence" },
    ],
  },
  {
    name: "MoreDashboard",
    current: true,
    options: [
      { name: "Dashboard", path: "/dashboard" },
    ],
  },
  {
    name: "MoreOthers",
    current: false,
    options: [
      { name: "Expencess List", path: "/add_staff" },
      { name: "Add Expence", path: "/" },
      { name: "Others", path: "/" },
      { name: "logout", path: "/" },
    ],
  },
];
