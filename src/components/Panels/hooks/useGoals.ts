import { useState } from 'react';
import { MAX_GOALS } from '../constants/goals';

const STORAGE_KEY = 'goals';

export const useGoals = (nextStep: () => void) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

  const handleGoalSelect = (goal: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goal)) {
        return prev.filter((g) => g !== goal);
      }
      if (prev.length < MAX_GOALS) {
        return [...prev, goal];
      }
      return prev;
    });
  };

  const handleNext = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedGoals));

    nextStep();
  };

  return {
    selectedGoals,
    handleGoalSelect,
    handleNext
  };
}; 
