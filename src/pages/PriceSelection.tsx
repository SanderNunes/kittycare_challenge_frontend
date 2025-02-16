import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PriceSelectBox from "../components/Payments/PriceSelectBox";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { changeMethod, removePlanAsync } from "../Redux/features/billingSlice";
import { selectBilling } from "../Redux/features/billingSlice";
import Layout from "../components/Layout";
// Constants
const SUBSCRIPTION_STORAGE_KEY = 'subscriptionId';
const ROUTES = {
  CAT_ASSISTANT: '/cat-assistant',
  PAYMENT_METHOD: "/paymentmethod",
} as const;

// Types
interface PriceSelectionProps {
  className?: string;
}

const PriceSelection: React.FC<PriceSelectionProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const billingOption = useAppSelector(selectBilling);

  useEffect(() => {
    handleSubscriptionCheck();
    handlePlanSelectionFromURL();
  }, [dispatch, navigate]);

  useEffect(() => {
    navigate(ROUTES.PAYMENT_METHOD)
  }, [])

  const handleSubscriptionCheck = () => {
    const subscriptionId = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
    if (subscriptionId) {
      navigate(ROUTES.CAT_ASSISTANT);
    }
  };

  const handlePlanSelectionFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const planSelection = urlParams.get('planSelection');

    if (planSelection) {
      navigate(ROUTES.PAYMENT_METHOD);
    }
  };

  const handleSubmit = () => {
    navigate(ROUTES.PAYMENT_METHOD);
  };

  const handleBillingMethodChange = (value: boolean) => {
    dispatch(changeMethod({ method: value }));
  };

  const handleCancel = () => {
    dispatch(removePlanAsync());
  };

  const subscriptionText = `After your free trial, the ${billingOption.method ? "annual" : "monthly"
    } subscription is $${billingOption.method ? billingOption.yearly : billingOption.monthly
    } USD and automatically renews each ${billingOption.method ? "year" : "month"}.`;

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[90%] m-auto flex flex-col gap-10">
          {/* Header Section */}
          <section className="text-center">
            <p className="text-[16px] sm:text-[18px] font-semibold opacity-60">
              Your Cat's Wellness, Purrfected.
            </p>
            <h1 className="text-[30px] sm:text-[40px] font-semibold capitalize">
              Care For Your Cat, Care For Yourself
            </h1>
            <p className="text-[16px] sm:text-[18px] font-medium m-auto opacity-60">
              Simplify cat care, reduce stress, and enjoy a <br/>happier bond with KittyCare
            </p>
          </section>

          {/* Pricing Options Section */}
          <section className="w-full flex flex-col gap-8">
            <div className="w-full sm:w-[1000px] flex flex-col sm:flex-row gap-8 m-auto">
              <div
                className="w-full"
                onClick={() => handleBillingMethodChange(true)}
              >
                <PriceSelectBox
                  checked={billingOption.method}
                  method={false}
                  isBest={true}
                  annual={billingOption.yearly}
                  daily={billingOption.daily}
                />
              </div>
              <div
                className="w-full"
                onClick={() => handleBillingMethodChange(false)}
              >
                <PriceSelectBox
                  checked={!billingOption.method}
                  method={false}
                  isBest={false}
                  monthly={billingOption.monthly}
                />
              </div>
            </div>

            {/* Subscription Details */}
            <div className="flex flex-col gap-2">
              <p className="text-[14px] sm:text-[18px] text-center font-semibold">
                {subscriptionText}
              </p>
              <div className="text-[16px] sm:text-[18px] text-center font-semibold text-[#0061EF]">
                <a href="#" className="hover:underline">Terms & Conditions</a>
                <span className="hidden sm:inline mx-2">-</span>
                <button
                  onClick={handleCancel}
                  className="block sm:inline hover:underline mx-auto"
                >
                  Cancel Anytime
                </button>
              </div>
            </div>
          </section>

          {/* CTA Button */}
          <div className="w-full">
            <button
              className="w-full sm:w-auto h-[55px] px-[42px] py-[14px] flex justify-center items-center 
                     rounded-[8px] sm:rounded-[20px] bg-[#0061EF] text-[18px] font-semibold 
                     text-[#FAF6F3] capitalize m-auto hover:bg-[#0052CC] transition-colors"
              onClick={handleSubmit}
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PriceSelection;
