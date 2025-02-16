import { useState, useEffect } from 'react';
import { FREQUENCY_OPTIONS, LOCAL_STORAGE_KEY } from '../constants/frequencyOptions';

export const useFrequencySelection = () => {
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(2);

  useEffect(() => {
    const storedFrequency = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedFrequency) {
      const foundOption = FREQUENCY_OPTIONS.find(
        (option) => option.title === storedFrequency
      );
      if (foundOption) {
        setSelectedFrequency(foundOption.id);
      }
    }
  }, []);

  const handleCardSelect = (id: number) => {
    setSelectedFrequency(id);
    const selectedOption = FREQUENCY_OPTIONS.find((option) => option.id === id);
    if (selectedOption) {
      localStorage.setItem(LOCAL_STORAGE_KEY, selectedOption.title);
    }
  };

  return {
    selectedFrequency,
    handleCardSelect,
  };
}; 