export const today = new Date().toISOString().split("T")[0];
export const timeOptions = [
  { label: "Morn-Noon-Night (1-1-1)", value: "1-1-1" },
  { label: "Morn-Night (1-0-1)", value: "1-0-1" },
  { label: "Morn Only (1-0-0)", value: "1-0-0" },
  { label: "Noon Only (0-1-0)", value: "0-1-0" },
  { label: "Night Only (0-0-1)", value: "0-0-1" },
  { label: "Morn-Noon (1-1-0)", value: "1-1-0" },
  { label: "Noon-Night (0-1-1)", value: "0-1-1" },
];

const commonFields = [
  { label: "First Name", name: "FirstName", type: "text", required: true },
  { label: "Last Name", name: "LastName", type: "text", required: true },
  { label: "Mobile", name: "Mobile", type: "tel", required: true },
  { label: "Email", name: "Email", type: "email", required: false },
  { label: "DOB", name: "DOB", type: "date", max: today, required: true },
  {
    label: "Gender",
    name: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    required: true,
  },
  { label: "Height", name: "Height", type: "number", required: false },
  { label: "Weight", name: "Weight", type: "number", required: false },
];
export const addPatientsInputFields = [
  ...commonFields,
  {
    label: "Blood Group",
    name: "BloodGroup",
    type: "select",
    options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  { label: "Adhar number", name: "Adhar", type: "text", required: false },
  {
    label: "Occupation",
    name: "Occupation",
    type: "select",
    options: ["Farmer", "Business", "Private Job","Gov Job", "Student", "Other","House wife"],
    required: true,
  },
  {
    label: "Last Visit",
    name: "LastVisit",
    type: "date",
    max: today,
    required: false,
  },
  { label: "City", name: "City", type: "text", required: true },
  { label: "State", name: "State", type: "text", required: true },
  { label: "Country", name: "Country", type: "text", required: true },
];

export const addStaffInputFields = [
  ...commonFields,
  { label: "PAN Card", name: "PANCard", type: "text", required: true },
  { label: "Adhar number", name: "Adhar", type: "text", required: true },
  {
    label: "Qualification",
    name: "Qualification",
    type: "text",
    required: true,
  },
  {
    label: "Specialization",
    name: "Specialization",
    type: "text",
    required: true,
  },
  {
    label: "Department",
    name: "Department",
    type: "select",
    options: ["Orthopedics", "Dentist", "Bones"],
    required: true,
  },
  { label: "City", name: "City", type: "text", required: true },
  { label: "State", name: "State", type: "text", required: true },
  { label: "Country", name: "Country", type: "text", required: true },
];

export const salaryInputFields = [
  { label: "Full Name", name: "Name", type: "text", required: true },
  { label: "Designation", name: "Designation", type: "text", required: true },
  {
    label: "Basic Salary",
    name: "BasicSalary",
    type: "number",
    required: true,
  },
  { label: "Deduction", name: "Deduction", type: "number", required: true },
  { label: "Net", name: "NetSalary", type: "number", required: true },
];
export const expensesInputFields = [
  { label: "Date", name: "Date", type: "date", max: today, required: true },
  { label: "Description", name: "Description", type: "text", required: true },
  { label: "Amount", name: "Amount", type: "number", required: true },
  {
    label: "Payment Mode",
    name: "PaymentMode",
    type: "select",
    options: ["Cash", "UPI/NB", "Credit Card","Debit Card", "Cheque"],
  },
];
export const appointmentFields = [
  ...commonFields,
  {
    label: "Appointment Date",
    name: "appointment_date",
    type: "date",
    max: today,
    required: true,
  },
];

export const registrationFields = [
  { label: "Clinic Name", name: "ClinicName", type: "text", required: true },
  {
    label: "Specialization",
    name: "Specialization",
    type: "text",
    required: true,
  },
  { label: "Address", name: "Address", type: "text", required: true },
  { label: "Dr Name", name: "DrName", type: "text", required: true },
  { label: "Mobile", name: "Mobile", type: "tel", required: true },
];
