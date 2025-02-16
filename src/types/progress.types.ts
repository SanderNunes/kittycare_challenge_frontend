export interface ProgressBarProps {
  className?: string;
  currentStep: number;
  onProgressChange?: (progress: number) => void;
} 