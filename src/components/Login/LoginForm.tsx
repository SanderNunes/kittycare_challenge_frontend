import { FC, useState } from 'react';
import TextInput from './Input';
import { OTPLoginFormProps } from './types';
import { OTPForm } from '../shared/OTPForm';
import OAuthButtonsContainer from './OauthOptions';
import {jwtDecode} from "jwt-decode";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
// Extended props to include OAuth handlers
export interface EnhancedOTPLoginFormProps extends OTPLoginFormProps {
  handleAppleSignIn?: () => Promise<boolean>;
}

export const LoginForm: FC<EnhancedOTPLoginFormProps> = ({
    error,
    isLoading,
    handleEmailSubmit,
    handleOTPSubmit,
    handleAppleSignIn,
}) => {
    const [email, setEmail] = useState('');
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [otp, setOTP] = useState('');
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

    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow numbers and limit to 6 digits
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setOTP(value);
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
    

    const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
        console.log('fired')
        if (!credentialResponse.credential) {
            console.error("No credential received");
            return;
        }

        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Google User:", decoded);

            // Send token to backend
            const response = await fetch("http://localhost:3000/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });

            if (!response.ok) throw new Error("Login failed");
        } catch (error) {
            console.error("Google login error:", error);
        }
    };
    
    return (
        <div className="w-full">
            {!showOTPInput ? (
                <div className="w-full">
                    <form
                        onSubmit={onEmailSubmit}
                        className="w-full flex flex-col gap-2"
                        noValidate
                        aria-label="Email verification form"
                    >
                        <TextInput
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="name@email.com"
                            className={emailError || error?.email ? 'border-red-500' : ''}
                            onChange={handleEmailChange}
                            error={emailError || error?.email}
                            aria-invalid={!!(emailError || error?.email)}
                        />

                        {error?.general && (
                            <div
                                className="text-red-500 text-base text-center mt-4"
                                role="alert"
                                aria-live="polite"
                            >
                                {error.general}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full h-[55px] mt-6 text-base sm:text-xl 
                                    bg-blue-600 text-white rounded-2xl
                                    hover:bg-blue-700 active:bg-blue-800
                                    disabled:bg-blue-400 disabled:cursor-not-allowed
                                    transition-colors duration-200"
                            disabled={isLoading}
                            aria-busy={isLoading}
                        >
                            {isLoading ? 'Sending code...' : 'Send Login Code'}
                        </button>
                    </form>
                    <OAuthButtonsContainer/>

                </div>
            ) : (
                <OTPForm
                    email={email}
                    isLoading={isLoading}
                    error={error}
                    onOTPSubmit={onOTPSubmit}
                    onOTPChange={handleOTPChange}
                    onBackToEmail={() => setShowOTPInput(false)}
                    handleEmailSubmit={handleEmailSubmit}
                />
            )}
        </div>
    );
};

export default LoginForm;