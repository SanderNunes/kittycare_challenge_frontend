import React from "react";
import { DaySelectionPanelProps } from "./types/daySelection";
import { DAY_OPTIONS, TRAINING_DAYS_KEY } from "./constants/dayOptions";
import { useDaySelection } from "./hooks/useDaySelection";
import { DayCard } from "./components/DayCard";
import NavigationButtons from "../NavigationButtons";

const Panel11: React.FC<DaySelectionPanelProps> = ({ nextStep, previousStep }) => {
  const { selectedDays, handleDaySelect } = useDaySelection();

  const handleSubmit = () => {
    if (selectedDays.length > 0) {
      localStorage.setItem(TRAINING_DAYS_KEY, JSON.stringify(selectedDays));
      nextStep();
    }
  };

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
      <div className="text-center mb-6 lg:mb-8">
        <h1 className="font-bold text-xl mb-2 mx-8 md:mx-40 lg:mx-80">
          Pick Your Best Training Days
        </h1>
        <p className="text-sm text-darkGray px-8 md:mx-36 lg:mx-72">
          Select the days when you're most likely to dedicate time to training
          your cat. We recommend picking at least 2-3 days a week for best
          results.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-2 md:gap-2 mx-auto md:max-w-4xl mb-10">
        {DAY_OPTIONS.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            isSelected={selectedDays.includes(day.day)}
            onSelect={handleDaySelect}
          />
        ))}
      </div>

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={selectedDays.length === 0}
      />
    </div>
  );
};

export default Panel11;
