import React from 'react';
import { FrequencyOption } from '../types';

interface FrequencyCardProps {
    option: FrequencyOption;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

export const FrequencyCard: React.FC<FrequencyCardProps> = ({
    option,
    isSelected,
    onSelect,
}) => (
    <div
        role="radio"
        aria-checked={isSelected}
        tabIndex={0}
        onClick={() => onSelect(option.id)}
        onKeyPress={(e) => e.key === 'Enter' && onSelect(option.id)}
        className={`cursor-pointer lg:h-20 border-2 p-4 lg:px-6 lg:py-2 rounded-2xl text-left transition-all duration-300 ${isSelected ? "border-primaryBlue" : "border-lightGray2"
            }`}
    >
        <div className="flex justify-between items-center lg:space-x-4">
            <div className="flex flex-col">
                <h3
                    className={`text-md lg:text-lg font-semibold ${isSelected ? "text-primaryBlue" : "text-black"
                        }`}
                >
                    {option.title}
                    {option.isRecommended && (
                        <span className="bg-primaryBlue text-white text-xs px-2 py-1 rounded-full ml-2">
                            Recommended
                        </span>
                    )}
                </h3>
                <p
                    className={`text-sm ${isSelected ? "text-primaryBlue" : "text-darkGray"
                        }`}
                >
                    {option.description}
                </p>
            </div>
            <div
                className={`ml-4 lg:ml-auto w-6 h-6 rounded-full border-2 flex justify-center items-center ${isSelected ? "border-primaryBlue" : "border-lightGray2"
                    }`}
            >
                {isSelected && (
                    <span className="w-3 h-3 rounded-full bg-primaryYellow"></span>
                )}
            </div>
        </div>
    </div>
); 