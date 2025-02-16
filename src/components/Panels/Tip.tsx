import React from "react";

interface TipProps {
  text: string;
}

const Tip: React.FC<TipProps> = ({ text }) => {
  return (
    <div className="flex items-center px-4 py-2 bg-pearlBush rounded-[20px]">
      <img
        src="/assets/tip.png"
        alt="Tip icon"
        className="w-10 h-10 mr-3 object-cover"
      />
      <p className="font-inter text-[14px] font-medium text-left text-black">
        <span className="font-inter font-semibold">Tips: </span>
        {text}
      </p>
    </div>
  );
};

export default Tip;
