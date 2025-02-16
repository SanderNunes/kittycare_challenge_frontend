import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/hooks";
import PayMethodBtn from "../components/Payments/PayMethodBtn";
import Layout from "../components/Layout";
import ReactPixel from "react-facebook-pixel";
import { useMediaQuery } from "react-responsive";
import { updateBillingOption } from "../Redux/features/billingSlice";
// import PayPalSubscriptionBtn from "../components/Payments/PayPalSubscriptionBtn";

/**
 * PaymentMethodV2 component handles the payment method selection page
 * Displays pricing information and available payment options
 */
const PaymentMethodV2 = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const dispatch = useAppDispatch();

  // Check for existing subscription and redirect if found
  useEffect(() => {
    const subscriptionId = localStorage.getItem("subscriptionId");
    if (subscriptionId) {
      navigate("/cat-assistant");
    }

    // Track InitiateCheckout when payment method page loads
    ReactPixel.track("InitiateCheckout");
  }, [navigate]);

  useEffect(() => {
    if (isMobile) {
      dispatch(updateBillingOption({ method: false }));
    }
  }, [isMobile, dispatch]);


  return (
    <Layout>
      <div className="w-full">
        {/* Payment Options Section */}
        <div className="sm:m-0 my-2">
          <div className='flex flex-col gap-2 text-center mb-8'>
            <h1 className='text-black [leading-trim:both] [text-edge:cap] font-inter text-[24px] sm:text-[38px] font-bold capitalize'>
              Start Your Free Trial
            </h1>
            <p className='text-[#404040] text-center [leading-trim:both] [text-edge:cap] font-inter text-[18px] sm:text-[22px] font-medium leading-[1.3]'>
              Begin speaking with an expert to discuss your cat's personalized plan.
            </p>
          </div>
          <div className="w-[343px] px-[21px] py-[47px] sm:w-[608px] sm:px-[85px] sm:py-[80px] mx-auto h-auto bg-white border-2 rounded-3xl border-[#B8B8B8]">
            <div className="w-full h-full flex flex-col items-center justify-between">
              <div className="text-center">
                <h2 className="text-[22px] sm:text-[36px] font-semibold mb-6">
                  3-Day Access for $0
                </h2>
                <div className="text-base sm:text-lg font-medium mb-4">
                  Unlock all the exclusive features of KittyCare <b>at zero cost</b> to you for the first three days. $49.99 per month once your trial has expired.
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className="w-full h-full flex flex-col justify-between gap-[20px]">
                <PayMethodBtn onClick={() => navigate("/paymentdetailV2")} />
                {/* <PayPalSubscriptionBtn /> */}
                {/* Footer Section */}
                <div>
                  <div className="text-[14px] font-semibold opacity-60 text-center">
                    Applicable VAT, sales or other applicable taxes may apply.
                    Cancel anytime.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentMethodV2;
