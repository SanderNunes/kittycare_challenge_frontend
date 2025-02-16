import React from "react";
import Suggestions from "./Panel15/components/Suggestions";
// import Timeline from "./Panel15/components/Timeline";
// import DateSelection from "./Panel15/components/DateSelection";
// import EnvironmentalEnrichmentSuggestions from "./Panel15/components/EnvironmentalEnrichmentSuggestions";
import GoalSummary from "./Panel15/components/GoalSummary";
import { useNavigate } from "react-router-dom";
import { Panel15Props } from "../../types/panel.types";

const Panel15: React.FC<Panel15Props> = ({ openPaymentModal }) => {

  const navigate = useNavigate();

  return (
    <div className="w-full lg:max-w-4xl mx-auto p-4 lg:p-6 font-inter">
      <div className="text-center">
        <h1 className="font-bold text-xl lg:text-3xl mb-2">
          Thanks for Subscribing!
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-8 items-center lg:items-start justify-center">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-8 mb-2 lg:mb-0 align-center">
          <GoalSummary />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-2 items-center lg:items-start space-y-8">
          <Suggestions />
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => {
            debugger;
            if (localStorage.getItem("email") && localStorage.getItem('subscriptionId')) {
              navigate("/cat-assistant");
            } else if (!localStorage.getItem('subscriptionId')) {
              openPaymentModal?.();
            } else {
              navigate("/signup");
            }
          }}
          className="bg-primaryBlue text-white px-6 py-2 rounded-2xl hover:bg-opacity-90 text-base lg:text-lg"
        >
          Chat With Expert Now
        </button>
      </div>
    </div>
  );
};

export default Panel15;
