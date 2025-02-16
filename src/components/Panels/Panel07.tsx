import React, { useEffect, useState, useCallback } from 'react';
import NavigationButtons from '../NavigationButtons';
import { challengeOptions } from './constants/panel07Data';

interface Panel07Props {
  nextStep: () => void;
  previousStep: () => void;
}

const MAX_SELECTIONS = 10;
const STORAGE_KEY = 'issues_faced';

const Panel07: React.FC<Panel07Props> = ({ nextStep, previousStep }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  // Load saved goals from localStorage
  useEffect(() => {
    const storedGoals = localStorage.getItem(STORAGE_KEY);
    if (storedGoals) {
      setSelectedGoals(JSON.parse(storedGoals));
    }
  }, []);

  const handleGoalSelect = useCallback((goal: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goal)) {
        return prev.filter(g => g !== goal);
      }
      if (prev.length < MAX_SELECTIONS) {
        return [...prev, goal];
      }
      return prev;
    });
  }, []);

  const handleNext = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedGoals));
    nextStep();
  }, [selectedGoals, nextStep]);

  const isGoalSelected = useCallback((goal: string) =>
    selectedGoals.includes(goal), [selectedGoals]);

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <h2 className="text-black text-2xl md:text-3xl font-bold mb-2">
          What's Standing in Your Way?
        </h2>
        <p className="text-sm max-w-lg mx-auto mt-2 text-darkGray leading-relaxed">
          Select all the barriers that may be making it difficult to reach your cat's goals.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6 w-3/4 mx-auto">
        {challengeOptions.map((goal) => (
          <div
            key={goal.title}
            onClick={() => handleGoalSelect(goal.title)}
            className={`cursor-pointer border-2 border-lightGray2 py-8 px-6 rounded-lg text-left transition-colors ${isGoalSelected(goal.title)
              ? "bg-primaryBlue text-white border-none"
              : "hover:bg-primaryBlue hover:text-white"
              }`}
          >
            <h3 className="text-md md:text-lg mb-1.5">{goal.title}</h3>
            <p className="text-xs sm:text-sm opacity-80 leading-snug">
              {goal.description}
            </p>
          </div>
        ))}
      </div>

      <NavigationButtons
        nextStep={handleNext}
        previousStep={previousStep}
        isNextDisabled={selectedGoals.length === 0}
      />
    </div>
  );
};

export default Panel07;
