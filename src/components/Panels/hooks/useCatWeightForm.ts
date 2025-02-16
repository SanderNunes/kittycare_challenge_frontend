import { useState } from 'react';
import { CatBreed, WeightUnit, WEIGHT_REGEX } from '../constants/catBreeds';

interface CatWeightFormErrors {
  breed: string;
  weight: string;
  unit: string;
  targetWeight: string;
}

interface UseCatWeightFormProps {
  onSubmit: () => void;
}

export const useCatWeightForm = ({ onSubmit }: UseCatWeightFormProps) => {
  const [breed, setBreed] = useState<CatBreed | null>(localStorage.getItem("breed") as CatBreed);
  const [weight, setWeight] = useState<string>(localStorage.getItem("weight") || "");
  const [unit, setUnit] = useState<WeightUnit>(localStorage.getItem("unit") as WeightUnit || "Lbs");
  const [targetWeight, setTargetWeight] = useState<string>(localStorage.getItem("target_weight") || "");
  const [errors, setErrors] = useState<CatWeightFormErrors>({
    breed: "",
    weight: "",
    unit: "",
    targetWeight: "",
  });

  const validateForm = (): boolean => {
    const newErrors = {
      breed: "",
      weight: "",
      unit: "",
      targetWeight: "",
    };
    let isValid = true;

    if (!breed) {
      newErrors.breed = "Please select your cat's breed";
      isValid = false;
    }

    if (!weight || !WEIGHT_REGEX.test(weight) || parseFloat(weight) <= 0) {
      newErrors.weight = "Please enter a valid weight for your cat (e.g., 8.5)";
      isValid = false;
    }

    if (!unit) {
      newErrors.unit = "Please select the weight unit";
      isValid = false;
    }

    // if (!WEIGHT_REGEX.test(targetWeight) || parseFloat(targetWeight) <= 0) {
    //   newErrors.targetWeight = "Please enter a valid target weight (e.g., 8.5)";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem("breed", breed || "");
      localStorage.setItem("weight", weight || "");
      localStorage.setItem("unit", unit || "");
      localStorage.setItem("target_weight", targetWeight || "");

      onSubmit();
    }
  };

  return {
    breed,
    setBreed,
    weight,
    setWeight,
    unit,
    setUnit,
    targetWeight,
    setTargetWeight,
    errors,
    handleSubmit,
    isFormValid: !!breed && !!weight && !!unit
  };
}; 