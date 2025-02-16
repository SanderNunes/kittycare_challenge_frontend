import React from 'react';

interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    value,
    onChange,
    placeholder,
}) => (
    <div className="text-center">
        <label className="block text-sm font-medium mb-0.5">
            {label}
        </label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full font-inter border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-primaryBlue placeholder:text-xs md:placeholder:text-sm text-sm placeholder:text-mediumGray"
        />
    </div>
); 