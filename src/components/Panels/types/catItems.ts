export interface CatItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Panel12Props {
  nextStep: () => void;
  previousStep: () => void;
} 