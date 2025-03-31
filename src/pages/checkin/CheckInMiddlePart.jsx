import React, { useState, useEffect } from "react";
import symptomsData from "../../Constants/symptoms.json";

const CheckInMiddlePart = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [familyHistory, setFamiliyHistory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input.length > 0) {
      const filtered = symptomsData.symptoms.filter((symptom) =>
        symptom.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
      setHighlightedIndex(0);
    } else {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  }, [input]);
  const addSymptom = (symptom) => {
    if (symptom && !selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setInput(""); // Clear input field
    setSuggestions([]); // Hide suggestions
    setHighlightedIndex(-1);
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
        addSymptom(suggestions[highlightedIndex]);
      }
    }
  };
  console.log("suggestions-", suggestions, symptomsData.symptoms);
  return (
    <div className="w-full max-w-7xl bg-slate-200 p-6 rounded-lg shadow-lg space-y-6">
      <div className="mx-auto mt-3">
        <label
          htmlFor="Symtoms"
          className="block text-sm font-medium text-gray-900 mb-3"
        >
          Symtoms/History
        </label>
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Type symptom..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key
          autoFocus
        />
        {/* Display suggestions */}
        {suggestions.length > 0 && (
          <ul className="border p-2 bg-white shadow mt-1 h-[200px] overflow-auto">
            {suggestions.map((symptom, index) => (
              <li
              key={index}
              className={`cursor-pointer p-1 ${
                highlightedIndex === index ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
              role="button"
              tabIndex={0}
              onClick={() => addSymptom(symptom)}
              onMouseEnter={() => setHighlightedIndex(index)}
              onKeyDown={(e) => e.key === "Enter" && addSymptom(symptom)}
            >
                {symptom}
              </li>
            ))}
          </ul>
        )}

        <textarea
          className="border p-2 w-full mt-2"
          rows="3"
          value={selectedSymptoms.join(", ")}
          placeholder="Selected symptoms will appear here..."
          readOnly
        />
      </div>
      <div>
        <label
          htmlFor="FHistory"
          className="block text-sm font-medium text-gray-900"
        >
          Family History for any kind of illness
        </label>
        <textarea
          type="text"
          id="FHistory"
          name="FHistory"
          value={familyHistory}
          onChange={(e) => setFamiliyHistory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default CheckInMiddlePart;
