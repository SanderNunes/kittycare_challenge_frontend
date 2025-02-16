export const BREED_OPTIONS = [
  "Domestic shorthair",
  "Domestic longhair",
  "Maine coon",
  "Siamese",
  "Persian",
  "Bengal",
  "Other/Unkown",
] as const;

export const GENDER_OPTIONS = ["Male", "Female"] as const;

export const INITIAL_PROFILE_STATE = {
  name: "",
  breed: "",
  gender: "",
  target_weight: "",
  medical_history: "",
  dietary_restrictions: "",
}; 