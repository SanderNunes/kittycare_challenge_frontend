import { useState, useEffect } from 'react';
import { TRAINING_DAYS_KEY } from '../constants/dayOptions';

export const useDaySelection = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  useEffect(() => {
    const storedDays = localStorage.getItem(TRAINING_DAYS_KEY);
    if (storedDays) {
      setSelectedDays(JSON.parse(storedDays));
    }
  }, []);

  const handleDaySelect = (day: string) => {
    setSelectedDays((prevSelectedDays) => {
      const newSelectedDays = prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevSelectedDays, day];

      localStorage.setItem(TRAINING_DAYS_KEY, JSON.stringify(newSelectedDays));
      return newSelectedDays;
    });
  };

  return {
    selectedDays,
    handleDaySelect,
  };
}; 