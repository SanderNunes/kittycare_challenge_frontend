import React from 'react';

interface FormSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: readonly string[];
    placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder,
}) => (
    <div className="text-center">
        <label className="block text-sm font-medium mb-0.5">
            {label}
        </label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full font-inter border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-primaryBlue placeholder:text-xs md:placeholder:text-sm text-sm placeholder:text-mediumGray"
        >
            <option value="" disabled className="bg-lightWhite text-sm">
                {placeholder}
            </option>
            {options.map((option) => (
                <option
                    key={option}
                    value={option}
                    className="bg-lightWhite text-sm"
                >
                    {option}
                </option>
            ))}
        </select>
    </div>
); 