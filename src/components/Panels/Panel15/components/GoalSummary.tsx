import React from "react";
import Tip from "../../Tip";

const GoalSummary: React.FC = () => {
  const progressValues = [
    { label: "Improve Lifestyle", value: 25 },
    { label: "Scratching Less", value: 0 },
    { label: "Lose Weight", value: 0 },
  ];

  return (
    <div className="w-full max-w-lg p-6 rounded-lg mx-auto font-inter">
      <h2 className="text-[20px] font-semibold text-center mb-4">
        Goal Summary
      </h2>

      <div className="my-1 text-center">
        <span className="bg-primaryYellow text-black font-medium px-3 py-2 rounded-2xl text-left md:mr-3 md:w-auto w-fit m-1">
          Selected Goals
        </span>
        {JSON.parse(localStorage.getItem("goals") || "[]")
          .map((item: string, idx: number) => (
            <span
              key={idx}
              className="inline-block text-mediumGray py-2 px-3 rounded-full text-sm border border-mediumGray m-1"
            >
              {item}
            </span>
          ))}
      </div>

      <div className="flex flex-col items-center bg-lightPearl px-16 py-8 border-2 border-pearlBush rounded-3xl mb-2">
        <div className="bg-lightGray rounded-xl px-4 py-2 text-center mb-6">
          <h1 className="font-inter text-base font-semibold text-black leading-[28px]">
            Personalized Goals
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-8 space-y-2 md:space-y-0 mb-8">
          {progressValues.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative flex items-center justify-center w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-lightGray"></div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-primaryBlue"
                  style={{
                    clipPath: `inset(${100 - item.value}% 0 0 0)`,
                    transform: `rotate(${item.value * 3.6}deg)`,
                    transition: "all 0.5s ease",
                  }}
                ></div>
                <span className="text-xl font-semibold">{item.value}%</span>
              </div>
              <p className="mt-2 text-center font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <Tip text="Tips: We’ll track progress on these goals every week!" />
    </div>
  );
};

export default GoalSummary;
