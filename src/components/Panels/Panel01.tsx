import React from "react";

interface Panel01Props {
  nextStep: () => void;
}

/**
 * Welcome panel displayed after user subscription
 * Shows feature highlights and prompts user to start the onboarding process
 */
const Panel01: React.FC<Panel01Props> = ({ nextStep }) => {

  return (
    <div className="relative flex flex-col items-center justify-start px-4 py-2 md:p-4 globalBackground">
      <div className="w-full max-w-4xl mx-auto">
        {/* Welcome Message */}
        <header className="flex flex-col items-center justify-center w-full max-w-md md:mt-8 mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-black font-inter">
            Does Your Cat Need Help? 🐾
            <br />
            Take Our 2-Minute Quiz
          </h1>
          <p className="text-md md:text-lg font-light px-3 py-2 sm:px-5 sm:py-3 text-darkGray">
            Get instant insights into your cat’s health and start chatting with an expert in minutes. Tailored advice, personalized to your cat’s needs.
          </p>
        </header>

        {/* Action Button */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <button
            onClick={nextStep}
            className="bg-primaryBlue text-white text-2xl md:text-3xl px-6 sm:px-8 py-2 sm:py-3 rounded-2xl hover:bg-opacity-90 transition-opacity"
            aria-label="Start onboarding process"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panel01;
