import React from "react";
import { CAT_BREEDS, CatBreed, WeightUnit } from "./constants/catBreeds";
import { useCatWeightForm } from "./hooks/useCatWeightForm";
import NavigationButtons from "../NavigationButtons";

interface Panel04Props {
  nextStep: () => void;
  previousStep: () => void;
}

interface BreedSelectProps {
  breed: CatBreed | null;
  setBreed: (breed: CatBreed) => void;
  error: string;
}

const BreedSelect: React.FC<BreedSelectProps> = ({ breed, setBreed, error }) => (
  <div className="text-center">
    <p className="text-md font-medium mb-2">
      What breed is your cat? <span className="text-red-500">*</span>
    </p>
    <div className="relative inline-block w-full">
      <select
        value={breed ?? ""}
        onChange={(e) => setBreed(e.target.value as CatBreed)}
        className='w-full lg:w-3/4 border border-gray-300 bg-white px-4 h-12 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
      >
        <option value="" disabled>Select breed</option>
        {CAT_BREEDS.map((b) => (
          <option key={b} value={b} className="bg-gray-100 hover:bg-gray-200">
            {b}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  </div>
);

interface WeightInputProps {
  weight: string;
  setWeight: (weight: string) => void;
  unit: WeightUnit;
  setUnit: (unit: WeightUnit) => void;
  errors: { weight: string; unit: string; };
}

const WeightInput: React.FC<WeightInputProps> = ({
  weight,
  setWeight,
  errors,
}) => (
  <div className="text-center">
    <p className="text-md font-medium mb-2">
      Weight of your cat? <span className="text-red-500">*</span>
    </p>
    <div className="flex justify-center items-center space-x-4 lg:space-x-0 lg:gap-2">
      <select
        value={weight || ''}
        onChange={(e) => setWeight(e.target.value)}
        className='w-full lg:w-3/4 border border-gray-300 bg-white px-4 h-12 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
      >
        <option value="" disabled>
          Select weight
        </option>
        {Array.from({ length: 40 }, (_, i) => {
          const weightValue = (i + 1) * 0.5; // Increment by 0.5
          return (
            <option key={weightValue} value={weightValue}>
              {weightValue} lbs / {(weightValue * 0.453592).toFixed(1)} Kg
            </option>
          );
        })}
      </select>
    </div>
    {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
  </div>
);


interface TargetWeightInputProps {
  targetWeight: string;
  setTargetWeight: (weight: string) => void;
  error: string;
}

const TargetWeightInput: React.FC<TargetWeightInputProps> = ({
  targetWeight,
  setTargetWeight,
  error,
}) => (
  <div className="text-center">
    <p className="text-md font-medium mb-2">
      Target Weight <span className="text-red-500">*</span>
    </p>
    <select
      value={targetWeight || ''}
      onChange={(e) => setTargetWeight(e.target.value)}
      className='w-full lg:w-3/4 border border-gray-300 bg-white px-4 h-12 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
    >
      <option value="" disabled>
        Select target weight
      </option>
      {Array.from({ length: 40 }, (_, i) => {
        const weightValue = (i + 1) * 0.5; // Increment by 0.5
        return (
          <option key={weightValue} value={weightValue}>
            {weightValue} lbs / {(weightValue * 0.453592).toFixed(1)} Kg
          </option>
        );
      })}
    </select>
    <p className="text-xs text-mediumGray mt-2 px-6 md:px-8">
      Tip: If you're unsure, we can help determine the ideal weight based
      on breed and activity level. Example: 8.5 lbs or 3.6 Kg
    </p>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const Panel04: React.FC<Panel04Props> = ({ nextStep, previousStep }) => {
  const {
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
    isFormValid,
  } = useCatWeightForm({ onSubmit: nextStep });

  return (
    <div className="w-full max-w-md lg:max-w-lg p-4 lg:p-6 mx-auto">
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl lg:text-3xl mb-2">
          Tell Us More About Your Cat's Breed and Weight
        </h1>
        <p className="text-md text-darkGray mx-6">
          To better understand your cat's needs, please share their breed,
          current weight, and target weight.
        </p>
      </div>

      <div className="space-y-4 mx-6 mb-6">
        <BreedSelect breed={breed} setBreed={setBreed} error={errors.breed} />
        <WeightInput
          weight={weight}
          setWeight={setWeight}
          unit={unit}
          setUnit={setUnit}
          errors={{ weight: errors.weight, unit: errors.unit }}
        />
        <TargetWeightInput
          targetWeight={targetWeight}
          setTargetWeight={setTargetWeight}
          error={errors.targetWeight}
        />
      </div>

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={!isFormValid}
      />
    </div>
  );
};

export default Panel04;
