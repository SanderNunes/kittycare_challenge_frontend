import React from "react";

import Tip from "../../Tip";

const EnvironmentalEnrichmentSuggestions: React.FC = () => {
  return (
    <div className="w-full max-w-lg p-6 rounded-lg mx-auto font-inter">
      <h2 className="text-[20px] font-semibold text-center mb-4">
        Environmental Enrichment Suggestions
      </h2>

      <div className="flex flex-col items-center bg-lightPearl px-8 py-8 border-2 border-pearlBush rounded-3xl">
        <div className="bg-lightGray rounded-xl px-2 py-1 text-center mb-3">
          <h1 className="font-inter text-base font-semibold text-black leading-[28px]">
            Your Cat Health & Lifestyle
          </h1>
        </div>
        <p className="text-center font-inter font-normal text-black text-sm mt-2 mb-6">
          You own a scratching post and cat toys.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-primaryBlue flex items-center justify-center w-44 py-6 border-2 border-pearlBush rounded-3xl">
              <img
                src="/assets/Dumble.png"
                alt="no-dumble"
                className="object-contain h-30"
              />
            </div>
            <div className="border border-pearlBush p-3 rounded-xl w-full">
              <p className="font-inter text-xs text-black text-left">
                Scratching post
              </p>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="w-min text-black bg-primaryYellow px-2 py-1 rounded-md text-sm">
                    01
                  </p>
                  <span className="text-black text-xs mt-2">Forever</span>
                </div>
                <div>
                  <span className="text-xs bg-emerald-500 text-white p-1 rounded-md">
                    +100%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-primaryBlue flex items-center justify-center w-44 py-6 border-2 border-pearlBush rounded-3xl">
              <img
                src="/assets/rat.png"
                alt="no-dumble"
                className="object-contain h-30"
              />
            </div>
            <div className="border border-pearlBush p-3 rounded-xl w-full">
              <p className="font-inter text-xs text-black text-left">
                You have cat toys
              </p>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="w-min text-black bg-primaryYellow px-2 py-1 rounded-md text-sm">
                    03
                  </p>
                  <span className="text-black text-xs mt-2">Forever</span>
                </div>
                <div>
                  <span className="text-xs bg-emerald-500 text-white p-1 rounded-md">
                    +50%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tip text="Use the scratching post consistently to meet your cat’s scratching needs and protect your furniture!" />
    </div>
  );
};

export default EnvironmentalEnrichmentSuggestions;
