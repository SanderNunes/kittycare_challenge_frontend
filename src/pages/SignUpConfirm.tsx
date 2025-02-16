import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // or useParams if needed
import Layout from '../components/Layout';

// Constants
const REDIRECT_PATHS = {
  PRICE_SELECTION: "/priceselection",
  PROGRESS: "/progress",
  CAT_ASSISTANT: "/cat-assistant"
} as const;

const emailProviders: { [key: string]: string } = {
  gmail: 'https://mail.google.com',
  yahoo: 'https://mail.yahoo.com',
  outlook: 'https://outlook.live.com',
  hotmail: 'https://outlook.live.com', // Hotmail redirects to Outlook
  aol: 'https://mail.aol.com',
};


const SignUpConfirm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState<string | null>('');
  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get('token');
      // Set email from localStorage
      const storedEmail = localStorage.getItem('email');
      setEmail(storedEmail);
      if (!token) return;

      const subscriptionId = localStorage.getItem("subscriptionId");
      const catId = localStorage.getItem("catId");

      if (!subscriptionId || subscriptionId === "undefined") {
        navigate(`${REDIRECT_PATHS.PRICE_SELECTION}?${urlParams.toString()}`);
      } else if (!catId || catId === "undefined") {
        navigate(REDIRECT_PATHS.PROGRESS);
      } else {
        navigate(REDIRECT_PATHS.CAT_ASSISTANT);
      }
    };

    confirmEmail();
  }, [searchParams]);

  const getEmailProviderLink = (email: string | null): string => {
    if (!email) return '/'; // Handle null email case
    const domain = email.split('@')[1]?.split('.')[0];
    return emailProviders[domain] || '/';
  };

  const handleGoToInbox = () => {
    if (!email) {
      console.error("Email not found in localStorage.");
      return;
    }
    const link = getEmailProviderLink(email);

    // Open the email provider link in a new tab
    window.open(link, '_blank');
  };

  return (
    <Layout>
      <div className='p-2 flex flex-col items-center justify-center gap-5 mt-11'>
        <h1 className='text-3xl sm:text-6xl text-center mt-11'>Thanks for signing up!</h1>
        <p className='text-xl sm:text-3xl text-center'>Please check your inbox to confirm</p>
        <button
          onClick={handleGoToInbox}
          className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg mt-5'
        >
          Go to Inbox
        </button>
      </div>
    </Layout>
  );
};

export default SignUpConfirm;
