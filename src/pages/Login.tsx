import { useState } from 'react';
import { LoginForm } from '../components/Login/LoginForm';
import Layout from '../components/Layout';
import { changeMethod } from '../Redux/features/billingSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '../Redux/hooks';
import ReactPixel from 'react-facebook-pixel';
import { useNavigate } from 'react-router-dom';
import { signInWithOTPAPI } from '../services/api';
import { loginUserWithOTPAsync } from '../Redux/features/userSlice';
import { useRive, UseRiveParameters } from '@rive-app/react-canvas';
import styles from '../components/LoadingOverlay/LoadingOverlay.module.css';

interface LoginError {
  email?: string;
  otp?: string;
  general?: string;
}

const RIVE_ANIMATION_CONFIG: UseRiveParameters = {
  src: 'riv/V2/Pulse_kitty.riv',
  autoplay: true,
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<LoginError>({});
  const [isLoading, setIsLoading] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);

  // Handle plan selection from URL
  useEffect(() => {
    ReactPixel.track('ViewContent');

    const planSelection = urlParams.get('planSelection');
    if (planSelection) {
      const isYearly = planSelection.toLowerCase() === "yearly";
      dispatch(changeMethod({ method: isYearly }));
    }
  }, [dispatch, urlParams]);

  const handleEmailSubmit = async (email: string) => {
    setError({});
    setIsLoading(true);

    try {
      await signInWithOTPAPI(email);
      return true;
    } catch (err: any) {
      if (err.message === "Signups not allowed for otp") {
        setError({
          general: "User not found"
        });
        return false;
      }
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
      await dispatch(loginUserWithOTPAsync({ email, token })).unwrap();

      // Check for subscription and redirect accordingly
      const subscriptionId = localStorage.getItem("subscriptionId");
      if (!subscriptionId || subscriptionId === "undefined") {
        navigate(`/progress?${urlParams.toString()}`);
        return;
      }

      // Check for cat profile
      const catId = localStorage.getItem("catId");
      if (!catId || catId === "undefined") {
        navigate('/progress');
        return;
      }

      // If everything exists, redirect to chat
      navigate('/cat-assistant');

    } catch (err: any) {
      setError({
        general: err.message || 'Invalid verification code'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { RiveComponent } = useRive(RIVE_ANIMATION_CONFIG);
  const isPhone = window.innerWidth < 768;

  return (
    <Layout>
      <div className={`m-auto sm:w-[600px] max-w-[90%] px-[21px] sm:px-[80px] bg-white border-2 rounded-3xl border-[#B8B8B8] mt-8 ${isPhone ? 'py-[47px] sm:py-[70px] ' : 'pb-[47px] sm:pb-[70px]'}`}>
        {!isPhone && <div className={`${styles.animationContainer} mx-auto h-[200px]`}>
          {RiveComponent && <RiveComponent />}
        </div>}
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
              Login
            </h2>
            <p className='font-semibold text-gray-500 text-md md:text-xl'>Haven't made an account yet? <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/progress')}>Sign Up now.</span></p>
          </div>

          <LoginForm
            error={error}
            isLoading={isLoading}
            handleEmailSubmit={handleEmailSubmit}
            handleOTPSubmit={handleOTPSubmit}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Login;

