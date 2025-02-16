import React from "react";

interface NavigationButtonsProps {
  nextStep: () => void;
  previousStep: () => void;
  isNextDisabled: boolean;
}

const baseButtonStyles = "w-full h-[55px] md:w-[115px] md:h-[40px] rounded-2xl";

const backButtonStyles = `${baseButtonStyles} bg-transparent text-mediumGray border border-mediumGray hover:text-white hover:border-none hover:bg-primaryBlue`;

const getNextButtonStyles = (isDisabled: boolean): string => `
  ${baseButtonStyles} 
  ${isDisabled
    ? "bg-lightGray text-mediumGray cursor-not-allowed"
    : "bg-primaryBlue text-white hover:bg-opacity-90"
  }
`;

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  nextStep,
  previousStep,
  isNextDisabled,
}) => {
  return (
    <div className="flex flex-col-reverse gap-2 md:gap-4 mx-8 md:mx-0 md:flex-row justify-center items-center space-y-4 md:space-y-0">
      <button
        onClick={previousStep}
        className={backButtonStyles}
        aria-label="Go to previous step"
      >
        <span aria-hidden="true">{"<"}</span> Back
      </button>

      <button
        onClick={nextStep}
        disabled={isNextDisabled}
        className={getNextButtonStyles(isNextDisabled)}
        aria-label="Go to next step"
      >
        Next <span aria-hidden="true">{">"}</span>
      </button>
    </div>
  );
};

export default NavigationButtons;
