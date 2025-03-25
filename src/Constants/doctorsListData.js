export const doctorsData = [
  {
    Id:1,
    FirstName: "Alok",
    LastName: "Sharma",
    Mobile: "9900887744",
    Email: "alok.Sharma@drap.com",
    DOB: "12-12-1968",
    Qualification: "MBBS, MD US",
    Gender: "Male",
    Specialization: "Pediatrician",
    CareerStartDate: "19-05-1997",
    Shifts: [
      {
        Days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        StartTime: "11:00",
        EndTime: "13:30",
      },
      {
        Days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        StartTime: "17:00",
        EndTime: "19:00",
      },
      { Days: [], StartTime: "", EndTime: "" },
    ],
  },
  {
    Id:2,
    FirstName: "Sumedh",
    LastName: "Giri",
    Mobile: "8700887799",
    Email: "sumedh.giri@drap.com",
    DOB: "29-11-1988",
    Qualification: "MBBS, MD US",
    Gender: "Male",
    Specialization: "Gastroenterologist",
    CareerStartDate: "01-11-2005",
    Shifts: [
      { Days: ["Mon", "Wed", "Fri"], StartTime: "11:00", EndTime: "13:30" },
      {
        Days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        StartTime: "17:00",
        EndTime: "19:00",
      },
      { Days: [], StartTime: "", EndTime: "" },
    ],
  },
];
