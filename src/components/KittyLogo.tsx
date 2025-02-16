import React, { FC } from "react";
import RiveAnimation from "./RiveAnimation";

interface KittyLogoProps {
  className?: string;
}

const KittyLogo: FC<KittyLogoProps> = () => {
  return (
    <RiveAnimation
      src="/riv/V2/Logo_Kitty.riv"
      autoplay={true}
      stateMachines="State Machine 1"
    />
  );
};

// Add memoization to prevent unnecessary re-renders
export default React.memo(KittyLogo);
