import React from 'react';
import { CatItem } from '../types/catItems';

interface CatItemCardProps {
    item: CatItem;
    isSelected: boolean;
    onSelect: (title: string) => void;
}

const CatItemCard: React.FC<CatItemCardProps> = ({ item, isSelected, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(item.title)}
            className={`flex items-start cursor-pointer border-2 p-4 lg:p-5 rounded-2xl transition-all duration-300 items-center ${isSelected ? "border-primaryBlue bg-lightBlue" : "border-lightGray2"
                }`}
        >
            <div className="w-12 h-12 bg-primaryBlue flex items-center justify-center rounded-lg mr-4">
                <img
                    src={item.icon}
                    alt={`${item.title} icon`}
                    className="w-12 h-12"
                />
            </div>
            <div className="flex-1">
                <h3 className="text-md font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-darkGray">{item.description}</p>
            </div>
            <div
                className={`ml-4 mt-1 w-6 h-6 lg:w-6 lg:h-6 rounded-full border-2 flex-shrink-0 flex justify-center items-center ${isSelected ? "border-primaryBlue" : "border-lightGray2"
                    }`}
            >
                {isSelected && (
                    <span className="w-3 h-3 lg:w-3 lg:h-3 rounded-full bg-primaryBlue" />
                )}
            </div>
        </div>
    );
};

export default CatItemCard; 