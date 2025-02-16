export interface PanelDescription {
  id: number;
  title: string;
  description: string;
}

export const PANEL_DATA: PanelDescription[] = [
  {
    id: 0,
    title: "We Understand, Cats Can Be Quite a Handful!",
    description:
      "Scratching the furniture? Ignoring commands? Feeling anxious? We know how challenging these behaviors can be, but don't worry! With some dedicated training and a little patience, you can help your cat feel more relaxed and stop damaging your home.",
  },
  // ... rest of the data
];

export const ANIMATION_INTERVAL = 3000; // 3 seconds
export const RIVE_ANIMATION_VALUE = 1; 