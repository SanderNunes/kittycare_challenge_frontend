import React, { useEffect, useRef } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

/**
 * Configuration for the Rive animation
 */
const RIVE_CONFIG = {
  src: '/assets/riv-files/loadingbar_V5.riv',
  stateMachines: 'State Machine 1',
  autoplay: true,
} as const;

/**
 * Props interface for the ProgressBar component
 */
interface ProgressBarProps {
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Current step in the progress (0-100) */
  currentStep: number;
  /** Optional callback when progress changes */
  onProgressChange?: (progress: number) => void;
}

/**
 * ProgressBar component that displays animated progress using Rive animation
 * @param props ProgressBarProps
 * @returns JSX.Element
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  className = '',
  currentStep,
  onProgressChange,
}) => {
  const progressRef = useRef<number>(0);

  // Initialize Rive animation
  const { RiveComponent, rive } = useRive(RIVE_CONFIG);

  // Get progress input from state machine
  const progressInput = useStateMachineInput(
    rive,
    RIVE_CONFIG.stateMachines,
    'Progress'
  );

  useEffect(() => {
    if (!progressInput || !rive) return;

    try {
      progressInput.value = currentStep;
      progressRef.current = currentStep;

      rive.play();
      onProgressChange?.(currentStep);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }, [currentStep, progressInput, rive, onProgressChange]);

  return (
    <div className={`progress-bar-wrapper ${className}`.trim()}>
      <div
        className="
          w-full 
          rive-container 
          md:w-[750px] 
          h-20 
          md:h-[28] 
          relative
        "
      >
        {RiveComponent ? (
          <RiveComponent />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading animation...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProgressBar);
