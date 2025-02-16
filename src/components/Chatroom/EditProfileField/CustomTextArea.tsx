import React from "react";

interface CustomTextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder = "Enter text here",
  rows = 4,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      <label className="text-xl font-medium">{label}</label>
      <div className="w-full">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full py-[14px] text-center px-4 text-gray-900 rounded-[20px] border border-[#898B90] placeholder-[#898B90] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default CustomTextArea;
