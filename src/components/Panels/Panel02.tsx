import React from 'react';
import NavigationButtons from '../NavigationButtons';
import { PanelProps } from './types';
import { useCatForm } from './hooks/useCatForm';

/**
 * Panel02 Component
 * Collects basic information about the user's cat including gender, age, location
 */
const Panel02: React.FC<PanelProps> = ({ nextStep, previousStep }) => {
  const {
    catName,
    setCatName,
    gender,
    setGender,
    age,
    setAge,
    errors,
    handleSubmit,
    isValid
  } = useCatForm(nextStep);

  return (
    <div className="w-full max-w-md lg:max-w-lg p-4 lg:p-6 mx-auto font-inter">
      <header className="text-center mb-6">
        <h1 className="font-bold text-2xl lg:text-3xl mb-2">
          Tell Us About Your Cat
        </h1>
        <p className="text-md text-darkGray mx-12">
          Please provide some basic details about your cat to help us offer the best advice.
        </p>
      </header>

      <div className="space-y-4 mx-10 mb-6">
        {/* Gender Selection */}
        <div className='text-center'>
          <p className="text-md font-medium mb-2">
            Please tell us your cat's name <span className="text-red-500">*</span>
          </p>
          <input
            type='text'
            value={catName || ''}
            onChange={(e) => setCatName(e.target.value)}
            className='w-full lg:w-3/4 border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
            placeholder={'Input your cat\'s name'} />
          {errors.catName && <p className="text-red-500 text-sm">{errors.catName}</p>}
        </div>
        <div className="text-center">
          <p className="text-md font-medium mb-2">
            Select your cat's gender <span className="text-red-500">*</span>
          </p>
          <div className="flex justify-center space-x-3">
            {['Male', 'Female'].map((option) => (
              <button
                key={option}
                className={`w-44 lg:w-32 px-4 lg:px-9 py-2 rounded-full border ${gender === option ? 'bg-primaryBlue text-white' : 'border-gray-300'
                  }`}
                onClick={() => setGender(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        {/* Name & Age Input */}
        <div className="text-center">
          <select
            value={age || ''}
            onChange={(e) => setAge(e.target.value)}
            className='w-full lg:w-3/4 border border-gray-300 bg-white px-4 h-12 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
          >
            <option value="" disabled>
              Select your cat's age
            </option>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} {i + 1 === 1 ? 'year' : 'years'}
              </option>
            ))}
          </select>
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>

      </div>

      <NavigationButtons
        nextStep={handleSubmit}
        previousStep={previousStep}
        isNextDisabled={!isValid}
      />
    </div>
  );
};

export default Panel02;
