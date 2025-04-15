import React, { useState, useEffect, useRef } from "react";
import labTestData from "../../Constants/pathology_tests_with_test_name.json";
const CheckInLabTest = ({ selectedData, setSelectedData }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  console.log(suggestions);
  useEffect(() => {
    if (input.length > 0) {
      const filtered = labTestData.filter((data) =>
        data.TestName.toLowerCase().includes(input.toLowerCase())
      );
      console.log("filtered:", filtered.map((item)=> item.TestName));
      setSuggestions(filtered.map((item)=> item.TestName));
      setHighlightedIndex(0);
    } else {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  }, [input]);

  const addValueHandler = (value) => {
    console.log(value);
    if (!value) return;

    // Ask for number of days (1-30)

    setSelectedData((prev) => (prev ? value + ", " + prev : value));

    setInput(""); // Clear input field
    setSuggestions([]); // Hide suggestions
    setHighlightedIndex(-1); // Reset index

    // Ensure cursor stays in input field
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Move selection down
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      // Move selection up
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (highlightedIndex >= 0 && suggestions.length > 0) {
        addValueHandler(suggestions[highlightedIndex]);
      }
    }
  };
  return (
    <div className="w-full max-w-7xl bg-slate-200 p-6 rounded-lg shadow-xl space-y-6 border border-slate-400">
      <div className="mx-auto mt-3">
        <label
          htmlFor="Symtoms"
          className="block text-sm font-medium text-gray-900 mb-3"
        >
          Pathology Test
        </label>
        <input
          type="text"
          className="border-red-300 border-2 p-2 w-full"
          placeholder="Search test Name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key
          autoFocus
        />
        {/* Display suggestions */}
        {suggestions.length > 0 && (
          <ul className="border p-2 bg-white shadow mt-1 h-[200px] overflow-auto">
            {suggestions.map((data, index) => (
              <button
                key={data}
                className={`cursor-pointer p-1 flex w-full ${
                  highlightedIndex === index
                    ? "bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
                tabIndex={0}
                onClick={() => addValueHandler(data)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onKeyDown={(e) => e.key === "Enter" && addValueHandler(data)}
              >
                {data}
              </button>
            ))}
          </ul>
        )}

        <textarea
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          rows="3"
          value={selectedData}
          placeholder="Selected test name will appear here..."
          onChange={(e) => setSelectedData(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CheckInLabTest;
