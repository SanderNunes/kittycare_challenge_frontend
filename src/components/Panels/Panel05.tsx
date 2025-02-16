import React from "react";
import { useMedicalHistory } from "./hooks/useMedicalHistory";
import NavigationButtons from "../NavigationButtons";
import { Panel05Props } from "../../types/panel.types";
import { MEDICAL_CONDITIONS } from "./constants/medicalConditions";

const Panel05: React.FC<Panel05Props> = ({ nextStep, previousStep }) => {
  const { formData, updateFormField, isFormValid } = useMedicalHistory();

  const renderFormField = (
    label: string,
    placeholder: string,
    field: keyof typeof formData
  ) => (
    <div className="text-center">
      <label className="block text-sm font-medium mb-0.5">{label}</label>
      <input
        type="text"
        value={formData[field] || ''}
        onChange={(e) => updateFormField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full font-inter border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-primaryBlue placeholder:text-xs md:placeholder:text-sm text-sm placeholder:text-mediumGray"
      />
    </div>
  );

  return (
    <div className="w-full max-w-md lg:max-w-2xl mx-auto p-4 lg:p-6 font-inter">
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl mb-2 mx-4 md:mx-2 px-3 lg:px-0 md:px-0">
          Tell Our Experts About Your Cat's Medical History

        </h1>
        <p className="text-sm lg:text-md text-darkGray mx-4 px-4 lg:px-8">
          Let our experts know about any medical conditions or special needs your cat has so we can provide you with the best advice.
        </p>
      </div>

      <div className="space-y-4 px-8 lg:px-40">
        <div className="text-center">
          <label className="block text-sm font-medium mb-0.5">
            Medical Conditions
          </label>
          <select
            value={formData.medicalCondition || ""}
            onChange={(e) => updateFormField("medicalCondition", e.target.value)}
            className="w-full font-inter border border-gray-300 px-4 py-2 rounded-full capitalize focus:outline-none focus:border-primaryBlue placeholder:text-xs md:placeholder:text-sm text-sm placeholder:text-mediumGray"
          >
            <option value="" disabled className="bg-lightWhite text-sm">
              Select a condition
            </option>
            {MEDICAL_CONDITIONS.map((condition) => (
              <option
                key={condition}
                value={condition}
                className="bg-lightWhite text-sm capitalize"
              >
                {condition}
              </option>
            ))}
          </select>
        </div>
        {/* {renderFormField("Medical Conditions", "Enter current medical conditions", "medicalCondition")} */}
        {renderFormField("Medications", "Enter current medication", "medication")}
        {renderFormField("Dietary Restrictions", "Enter food allergies", "dietaryRestrictions")}
        {renderFormField("Surgery History", "Enter recent surgeries", "surgeryHistory")}
      </div>

      {/* <div className="flex flex-col items-center mt-8 text-center">
        <p className="text-sm text-darkGray mt-4 font-light px-8 md:mx-12 lg:mx-36">
          If your cat has no medical history, you can{" "}
          <span className="text-primaryBlue cursor-pointer" onClick={nextStep}>
            skip this step
          </span>
        </p>
      </div> */}
      <div className="flex md:mx-7 justify-center px-8 lg:px-40 items-center mt-6 md:mb-6">
        <button className="bg-primaryBlue mx-auto text-white hover:bg-opacity-90 w-full h-[55px] md:h-[40px] rounded-2xl" onClick={nextStep}>
          Skip Step
        </button>
      </div>

      <NavigationButtons
        nextStep={nextStep}
        previousStep={previousStep}
        isNextDisabled={!isFormValid()}
      />
    </div>
  );
};

export default Panel05;
