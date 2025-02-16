import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';
import { useMediaQuery } from 'react-responsive';

import { useAppDispatch } from "../Redux/hooks";
import { changeMethod } from "../Redux/features/billingSlice";

// Components
import Layout from "../components/Layout";
import { SignupHeader } from "../components/Signup/SignupHeader";
import SignupForm from "../components/Signup/SignupForm";
import Payroll from "../components/Payroll";

// Hooks
import { useSignupForm } from "../hooks/useSignupForm";


export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const [isShowPaywall, setIsShowPaywall] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const {
    error,
    isLoading,
    checked,
    setChecked,
    handleChange,
    handleEmailSubmit,
    handleOTPSubmit,
  } = useSignupForm();

  // Handle plan selection from URL
  useEffect(() => {
    ReactPixel.track('ViewContent');

    const planSelection = urlParams.get('planSelection');
    if (planSelection) {
      const isYearly = planSelection.toLowerCase() === "yearly";
      dispatch(changeMethod({ method: isYearly }));
    }
  }, [dispatch, urlParams]);

  // useEffect(() => {
  //   const catId = localStorage.getItem("catId");

  //   if (!catId) {
  //     navigate('/progress')
  //     return;
  //   }
  // }, [])

  // Handle authentication and navigation
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // const subscriptionId = localStorage.getItem("subscriptionId");

    // if (!subscriptionId || subscriptionId === "undefined") {
    //   navigate(`/priceselectionV2?${urlParams.toString()}`);
    // } else {
    navigate("/progress");
    // }
  }, [navigate, urlParams]);

  useEffect(() => {
    if (isMobile) {
      const layoutBackground = document.querySelector('[data-testid="layout-background"]') as HTMLElement;

      if (layoutBackground) {
        const images = layoutBackground.querySelectorAll<HTMLImageElement>('img');

        images.forEach((img) => {
          img.style.display = 'none'; // Hides the element completely
        });
      }
    }
  }, [isMobile]);

  const handleClickPaywall = () => {
    setIsShowPaywall(false);
    if (isMobile) {
      const layoutBackground = document.querySelector('[data-testid="layout-background"]') as HTMLElement;

      if (layoutBackground) {
        const images = layoutBackground.querySelectorAll<HTMLImageElement>('img');

        images.forEach((img) => {
          img.style.display = 'block'; // Hides the element completely
        });
      }
    }
  };

  return (
    <Layout>
      {isShowPaywall && isMobile ? (
        <Payroll handleClickPaywall={handleClickPaywall} />
      ) : (
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between max-w-[1200px] m-auto gap-6 sm:gap-[140px]">
            <div className="m-auto w-full sm:m-0">
              <div className="max-w-[90%] m-auto px-[21px] py-[47px] sm:w-[610px] sm:px-[104px] sm:py-[40px] h-auto bg-white border-2 rounded-3xl border-[#B8B8B8]">
                <div className="w-full sm:w-full m-auto h-full flex flex-col items-center justify-between">
                  <SignupHeader urlParams={urlParams} />
                  <SignupForm
                    error={error}
                    isLoading={isLoading}
                    checked={checked}
                    setChecked={setChecked}
                    handleChange={handleChange}
                    handleEmailSubmit={handleEmailSubmit}
                    handleOTPSubmit={handleOTPSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Signup;
