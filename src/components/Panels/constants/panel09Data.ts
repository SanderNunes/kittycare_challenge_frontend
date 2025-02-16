export interface ActivityLevel {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const ACTIVITY_LEVELS: ActivityLevel[] = [
  {
    id: 1,
    title: "Very Active",
    description: "My cat is always on the move, running, jumping, and playing throughout the day.",
    image: "/assets/veryActive.png",
  },
  {
    id: 2,
    title: "Active",
    description: "My cat has regular bursts of energy and enjoys playing several times a day.",
    image: "/assets/Active.png",
  },
  {
    id: 3,
    title: "Moderately Active",
    description: "My cat plays occasionally and likes to explore but also spends a lot of time resting.",
    image: "/assets/moderatelyActive.png",
  },
  {
    id: 4,
    title: "Mostly Inactive",
    description: "My cat prefers lounging around and only plays occasionally.",
    image: "/assets/mostlyInactive.png",
  },
  {
    id: 5,
    title: "Very Inactive",
    description: "My cat rarely engages in play or activity and spends most of the time sleeping or resting.",
    image: "/assets/veryInactive.png",
  },
];

export const STORAGE_KEY = 'activity_level'; 