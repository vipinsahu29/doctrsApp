// src/utils/dashboardStats.js

export const getPatientStats = (patientStats, totalAppointments, revisited) => {
  return [
    {
      label: "Total Patients",
      value: patientStats.totalPatients.toLocaleString("en-IN"),
      change: "+5%",
      positive: true,
    },
    {
      label: "New Patients",
      value: patientStats.newPatients.toLocaleString("en-IN"),
      change: `${patientStats.maleBetween.toLocaleString(
        "en-IN"
      )}M + ${patientStats.femaleBetween.toLocaleString(
        "en-IN"
      )}F`,
      positive: true,
    },
    {
      label: "Appointments",
      value: totalAppointments.toLocaleString("en-IN"),
      change: `Revisited: ${revisited.toLocaleString("en-IN")}`,
      positive: true,
    },
    {
      label: "Male-Female",
      value: `${patientStats.totalMale.toLocaleString(
        "en-IN"
      )} - ${patientStats.totalFemale.toLocaleString(
        "en-IN"
      )}`,
      change: "+7%",
      positive: true,
    },
  ];
};

export const getRevenueStats = (revenueStats) => {
  return [
    {
      label: "Total Revenue",
      value: `₹${revenueStats.totalRevenue.toLocaleString("en-IN")}`,
      change: "+0%",
      positive: true,
    },
    {
      label: "In Cash",
      value: `₹${revenueStats.inCash.toLocaleString("en-IN")}`,
      change: "+0%",
      positive: true,
    },
    {
      label: "UPI",
      value: `₹${revenueStats.upi.toLocaleString("en-IN")}`,
      change: "+0%",
      positive: false,
    },
    {
      label: "Card",
      value: `₹${revenueStats.card.toLocaleString("en-IN")}`,
      change: "+0%",
      positive: true,
    },
  ];
};