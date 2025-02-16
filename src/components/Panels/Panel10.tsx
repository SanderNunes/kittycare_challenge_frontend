import React from "react";
import { Panel10Props } from "./types";
import { FREQUENCY_OPTIONS, LOCAL_STORAGE_KEY } from "./constants/frequencyOptions";
import { useFrequencySelection } from "./hooks/useFrequencySelection";
import { FrequencyCard } from "./components/FrequencyCard";
import NavigationButtons from "../NavigationButtons";

/**
 * Panel10 Component
 * Allows users to select their preferred check-in frequency for their cat's care
 */
const Panel10: React.FC<Panel10Props> = ({ nextStep, previousStep }) => {
  const { selectedFrequency, handleCardSelect } = useFrequencySelection();

  const handleSubmit = () => {
    if (selectedFrequency !== null) {
      const selectedOption = FREQUENCY_OPTIONS.find(
        (option) => option.id === selectedFrequency
      );
      if (selectedOption) {
        localStorage.setItem(LOCAL_STORAGE_KEY, selectedOption.title);
      }
      nextStep();
    }
  };

  return (
    // <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto relative font-inter">
    <div className="w-full md:max-w-7xl p-6 rounded-md mx-auto relative font-inter mb-10">
      <div className="text-center mb-6 lg:mb-8">
        <h1 className="font-extrabold text-xl mb-2 md:mx-56 lg:mx-80">
          How Often Do You Want to Check In With Your Cat?
        </h1>
        <p className="text-sm text-darkGray md:mx-44 lg:mx-72">
          We recommend checking in at least 3 times a week to stay on top of
          your cat's progress. How often would you like to receive reminders and
          track your cat's care?
        </p>
      </div>

      <div role="radiogroup" className="space-y-1 md:mx-32 lg:mx-60 mb-8">
        {FREQUENCY_OPTIONS.map((option) => (
          <FrequencyCard
            key={option.id}
            option={option}
            isSelected={selectedFrequency === option.id}
            onSelect={handleCardSelect}
          />
        ))}
      </div>

      <NavigationButtons
        previousStep={previousStep}
        nextStep={handleSubmit}
        isNextDisabled={selectedFrequency === null}
      />
    </div>
  );
};

export default Panel10;
