import { useEffect, useRef } from 'react';
// import { LOCAL_STORAGE_KEYS } from '../constants';

export const useLocalStorageCleanup = () => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    console.log("Clean local storage...");
    // LOCAL_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    localStorage.clear();
  }, []);
}; 