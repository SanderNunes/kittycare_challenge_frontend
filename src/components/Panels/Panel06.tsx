import React, { useState } from "react";
import NavigationButtons from "../NavigationButtons";
import { PROGRESS_ITEMS } from "./constants/progressItems";
import { ProgressCard } from "./components/ProgressCard";

interface Panel06Props {
  nextStep: () => void;
  previousStep: () => void;
}

const MAX_GOALS = 10;

const Panel06: React.FC<Panel06Props> = ({ nextStep, previousStep }) => {
  const [selectedProgress, setSelectedProgress] = useState<string[]>(JSON.parse(localStorage.getItem("required_progress") || '[]'));


  const handleCardSelect = (progress: string) => {
    setSelectedProgress(prev => {
      if (prev.includes(progress)) {
        return prev.filter((g) => g !== progress);
      }
      if (prev.length < MAX_GOALS) {
        return [...prev, progress];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    if (selectedProgress !== null) {
      localStorage.setItem("required_progress", JSON.stringify(selectedProgress));

      nextStep();
    }
  };

  return (
    <main className="w-full max-w-2xl lg:max-w-6xl mx-auto p-6 relative">
      <header className="text-center mb-8">
        <h1 className="font-bold text-2xl lg:text-3xl mb-2">
          What Progress is Most Important To You?
        </h1>
        <p className="text-sm text-darkGray max-w-2xl mx-auto">
          Choose the most important area where you'd like to see progress for
          your cat.
        </p>
      </header>

      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:mx-12"
        role="radiogroup"
        aria-label="Progress options"
      >
        {PROGRESS_ITEMS.map((item) => (
          <ProgressCard
            key={item.id}
            item={item}
            isSelected={selectedProgress.includes(item.title)}
            onSelect={handleCardSelect}
          />
        ))}
      </section>

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={selectedProgress.length === 0}
      />
    </main>
  );
};

export default Panel06;
