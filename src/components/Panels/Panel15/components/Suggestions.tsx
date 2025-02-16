import React from "react";
import Tip from "../../Tip";

const Suggestions: React.FC<{ horizontal?: boolean; }> = ({ horizontal = false }) => {
  const foodBowls = JSON.parse(localStorage.getItem("food_bowls") || "0");
  const treats = JSON.parse(localStorage.getItem("treats") || "0");
  const playtime = JSON.parse(localStorage.getItem("playtime") || "0");

  return (
    <div className={`w-full ${horizontal ? 'mt-4' : 'max-w-lg'} p-6 rounded-lg mx-auto font-inter`}>
      <h2 className="text-[20px] font-semibold text-center mb-4">
        Suggestions
      </h2>

      <div className={`flex gap-4 ${horizontal ? 'flex-col md:flex-row gap-20 md:justify-center' : 'flex-col'} items-center`}>
        {/* Food Intake Group */}
        <div className={`flex ${horizontal ? 'flex-col max-w-[318px] h-full' : 'flex-col'} gap-2`}>
          <div className="flex flex-col items-center bg-lightPearl px-16 py-8 border-2 border-pearlBush rounded-3xl">
            <div className="bg-lightGray rounded-xl px-4 py-2 text-center mb-6">
              <h1 className="font-inter text-base font-semibold text-black leading-[28px]">
                Daily Food Intake
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center mb-6">
              <img
                src="/assets/FoodIntake.png"
                alt="Food Intake Suggestion"
                className="w-32 h-32 object-contain"
              />
            </div>
            <p className="text-center font-inter font-medium text-black text-[16px] mt-2 mb-6">
              We{" "}
              <span className="bg-primaryBlue text-white px-3 py-1 rounded-full font-bold text-xs">
                Recommended
              </span>{" "}
              {foodBowls} { foodBowls === "1" ? "cup" : "cups"} of food per day based on your cat’s current weight and target
              weight.
            </p>
            <div className="flex items-center w-full px-6">
              <span className="text-black font-medium text-sm">1</span>
              <input
                type="range"
                min="1"
                max="3"
                value={parseFloat(foodBowls)}
                readOnly
                className="flex-grow mx-2 appearance-none h-2 bg-gray-300 rounded-full accent-[#F4A623] cursor-pointer"
              />
              <span className="text-black font-medium text-sm">3</span>
            </div>
            <div className="flex justify-between w-full px-6 mt-1">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span className="w-2 h-2 bg-black rounded-full"></span>
            </div>
          </div>
          <Tip text="Reducing your cat's daily intake will help with their weight loss goal." />
        </div>

        {/* Treat Limitation Group */}
        <div className={`flex ${horizontal ? 'flex-col max-w-[318px] h-full' : 'flex-col'} gap-2`}>
          <div className="flex flex-col items-center bg-lightPearl px-16 py-8 border-2 border-pearlBush rounded-3xl">
            <div className="bg-lightGray rounded-xl px-4 py-2 text-center mb-6">
              <h1 className="font-inter text-base font-semibold text-black leading-[28px]">
                Treat Limitation
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center mb-6">
              <img
                src="/assets/TreatLimitation.png"
                alt="Treat Limitation"
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-inter text-base font-semibold text-black leading-[28px]">
                {treats} {parseFloat(treats) === 1 ? "Treat" : "Treats"}/Day
              </h1>
              <p className="text-center font-inter font-medium text-black text-sm">
                No more than {treats} {parseFloat(treats) === 1 ? "treat" : "treats"} per day to help manage weight.
              </p>
            </div>
          </div>
          <Tip text="Reducing treats will support your cat's weight management." />
        </div>

        {/* Playtime Group */}
        <div className={`flex ${horizontal ? 'flex-col max-w-[318px] h-full' : 'flex-col'} gap-2`}>
          <div className="flex flex-col items-center bg-lightPearl px-8 py-8 border-2 border-pearlBush rounded-3xl">
            <div className="bg-lightGray rounded-xl px-4 py-2 text-center mb-6">
              <h1 className="font-inter text-base font-semibold text-black leading-[28px]">
                Playtime Recommendations
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center mb-6">
              <img
                src="/assets/PlayTime.png"
                alt="Treat Limitation"
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-inter text-base font-semibold text-black leading-[28px]">
                {playtime} Minute Segments
              </h1>
              <p className="text-center font-inter font-thin text-black text-sm">
                We suggest {playtime} minutes of active play per day to improve your cat’s
                lifestyle.
              </p>
              <h1 className="font-inter text-sm font-bold m-3">
                Some Examples Could Be
              </h1>
              <div className="flex items-center justify-evenly gap-x-3">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-2">
                  <img
                    src="/assets/LaserPointerPlay.png"
                    alt="Laser Pointer Play"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-sm">Laser pointer play</span>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-2">
                  <img
                    src="/assets/ToyWand.png"
                    alt="Toy Wand"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-sm">Toy wand exercise</span>
                </div>
              </div>
            </div>
          </div>
          <Tip text="Increased playtime will also help reduce scratching behavior." />
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
