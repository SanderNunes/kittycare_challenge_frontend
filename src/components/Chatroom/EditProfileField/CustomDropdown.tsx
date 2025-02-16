import React, { useState, useRef, useEffect } from "react";

interface CustomDropdownProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  selectedOption,
  onSelect,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <label className="text-xl font-semibold">{label}</label>
      <div className="relative w-full" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-center items-center h-[55px] py-[14px] text-center rounded-[20px] border border-[#898B90] text-[#898B90]"
        >
          <div className="flex items-center justify-between gap-1">
            <span
              className={`block truncate ${
                !selectedOption ? "text-gray-500" : "text-gray-900"
              }`}
            >
              {selectedOption || placeholder}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full border border-[#898B90] rounded-[20px] bg-[#FAF6F3]">
            <ul className="py-4 px-[15px] max-h-60 overflow-auto">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onSelect(option.toLocaleLowerCase());
                    setIsOpen(false);
                  }}
                  className="text-center py-2 hover:bg-[#D1D6E2] rounded-[15px] text-gray-900 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
