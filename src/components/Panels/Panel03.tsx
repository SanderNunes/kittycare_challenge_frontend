import React, { useEffect, useState } from "react";
import { useRive, UseRiveParameters } from '@rive-app/react-canvas';

import { TermsCheckbox } from "../Signup";
import styles from '../../components/LoadingOverlay/LoadingOverlay.module.css';
import { useSignupForm } from "../../hooks/useSignupForm";
import { OTPForm } from "../shared/OTPForm";

interface Panel03Props {
  previousStep: () => void;
  nextStep: () => void;
}

const RIVE_ANIMATION_CONFIG: UseRiveParameters = {
  src: 'riv/V2/Pulse_kitty.riv',
  autoplay: true,
};

const Panel03: React.FC<Panel03Props> = ({ previousStep, nextStep }) => {
  const { RiveComponent } = useRive(RIVE_ANIMATION_CONFIG);

  const {
    error,
    isLoading,
    checked,
    setChecked,
    handleChange,
    handleEmailSubmit,
    handleOTPSubmit,
  } = useSignupForm();

  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail) {
      validateEmail(newEmail);
    } else {
      setEmailError('');
    }
  };

  const onEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }
    const success = await handleEmailSubmit(email);
    if (success) {
      setShowOTPInput(true);
    }
  };

  const onOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleOTPSubmit(email, otp);
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 6 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOTP(value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) nextStep();
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className={styles.overlay}
          role="alert"
          aria-busy="true"
          aria-label="Loading content"
        >
          <div className={styles.animationContainer}>
            {RiveComponent && <RiveComponent />}
          </div>
        </div>
      ) : (
        <div className="w-full md:max-w-lg p-6 rounded-md mx-auto">
          <header className="text-center mb-8">
            <h1 className="font-bold text-2xl lg:text-3xl mb-2">
              Tell Us About You
            </h1>
            <p className="text-sm text-darkGray max-w-2xl mx-auto">
              Please provide some basic details about you so we can best help you.
            </p>
          </header>
          {
            !showOTPInput ? (
              <form onSubmit={onEmailSubmit}>
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex justify-between gap-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-base sm:text-xl font-bold sm:font-medium ml-2">First Name</label>
                      <input
                        type='text'
                        name="first_name"
                        className='w-full border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
                        placeholder={'First name'}
                        onChange={handleChange} />
                      {error && (
                        <div
                          id={`${name}-error`}
                          className="text-red-500 text-base text-center ms-6 -mt-[6px] relative"
                          role="alert"
                        >
                          {error.first_name}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-base sm:text-xl font-bold sm:font-medium ml-2">Last Name</label>
                      <input
                        type='text'
                        name="last_name"
                        className='w-full border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
                        placeholder={'Last name'}
                        onChange={handleChange} />
                      {error && (
                        <div
                          id={`${name}-error`}
                          className="text-red-500 text-base text-center ms-6 -mt-[6px] relative"
                          role="alert"
                        >
                          {error.last_name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-base sm:text-xl font-bold sm:font-medium ml-2">Email</label>
                    <input
                      type='email'
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      className='w-full border border-gray-300 px-4 py-2 rounded-full focus:border-primaryBlue focus:outline-none placeholder:text-sm'
                      placeholder={'Email'}
                      required />
                    {(emailError || error?.email) && (
                      <div
                        className="text-red-500 text-base text-center ms-6 -mt-[6px] relative"
                        role="alert"
                      >
                        {emailError || error?.email}
                      </div>
                    )}
                  </div>
                  <div className="px-2">
                    <TermsCheckbox checked={checked} setChecked={setChecked} />
                    {error && (
                      <div
                        id={`${name}-error`}
                        className="text-red-500 text-base text-center ms-6 -mt-[6px] relative"
                        role="alert"
                      >
                        {error.general}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-2 md:gap-4 mx-8 md:mx-0 md:flex-row justify-center items-center mt-6 space-y-4 md:space-y-0">
                  <button
                    onClick={previousStep}
                    className="w-full h-[55px] md:w-[115px] md:h-[40px] rounded-2xl bg-transparent text-mediumGray border border-mediumGray hover:text-white hover:border-none hover:bg-primaryBlue"
                    aria-label="Go to previous step"
                  >
                    <span aria-hidden="true">{"<"}</span> Back
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading || !checked}
                    className="w-full h-[55px] md:w-[115px] md:h-[40px] rounded-2xl bg-primaryBlue text-white hover:bg-opacity-90 disabled:bg-lightGray disabled:text-mediumGray disabled:cursor-not-allowed "
                    aria-label="Go to next step"
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            ) : (
              <OTPForm
                email={email}
                isLoading={isLoading}
                error={error}
                onOTPSubmit={onOTPSubmit}
                onOTPChange={handleOTPChange}
                onBackToEmail={() => setShowOTPInput(false)}
              />
            )
          }

        </div>
      )}
    </>
  );
};

export default Panel03;
