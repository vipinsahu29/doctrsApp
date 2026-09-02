// src/components/common/InfoTooltip.jsx

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const AtomToolTipInfo = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);

  AtomToolTipInfo.propTypes = {
    content: PropTypes.node.isRequired,
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative left-[240px] top-[-2px]">
      {/* Info Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-label="Show information"
        aria-expanded={isOpen}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-300"
      >
        i
      </button>

      {/* Tooltip */}
      {isOpen && (
        <div
          ref={tooltipRef}
          className="absolute right-0 top-8 z-50 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close tooltip"
            className="absolute right-2 top-2 text-lg font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>

          {/* Content */}
          <div className="pr-5 text-sm text-gray-700">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default AtomToolTipInfo;