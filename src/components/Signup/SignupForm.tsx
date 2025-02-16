import { useState } from 'react';
import TextInput from '../Login/Input';
import { TermsCheckbox } from '../Signup/TermsCheckbox';
import { FormErrors } from '../../hooks/useSignupForm';
import { OTPForm } from '../shared/OTPForm';

interface SignupFormProps {
    error: FormErrors;
    isLoading: boolean;
    checked: boolean;
    setChecked: (checked: boolean) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEmailSubmit: (email: string) => Promise<boolean>;
    handleOTPSubmit: (email: string, otp: string) => Promise<void>;
}

const SignupForm: React.FC<SignupFormProps> = ({
    error,
    isLoading,
    checked,
    setChecked,
    handleChange,
    handleEmailSubmit,
    handleOTPSubmit,
}) => {
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [otp, setOTP] = useState('');
    const [email, setEmail] = useState('');

    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow numbers and limit to 6 digits
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setOTP(value);
    };

    const onEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await handleEmailSubmit(email);
        if (success) {
            setShowOTPInput(true);
        }
    };

    const onOTPSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleOTPSubmit(email, otp);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className="w-full">
            {!showOTPInput ? (
                <form onSubmit={onEmailSubmit} className="w-full h-full flex-col justify-between">
                    <TextInput
                        label="First name"
                        name="first_name"
                        type="text"
                        placeholder="First name"
                        className={error.first_name ? "border-red-500" : ""}
                        onChange={handleChange}
                        error={error.first_name}
                    />
                    <TextInput
                        label="Last name"
                        name="last_name"
                        type="text"
                        placeholder="Last name"
                        className={error.last_name ? "border-red-500" : ""}
                        onChange={handleChange}
                        error={error.last_name}
                    />
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="name@email.com"
                        className={error.email ? "border-red-500" : ""}
                        onChange={handleEmailChange}
                        value={email}
                        error={error.email}
                    />
                    <TermsCheckbox checked={checked} setChecked={setChecked} />
                    {error.general && (
                        <div className="text-red-500 text-base text-center mt-2">
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
                        disabled={isLoading || !checked}
                        aria-busy={isLoading}
                    >
                        {isLoading ? 'Sending code...' : 'Send OTP'}
                    </button>
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
            )}
        </div>
    );
};

export default SignupForm;
