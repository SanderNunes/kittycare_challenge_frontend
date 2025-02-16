import { useRef, useCallback } from 'react';
import { useAppDispatch } from '../Redux/hooks';
import { createCatAsync } from '../Redux/features/catsSlice';
import { collectFormData } from '../utils/auth';

const useCreateCat = () => {
  const dispatch = useAppDispatch();
  const hasDispatchedRef = useRef(false);

  const createCat = useCallback(async () => {
    if (hasDispatchedRef.current) return;
    hasDispatchedRef.current = true;

    try {
      const formData = collectFormData();
      await dispatch(createCatAsync(formData)).unwrap();
      return true;
    } catch (error) {
      console.error('Failed to create cat:', error);
      return false;
    }
  }, [dispatch]);

  return { createCat };
};

export default useCreateCat; 