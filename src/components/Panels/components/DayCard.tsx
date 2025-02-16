import React from 'react';
import { motion } from 'framer-motion';
import { DayOption } from '../types/daySelection';

interface DayCardProps {
    day: DayOption;
    isSelected: boolean;
    onSelect: (day: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ day, isSelected, onSelect }) => {
    return (
        <motion.div
            onClick={() => onSelect(day.day)}
            className={`cursor-pointer border-2 p-4 lg:p-6 rounded-2xl text-left transition-all duration-300 ${isSelected ? "border-primaryBlue" : "border-lightGray2"
                }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="flex justify-between items-center">
                <h3
                    className={`text-md lg:text-lg font-semibold ${isSelected ? "text-primaryBlue" : "text-black"
                        }`}
                >
                    {day.day}
                </h3>
                <div
                    className={`ml-4 lg:ml-auto w-6 h-6 lg:w-6 lg:h-6 rounded-full border-2 flex justify-center items-center ${isSelected ? "border-primaryBlue" : "border-lightGray2"
                        }`}
                >
                    {isSelected && (
                        <span className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-primaryYellow" />
                    )}
                </div>
            </div>
        </motion.div>
    );
}; 