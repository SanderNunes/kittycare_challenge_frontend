import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSubscriptionCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscription = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const subscriptionId = localStorage.getItem('subscriptionId');
      const catId = localStorage.getItem('catId');

      if (!subscriptionId || subscriptionId === 'undefined') {
        navigate(`/priceselection?${urlParams.toString()}`);
        return;
      }

      if (!catId || catId === 'undefined') {
        navigate('/progress');
      }
    };

    checkSubscription();
  }, [navigate]);
}; 