import { followUpColumns } from "./../../Constants/constantUtil";
import AtomTable from "../../components/Atom/AtomTable";
import { getFollowUpList } from "../../SupaBase/FollowUpApi";
import { useEffect, useState } from "react";
import AtomDateRangeSelector from "../../components/Atom/AtomDateRangeSelector";

const FollowUpList = () => {
  const [followUpData, setFollowUpData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);

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
  };

  useEffect(() => {
    const fetchFollowUpData = async () => {
      try {
        setIsLoading(true);
        const clinicId = 32; // Replace with actual clinic ID
        const startDate = "2023-01-01"; // Replace with actual start date
        const endDate = "2026-12-31"; // Replace with actual end date
        const { data } = await getFollowUpList(clinicId, startDate, endDate);
        setFollowUpData(data);
      } catch (error) {
        console.error("Error fetching follow-up data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowUpData();
  }, []);

  const handleDateChange = (range) => {
    console.log("Selected Date Range:", range);

    setSelectedRange(range);

    // Example API call
    // fetchData(range.startDate, range.endDate);
  };

  return (
    <div className="min-h-screen flex md:items-center bg-gray-300 flex-col gap-2 pt-4 ">
      <h1 className="text-2xl font-bold mb-4 top-7">Follow-Up List</h1>
      <div className="flex flex-col w-full md:w-[95%] lg:w-[85%] xl:w-[80%] 2xl:w-[80%] gap-4">
        <div className="mt-3 items-center flex flex-col gap-2 md:flex-row md:justify-between pl-2">
            <AtomDateRangeSelector futureDate={false} onDateChange={handleDateChange} />
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
