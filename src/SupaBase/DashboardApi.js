import { supabase } from "../supabaseClient";

export async function getPatientsCount(date1, date2, clinicId) {
  const { data, error } = await supabase.rpc("patient_summary", {
    p_start_date: date1,
    p_end_date: date2,
    p_clinic_id: clinicId,
  });

  if (error) {
    console.error("Error fetching patient count:", error);
    return { data: null, error };
  }
  return { data, error };
}

export const getPatientsCountNew = async (startDate, endDate, clinicId) => {
  try {
    const { data, error } = await supabase.rpc("patient_summary", {
      p_start_date: startDate,
      p_end_date: endDate,
      p_clinic_id: clinicId,
    });

    if (error) {
      throw error;
    }

    const patientData = data?.[0] ?? {};

    return {
      totalPatients: patientData.total_patients ?? 0,
      newPatients:
        (patientData.patients_added_male_between ?? 0) +
        (patientData.patients_added_female_between ?? 0),
      totalMale: patientData.total_male_patients ?? 0,
      totalFemale: patientData.total_female_patients ?? 0,
      maleBetween: patientData.patients_added_male_between ?? 0,
      femaleBetween: patientData.patients_added_female_between ?? 0,
    };
  } catch (error) {
    console.error("getPatientsCount:", error);

    throw error;
  }
};
export async function getAppointmentsCount(date1, date2, clinicId) {
  try {
    const { data, error } = await supabase.rpc("appointment_fees_summary", {
      p_date1: date1,
      p_date2: date2,
      p_clinic_id: clinicId,
    });
    if (error) {
      console.error("Error fetching patient count:", error);
      return { data: null, error };
    }
    const appointmentData = data?.[0] ?? {};
    return {
      totalAppointments: appointmentData?.total_count_excluding_modes ?? 0,
      revisited: appointmentData?.duplicate_patient_id_count ?? 0,
      totalRevenue: appointmentData?.total_fees ?? 0,
      cash: appointmentData?.total_fees_cash ?? 0,
      card: appointmentData?.total_fees_credit_card ?? 0,
      upi: appointmentData?.total_fees_upi ?? 0,
    };
  } catch (error) {
    console.error("getAppointmentsCount:", error);
    throw error;
  }
}

export async function getExpenseStats(date1, date2, clinicId) {
  try {
    const { data, error } = await supabase.rpc("expense_summry", {
      p_start_date: date1,
      p_end_date: date2,
      p_clinic_id: clinicId,
    });
    if (error) {
      console.error("Error fetching patient count:", error);
      return { data: null, error };
    }
    const expenseData = data?.[0] ?? {};
    console.log("Exp Data--", expenseData);
    // return expenseData
    return {
      total_expense_sum: expenseData?.total_expense_sum ?? 0,
      fixed_expenses: expenseData?.fixed_expenses ?? 0,
      professional_expenses: expenseData?.professional_expenses ?? 0,
      facility_expenses: expenseData?.facility_expenses ?? 0,
      business_miscellaneous: expenseData?.business_miscellaneous ?? 0,
    };
  } catch (error) {
    console.error("getAppointmentsCount:", error);
    throw error;
  }
}

export async function GetExpenseStats(date1, date2, clinicId) {
  const data = await getExpenseStats(date1, date2, clinicId);
  console.log("-->", data);
  return data;
}

export async function getChartStats(date1, date2, clinicId) {
  try {
    const { data, error } = await supabase.rpc("chartdatastats", {
      startdate: date1,
      enddate: date2,
      clinic_id: clinicId,
    });
    if (error) {
      console.error("Error fetching patient count:", error);
      return { data: null, error };
    }
    const chartData = data ?? {};
    // return expenseData
    return chartData;
  } catch (error) {
    console.error("getAppointmentsCount:", error);
    throw error;
  }
}
