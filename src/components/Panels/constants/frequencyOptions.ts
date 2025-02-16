import { FrequencyOption } from '../types';

export const FREQUENCY_OPTIONS: FrequencyOption[] = [
  {
    id: 1,
    title: "Daily",
    description: "Stay on top of your cat's health and progress every day.",
    isRecommended: false,
  },
  {
    id: 2,
    title: "3 Times a Week",
    description: "Our recommended frequency to help you keep your cat on track.",
    isRecommended: true,
  },
  {
    id: 3,
    title: "Weekly",
    description: "Get a weekly update on your cat's overall health and care.",
    isRecommended: false,
  },
];

export const LOCAL_STORAGE_KEY = 'check_in_period'; 