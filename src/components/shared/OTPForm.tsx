import { FC, useState, useEffect } from 'react';
import TextInput from '../Login/Input';

interface OTPFormProps {
    email: string;
    isLoading: boolean;
    error?: {
        otp?: string;
        general?: string;
    };
    onOTPSubmit: (e: React.FormEvent) => void;
    onOTPChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBackToEmail: () => void;
    handleEmailSubmit?: (email: string) => Promise<boolean>;
}

export const OTPForm: FC<OTPFormProps> = ({
    email,
    isLoading,
    error,
    onOTPSubmit,
    onOTPChange,
    onBackToEmail,
    handleEmailSubmit
}) => {
    const [resendDisabled, setResendDisabled] = useState(true);
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setResendDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleResendOTP = async () => {
        if (!handleEmailSubmit || resendDisabled) return;

        try {
            const success = await handleEmailSubmit(email);
            if (success) {
                setResendDisabled(true);
                setCountdown(30);
            }
        } catch (error) {
            console.error('Failed to resend OTP:', error);
        }
    };

    return (
        <form
            onSubmit={onOTPSubmit}
            className="w-full flex flex-col gap-2"
            noValidate
            aria-label="OTP verification form"
        >
            <div className="text-center mb-4">
                <p className="text-gray-600">Enter the 6-digit code sent to</p>
                <p className="font-medium">{email}</p>
            </div>

            <TextInput
                name="otp"
                label="Verification Code"
                type="text"
                placeholder="Enter 6-digit code"
                className={error?.otp ? 'border-red-500' : ''}
                onChange={onOTPChange}
                error={error?.otp}
                aria-invalid={!!error?.otp}
                maxLength={6}
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
                {isLoading ? 'Verifying...' : 'Verify code'}
            </button>

            <div className="flex flex-col items-center gap-2 mt-4">
                {handleEmailSubmit && (
                    <button
                        type="button"
                        onClick={handleResendOTP}
                        className={`text-blue-600 hover:text-blue-700 ${resendDisabled ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                        disabled={resendDisabled}
                    >
                        {resendDisabled
                            ? `Resend code in ${countdown}s`
                            : 'Resend code'}
                    </button>
                )}

                <button
                    type="button"
                    onClick={onBackToEmail}
                    className="text-blue-600 hover:text-blue-700"
                >
                    Use different email
                </button>
            </div>
        </form>
    );
};