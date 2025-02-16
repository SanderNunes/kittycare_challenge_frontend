import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/hooks';
import { loginUserAsync } from '../Redux/features/userSlice';
import { setLoading } from '../store/ui/actions';

interface LoginFormState {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email: string;
  password: string;
  general: string;
}

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);

  const [userInfo, setUserInfo] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<LoginFormErrors>({
    email: '',
    password: '',
    general: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '', general: '' });
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...error };

    if (!userInfo.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!userInfo.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(setLoading(true));
    setIsLoading(true);

    try {
      await dispatch(loginUserAsync(userInfo)).unwrap();
      handleSuccessfulLogin();
    } catch (err: any) {
      setError({
        ...error,
        general: err || 'Login failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleSuccessfulLogin = () => {
    setUserInfo({ email: '', password: '' });
    setError({ email: '', password: '', general: '' });

    const token = localStorage.getItem('token');
    if (!token) return;

    const subscriptionId = localStorage.getItem('subscriptionId');
    const catId = localStorage.getItem('catId');

    if (!subscriptionId || subscriptionId === 'undefined') {
      navigate('/priceselection?' + urlParams.toString());
    } else if (!catId || catId === 'undefined') {
      navigate('/progress');
    } else {
      navigate('/cat-assistant');
    }
  };

  return {
    userInfo,
    error,
    isLoading,
    handleChange,
    handleSubmit,
  };
}; 