import React, { useEffect, useMemo, useState } from "react";

const AtomTable = ({
  columns = [],
  data = [],
  pageSize = 50,
  onEdit,
  onDelete,
  onView,
  onSave,
  isEditable = false,
  isDeletable = false,
  isViewable = false,
  isSaveable = false,
  isSaving = false,
  isDeleting = false,
  isLoading = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null);
  const [tableData, setTableData] = useState([]);

  // Sync incoming data
  useEffect(() => {
    setTableData(data);
  }, [data]);

  // Pagination
  const totalPages = Math.ceil(tableData.length / pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return tableData.slice(startIndex, endIndex);
  }, [tableData, currentPage, pageSize]);

  // Handle input change
  const handleChange = (rowIndex, key, value) => {
    setTableData((prevData) =>
      prevData.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              [key]: value,
            }
          : row,
      ),
    );
  };

  // Edit
  const handleEdit = (rowIndex, row) => {
    setEditingRow(rowIndex);

    if (onEdit) {
      onEdit(row);
    }
  };

  // Save
  const handleSave = (rowIndex, row) => {
    setEditingRow(null);

    if (onSave) {
      onSave(row);
    }
  };

  // Delete
  const handleDelete = (rowIndex, row) => {
    setTableData((prevData) =>
      prevData.filter((_, index) => index !== rowIndex),
    );

    if (onDelete) {
      onDelete(row);
    }
  };

  // View
  const handleView = (row) => {
    if (onView) {
      onView(row);
    }
  };
  if(isLoading){
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }
  // Render cell based on type
  const renderCell = (column, row, rowIndex, actualIndex) => {
    const value = row[column.key] ?? "";

    // Normal view mode
    if (editingRow !== actualIndex) {
      return value;
    }

    // SELECT
    if (column.type === "select") {
      return (
        <select
          value={value}
          onChange={(e) =>
            handleChange(actualIndex, column.key, e.target.value)
          }
          className="w-[80px] rounded border border-gray-300 px-2 py-1 text-sm outline-none focus:border-indigo-500"
          disabled={column.disabled}
        >
          <option value="">Select</option>

          {column.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    // RADIO
    if (column.type === "radio") {
      return (
        <div className="flex gap-3">
          {column.options?.map((option) => (
            <label key={option} className="flex items-center gap-1">
              <input
                type="radio"
                name={`${column.key}-${actualIndex}`}
                value={option}
                checked={value === option}
                onChange={(e) =>
                  handleChange(actualIndex, column.key, e.target.value)
                }
                disabled={column.disabled}
              />

              {option}
            </label>
          ))}
        </div>
      );
    }

    // DEFAULT INPUT
    return (
      <input
        type={column.type || "text"}
        value={value}
        required={column.required}
        onChange={(e) => handleChange(actualIndex, column.key, e.target.value)}
        className="w-full min-w-[120px] rounded border border-gray-300 px-2 py-1 text-sm outline-none focus:border-indigo-500"
        disabled={column.disabled}
      />
    );
  };

  return (
    <div className="w-full">
      {/* TABLE CONTAINER */}
      <div className="max-h-[600px] overflow-auto rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse whitespace-nowrap">
          {/* HEADER */}
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {column.label}

                  {column.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </th>
              ))}

              {/* ACTION COLUMN */}
              <th className="sticky right-0 z-20 border-b border-gray-200 bg-gray-100 px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => {
                const actualIndex = (currentPage - 1) * pageSize + rowIndex;

                return (
                  <tr
                    key={row.id || actualIndex}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-4 py-3 text-sm text-gray-700"
                      >
                        {renderCell(column, row, rowIndex, actualIndex)}
                      </td>
                    ))}

                    {/* ACTION BUTTONS */}
                    <td className="sticky right-0 bg-white px-4 py-3">
                      <div className="flex items-center gap-2">
                        {/* EDIT */}
                        {isEditable && editingRow === null && (
                          <button
                            type="button"
                            onClick={() => handleEdit(actualIndex, row)}
                            className="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600"
                          >
                            Edit
                          </button>
                        )}
                        {/* DELETE */}
                        {isDeletable && (
                          <button
                            type="button"
                            onClick={() => handleDelete(actualIndex, row)}
                            className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                            disabled={isDeleting}
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        )}

                        {/* VIEW */}
                        {isViewable && (
                          <button
                            className="bg-blue-500 px-2 hover:bg-blue-600 font-bold text-white border border-blue-900 rounded-md "
                            type="button"
                            onClick={() => handleView(row)}
                          >
                            View
                          </button>
                        )}

                        {/* SAVE */}
                        {isSaveable && (
                          <button
                            type="button"
                            onClick={() =>
                              handleSave(actualIndex, tableData[actualIndex])
                            }
                            disabled={editingRow !== actualIndex || isSaving}
                            className={`rounded px-3 py-1 text-xs font-medium text-white ${
                              editingRow === actualIndex
                                ? "bg-green-500 hover:bg-green-600"
                                : "cursor-not-allowed bg-gray-300"
                            }`}
                          >
                            {isSaving ? "Saving..." : "Save"}
                          </button>
                        )}
                        {editingRow === actualIndex && (
                          <button
                            className="bg-red-700 px-2 hover:bg-red-600 font-bold text-white border-red-900 rounded-md "
                            type="button"
                            onClick={() => setEditingRow(null)}
                          >
                            X
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing{" "}
          {tableData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, tableData.length)} of{" "}
          {tableData.length} records
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`rounded px-4 py-2 text-sm ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className={`rounded px-4 py-2 text-sm ${
              currentPage === totalPages || totalPages === 0
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AtomTable;
