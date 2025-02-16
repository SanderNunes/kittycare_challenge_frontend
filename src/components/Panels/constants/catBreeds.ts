export const CAT_BREEDS = [
  "Domestic Shorthair",
  "Persian",
  "Maine Coon",
  "Siamese",
  "Ragdoll",
  "Bengal",
  "British Shorthair",
  "Sphynx",
  "American Shorthair",
  "Other",

] as const;

export type CatBreed = (typeof CAT_BREEDS)[number];

export type WeightUnit = "Kg" | "Lbs";

export const WEIGHT_REGEX = /^\d+(\.\d{1,2})?$/; 