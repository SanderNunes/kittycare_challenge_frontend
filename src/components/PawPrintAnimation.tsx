import React, { useEffect } from 'react';
import { useRive, UseRiveParameters } from '@rive-app/react-canvas';

// Constants
const RIVE_ANIMATION_PATH = '/assets/riv-files/Pawprints_kitty.riv';
const STATE_MACHINE_NAME = 'State Machine 1';

// Props interface
interface PawAnimationProps {
  className?: string;
  onError?: (error: Error) => void;
}

/**
 * PawAnimation Component
 * Renders a Rive animation of paw prints using the provided animation file.
 * 
 * @param {PawAnimationProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const PawAnimation: React.FC<PawAnimationProps> = ({
  className,
  onError
}) => {
  // Rive animation configuration
  const riveParams: UseRiveParameters = {
    src: RIVE_ANIMATION_PATH,
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true
  };

  const { RiveComponent, rive } = useRive(riveParams);

  // Start animation when component mounts
  useEffect(() => {
    if (rive) {
      try {
        rive.play();
      } catch (error) {
        console.error('Failed to play animation:', error);
        onError?.(error as Error);
      }
    }
  }, [rive, onError]);

  // Render loading state or animation
  if (!RiveComponent) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-gray-600">Loading animation...</p>
      </div>
    );
  }

  return <RiveComponent className={className} />;
};

export default React.memo(PawAnimation);
