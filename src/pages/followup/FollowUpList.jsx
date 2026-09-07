import { followUpColumns } from "./../../Constants/constantUtil";
import AtomTable from "../../components/Atom/AtomTable";
import {
  getFollowUpList,
  updateFollowUpData,
} from "../../SupaBase/FollowUpApi";
import { useEffect, useState, useCallback } from "react";
import AtomDateRangeSelector from "../../components/Atom/AtomDateRangeSelector";
import AppointmentRouting from "../../components/RoutingButtons/AppointmentRouting";
import Store from "../../store/store";
const FollowUpList = () => {
  const clinic_id = Store((state) => state.clinicId);
  const [followUpData, setFollowUpData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState("");
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
    period: null,
  });

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete:", row);
  };

  const handleView = (row) => {
    console.log("View:", row);
  };

  const handleSave = (row) => {
    console.log("Save:", row);
    updateData(row);
  };
  const updateData = async (row) => {
    const {
      patient_id,
      followup_date,
      follow_up_notes,
      followup_status,
      check_in_id,
    } = row;
    console.log("Updating data for patient_id:", row);
    const { data, error } = await updateFollowUpData(
      clinic_id,
      patient_id,
      followup_date,
      follow_up_notes,
      followup_status,
      check_in_id,
    );
    if (!data) {
      setUpdateStatus(error || "Failed to update follow-up data.");
    } else {
      setUpdateStatus(data || "Follow-up data updated successfully.");
    }
  };
  useEffect(() => {
    if (!selectedRange.startDate || !selectedRange.endDate) {
      return;
    }

    const fetchFollowUpData = async () => {
      try {
        setIsLoading(true);

        const { data } = await getFollowUpList(
          clinic_id,
          selectedRange.startDate,
          selectedRange.endDate,
        );

        setFollowUpData(data || []);
      } catch (error) {
        console.error("Error fetching follow-up data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowUpData();
  }, [selectedRange.startDate, selectedRange.endDate, clinic_id]);

  const handleDateChange = useCallback((range) => {
    setSelectedRange((prev) => {
      if (
        prev.startDate === range.startDate &&
        prev.endDate === range.endDate &&
        prev.period === range.period
      ) {
        return prev;
      }

      return {
        startDate: range.startDate,
        endDate: range.endDate,
        period: range.period,
      };
    });
  }, []);

  return (
    <div className="min-h-screen flex md:items-center bg-gray-300 flex-col gap-2 top-10 ">
      <div className="flex flex-col w-full md:w-[95%] lg:w-[85%] xl:w-[80%] 2xl:w-[80%] gap-3">
        <AppointmentRouting pageName="Appointment" />
        <h1 className="text-2xl font-bold">Follow-Up List</h1>
        <div className="mt-3 items-center flex flex-col gap-2 md:flex-row md:justify-between pl-2">
          <AtomDateRangeSelector
            futureDate={false}
            onDateChange={handleDateChange}
          />
        </div>
        <AtomTable
          columns={followUpColumns}
          data={followUpData}
          pageSize={20}
          onEdit={handleEdit}
          onSave={handleSave}
          isEditable={true}
          isSaveable={true}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
export default FollowUpList;
