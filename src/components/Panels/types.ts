import { WEIGHT_UNITS, CAT_BREEDS } from './constants';

export type WeightUnit = typeof WEIGHT_UNITS[keyof typeof WEIGHT_UNITS];
export type CatBreed = typeof CAT_BREEDS[number];

export interface CatWeightFormData {
  breed: CatBreed | null;
  weight: string;
  unit: WeightUnit | null;
  targetWeight: string;
}

export interface CatWeightFormErrors {
  breed: string;
  weight: string;
  unit: string;
  targetWeight: string;
}

export interface CatFormData {
  gender: string | null;
  age: string;
}

export interface FormErrors {
  gender: string;
  age: string;
}

export interface PanelProps {
  nextStep: () => void;
  previousStep: () => void;
}

export interface FrequencyOption {
  id: number;
  title: string;
  description: string;
  isRecommended: boolean;
}

export interface Panel10Props {
  nextStep: () => void;
  previousStep: () => void;
} 