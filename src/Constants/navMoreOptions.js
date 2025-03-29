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
        { name: "Add Patients", path: "/" },
        { name: "Patients List", path: "/" },
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
  