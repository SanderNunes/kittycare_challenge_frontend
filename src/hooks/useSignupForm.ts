import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/hooks';
import { signUpUserWithOTPAsync } from '../Redux/features/userSlice';
import { validateUserInfo } from '../utils/validation';
import { setLoading } from '../store/ui/actions';
import { createCatAsync } from '../Redux/features/catsSlice';
import { collectFormData } from '../utils/auth';
import { signUpWithOTPAPI } from '../services/api';

export interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  otp: string;
}

export interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  general?: string;
  otp?: string;
  password?: string;
}

const initialUserInfo: UserInfo = {
  first_name: "",
  last_name: "",
  email: "",
  otp: "",
};

const initialErrors: FormErrors = {};

export const useSignupForm = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [error, setError] = useState<FormErrors>(initialErrors);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const urlParams = new URLSearchParams(window.location.search);

  const validateForm = () => {
    const { isValid, errors } = validateUserInfo(userInfo, checked);
    setError(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
    setError(prev => {
      const newErrors = { ...prev };
      delete newErrors[name as keyof FormErrors];
      delete newErrors.general;
      return newErrors;
    });
    if(value === "") return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(setLoading(true));
    setIsLoading(true);

    try {
      await dispatch(signUpUserWithOTPAsync({
        ...userInfo,
        first_name: userInfo.first_name.trim(),
        last_name: userInfo.last_name.trim(),
        email: userInfo.email.trim(),
      })).unwrap();

      if (localStorage.getItem("catId")) {
        const formData = collectFormData();
        await dispatch(createCatAsync(formData)).unwrap();
      }

      setUserInfo(initialUserInfo);
      setError(initialErrors);
      navigate('/');
      // navigate('/priceselection?' + urlParams.toString());
    } catch (err: any) {
      setError(prev => ({
        ...prev,
        general: err || "Signup failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleEmailSubmit = async (email: string) => {
    setError({});
    setIsLoading(true);

    try {
      await signUpWithOTPAPI({
        first_name: userInfo.first_name.trim(),
        last_name: userInfo.last_name.trim(),
        email: email.trim(),
      });
      return true;
    } catch (err: any) {
      setError({
        general: err.message || 'Failed to send verification code'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (email: string, token: string) => {
    setError({});
    setIsLoading(true);

    try {
      await dispatch(signUpUserWithOTPAsync({ email, first_name: userInfo.first_name.trim(), last_name: userInfo.last_name.trim(), token: token })).unwrap();

      if (localStorage.getItem("catId")) {
        const formData = collectFormData();
        await dispatch(createCatAsync(formData)).unwrap();
      }

      navigate(`/progress?step=4`);
    } catch (err: any) {
      setError({
        general: err.message || 'Invalid verification code'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userInfo,
    error,
    isLoading,
    checked,
    setChecked,
    handleChange,
    handleSubmit,
    handleEmailSubmit,
    handleOTPSubmit,
  };
}; 