import React from 'react';
import { Goal } from '../../../utils/types';

interface GoalCardProps {
    goal: Goal;
    isSelected: boolean;
    onSelect: (title: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, isSelected, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(goal.title)}
            className={`cursor-pointer border-2 border-lightGray2 py-8 px-6 rounded-lg text-left transition-colors ${isSelected
                    ? "bg-primaryBlue text-white"
                    : "border-gray-300 hover:bg-primaryBlue hover:text-white"
                }`}
        >
            <h3 className="text-lg mb-1.5">{goal.title}</h3>
            <p className="text-sm opacity-80">{goal.description}</p>
        </div>
    );
};

export default GoalCard; 