import React from 'react';
import { ActivityLevel } from '../constants/panel09Data';

interface ActivityCardProps {
    level: ActivityLevel;
    isSelected: boolean;
    onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ level, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer flex items-start p-2 sm:p-4 w-full space-x-4 border-2 rounded-2xl transition-colors ${isSelected
                ? "bg-primaryBlue text-white border-primaryBlue"
                : "border-gray-300 bg-white"
                }`}
        >
            <img
                src={level.image}
                alt={level.title}
                className="w-20 h-20 md:w-24 md:h-24"
            />
            <div className="flex flex-col justify-center items-start space-y-2">
                <h3
                    className={`font-medium ${isSelected ? "text-white" : "text-black"
                        } lg:text-xl text-base`}
                >
                    {level.title}
                </h3>
                <p
                    className={`${isSelected
                        ? "text-white opacity-80"
                        : "text-darkGray"
                        } text-xs md:text-sm font-extralight`}
                >
                    {level.description}
                </p>
            </div>
        </div>
    );
};

export default ActivityCard; 