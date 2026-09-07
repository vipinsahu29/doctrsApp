import { useCallback, useEffect, useState } from "react";

const AtomDateRangeSelector = ({
  onDateChange,
  defaultPeriod = "week",
  futureDate = false, 
}) => {
  const [activePeriod, setActivePeriod] = useState(defaultPeriod);

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getDateRange = useCallback((period) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDate;
    let endDate;

    // ==========================
    // NORMAL DATE FUNCTIONALITY
    // ==========================
    if (!futureDate) {
      switch (period) {
        case "week": {
          const day = today.getDay();
          const diff = day === 0 ? -6 : 1 - day;

          startDate = new Date(today);
          startDate.setDate(today.getDate() + diff);

          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6);

          break;
        }

        case "month": {
          startDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
          );

          endDate = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
          );

          break;
        }

        case "quarter": {
          const currentMonth = today.getMonth();

          const quarterStartMonth =
            Math.floor(currentMonth / 3) * 3;

          startDate = new Date(
            today.getFullYear(),
            quarterStartMonth,
            1
          );

          endDate = new Date(
            today.getFullYear(),
            quarterStartMonth + 3,
            0
          );

          break;
        }

        case "year": {
          startDate = new Date(
            today.getFullYear(),
            0,
            1
          );

          endDate = new Date(
            today.getFullYear(),
            11,
            31
          );

          break;
        }

        default: {
          startDate = today;
          endDate = today;
        }
      }
    }

    // ==========================
    // FUTURE DATE FUNCTIONALITY
    // ==========================
    else {
      switch (period) {
        case "week": {
          // 3 days past + 4 days future
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 3);

          endDate = new Date(today);
          endDate.setDate(today.getDate() + 4);

          break;
        }

        case "month": {
          // 5 days past
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 5);

          // End of current month
          endDate = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
          );

          break;
        }

        case "quarter": {
          // 15 days past
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 15);

          const currentMonth = today.getMonth();
          const quarterStartMonth =
            Math.floor(currentMonth / 3) * 3;

          endDate = new Date(
            today.getFullYear(),
            quarterStartMonth + 3,
            0
          );

          break;
        }

        case "year": {
          // 30 days past
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 30);

          endDate = new Date(
            today.getFullYear(),
            11,
            31
          );

          break;
        }

        default: {
          startDate = today;
          endDate = today;
        }
      }
    }

    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      period,
    };
  }, [futureDate]);

  // ==========================
  // PERIOD BUTTON CLICK
  // ==========================
  const handlePeriodClick = (period) => {
    setActivePeriod(period);

    const range = getDateRange(period);

    setDateRange({
      startDate: range.startDate,
      endDate: range.endDate,
    });

    onDateChange?.(range);
  };

  // ==========================
  // MANUAL DATE CHANGE
  // ==========================
  const handleManualDateChange = (field, value) => {
    setActivePeriod("custom");

    setDateRange((prev) => {
      const updatedRange = {
        ...prev,
        [field]: value,
      };

      // Call parent only when both dates are selected
      if (updatedRange.startDate && updatedRange.endDate) {
        onDateChange?.({
          ...updatedRange,
          period: "custom",
        });
      }

      return updatedRange;
    });
  };

  // ==========================
  // DEFAULT DATE RANGE
  // ==========================
  useEffect(() => {
    const range = getDateRange(defaultPeriod);

    setDateRange({
      startDate: range.startDate,
      endDate: range.endDate,
    });

    onDateChange?.(range);
  }, [defaultPeriod, getDateRange, onDateChange]);

  const periods = [
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "This Quarter", value: "quarter" },
    { label: "This Year", value: "year" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* PERIOD BUTTONS */}
      <div className="flex flex-wrap gap-2">
        {periods.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => handlePeriodClick(item.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activePeriod === item.value
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* DATE INPUTS */}
      <div className="flex flex-wrap items-end gap-4">
        {/* START DATE */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="start-date"
            className="text-sm font-medium text-gray-700"
          >
            Start Date
          </label>

          <input
            id="start-date"
            type="date"
            value={dateRange.startDate}
            max={dateRange.endDate || undefined}
            onChange={(e) =>
              handleManualDateChange(
                "startDate",
                e.target.value
              )
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* END DATE */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="end-date"
            className="text-sm font-medium text-gray-700"
          >
            End Date
          </label>

          <input
            id="end-date"
            type="date"
            value={dateRange.endDate}
            min={dateRange.startDate || undefined}
            onChange={(e) =>
              handleManualDateChange(
                "endDate",
                e.target.value
              )
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>
    </div>
  );
};

export default AtomDateRangeSelector;