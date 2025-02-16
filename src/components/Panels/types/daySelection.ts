export interface DayOption {
  id: number;
  day: string;
}

export interface DaySelectionPanelProps {
  nextStep: () => void;
  previousStep: () => void;
} 