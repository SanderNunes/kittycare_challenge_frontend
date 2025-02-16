import { useState, useEffect } from 'react';
import { MedicalHistoryForm } from '../../../types/panel.types';

export const useMedicalHistory = () => {
  const [formData, setFormData] = useState<MedicalHistoryForm>({
    medicalCondition: null,
    medication: '',
    dietaryRestrictions: '',
    surgeryHistory: '',
  });

  useEffect(() => {
    const storedMedicalCondition = localStorage.getItem("medical_conditions");
    const storedMedication = localStorage.getItem("medications");
    const storedDietaryRestrictions = localStorage.getItem("dietary_restrictions");
    const storedSurgeryHistory = localStorage.getItem("medical_history");

    setFormData({
      medicalCondition: storedMedicalCondition,
      medication: storedMedication || '',
      dietaryRestrictions: storedDietaryRestrictions || '',
      surgeryHistory: storedSurgeryHistory || '',
    });
  }, []);

  const updateFormField = (field: keyof MedicalHistoryForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Map form fields to localStorage keys
    const storageKeys = {
      medicalCondition: 'medical_conditions',
      medication: 'medications',
      dietaryRestrictions: 'dietary_restrictions',
      surgeryHistory: 'medical_history',
    };
    
    localStorage.setItem(storageKeys[field], value);
  };

  const isFormValid = (): boolean => {
    return Boolean(
      formData.medicalCondition
    );
  };

  return {
    formData,
    updateFormField,
    isFormValid,
  };
}; 