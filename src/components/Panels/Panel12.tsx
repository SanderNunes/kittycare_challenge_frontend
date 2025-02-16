import React from "react";
import { useEffect, useState } from "react";
import NavigationButtons from "../NavigationButtons";
import CatItemCard from "./components/CatItemCard";
import { CAT_ITEMS } from "./constants/catItems";
import { Panel12Props } from "./types/catItems";

const LOCAL_STORAGE_KEY = "items";

const Panel12: React.FC<Panel12Props> = ({ nextStep, previousStep }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedItems) {
      setSelectedItems(JSON.parse(storedItems));
    }
  }, []);

  const handleItemClick = (title: string) => {
    setSelectedItems((prev) => {
      const updatedItems = prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <div className="w-full max-w-lg lg:max-w-5xl mx-auto p-4 lg:p-6 relative font-inter">
      <header className="text-center mb-6 lg:mb-8">
        <h1 className="font-bold text-xl mb-2">What Cat Items Do You Own?</h1>
        <p className="text-sm lg:text-md text-darkGray max-w-2xl mx-auto">
          Let us know what cat-related items you have at home so we can tailor
          our tips and recommendations.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:mx-24">
        {CAT_ITEMS.map((item) => (
          <CatItemCard
            key={item.id}
            item={item}
            isSelected={selectedItems.includes(item.title)}
            onSelect={handleItemClick}
          />
        ))}
      </div>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={selectedItems.length === 0}
      />
    </div>
  );
};

export default Panel12;
