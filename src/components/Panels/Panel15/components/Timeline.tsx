import React from "react";
import Tip from "../../Tip";

interface TimelineItem {
  method: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  { method: "Method 1", description: "Introduce healthier feeding habits" },
  { method: "Method 2", description: "Notice a reduction in scratching" },
  { method: "Method 4", description: "Improved playtime activity" },
  { method: "Method 6", description: "Weight loss goal reached" },
];

const Timeline: React.FC = () => {
  return (
    <div className="w-full max-w-lg p-6 rounded-lg mx-auto font-inter">
      <h2 className="text-[20px] font-semibold text-center mb-4">
        Timeline Overview
      </h2>

      <div className="flex flex-col items-center bg-lightPearl px-8 py-4 border-2 border-pearlBush rounded-3xl relative">
        {/* Added overlay for locked state */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-3xl flex flex-col items-center justify-center z-20">
          <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-110">
            <div className="absolute inset-0 bg-pearlBush rounded-full animate-ping opacity-75"></div>
            <img
              src="/assets/veryInactive.png"
              alt="Cat silhouette"
              className="w-20 h-20 relative z-10"
            />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg text-sm text-gray-700 whitespace-nowrap">
              More features coming soon!
            </div>
          </div>
          <p className="mt-4 text-white font-semibold text-xl">
            <span className="relative inline-block animate-bounce">
              Coming Soon!
            </span>
          </p>
        </div>

        {/* Original content with reduced opacity */}
        <div className="relative z-10">
          <div className="bg-lightGray rounded-xl px-4 py-2 text-center mb-6">
            <h1 className="font-inter text-[20px] font-semibold text-black leading-[28px]">
              Next 6 Months
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-3 items-center">
            {/* Left side with Method labels */}
            <div className="flex flex-col items-center justify-between space-y-10 h-full">
              {timelineItems.map((item, index) => (
                <div key={index} className="font-semibold text-black">
                  {item.method}
                </div>
              ))}
            </div>

            {/* Center Vertical Progress Bar */}
            <div className="flex flex-col items-center justify-between space-y-10 h-full">
              <img
                src="/assets/VerticalProgress.png"
                alt="Vertical Progress"
                className="w-8 h-[25rem]"
              />
            </div>

            {/* Right side with Descriptions */}
            <div className="flex flex-col items-center justify-between space-y-10 h-full">
              {timelineItems.map((item, index) => (
                <div key={index} className="text-gray-600 text-sm font-medium">
                  {item.description}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Tip text="Staying consistent will help you and your cat reach these milestones!" />
    </div>
  );
};

export default Timeline;
