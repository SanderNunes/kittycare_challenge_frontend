import React from "react";
import GoalCard from "./components/GoalCard";
import { useGoals } from "./hooks/useGoals";
import { GOALS } from "./constants/goals";
import NavigationButtons from "../NavigationButtons";

interface Panel08Props {
  nextStep: () => void;
  previousStep: () => void;
}

/**
 * Panel02 Component
 * Allows users to select up to three goals for their cat's improvement
 */
const Panel08: React.FC<Panel08Props> = ({ nextStep, previousStep }) => {
  const { selectedGoals, handleGoalSelect, handleNext } = useGoals(nextStep);

  return (
    <div className="w-full md:max-w-[1380px] p-6 rounded-md mx-auto">
      <div className="font-Inter text-center mb-8">
        <h1 className="font-bold text-3xl mb-2">
        Let's Choose Additional Goals For Your Cat!
        </h1>
        <p className="text-md text-darkGray p-5">
          Select goals to focus on for your cat's health and happiness.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6 w-3/4 mx-auto">
        {GOALS.map((goal) => (
          <GoalCard
            key={goal.title}
            goal={goal}
            isSelected={selectedGoals.includes(goal.title)}
            onSelect={handleGoalSelect}
          />
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

export default Panel08;
