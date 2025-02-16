import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import PayMethodBtn from "../components/Payments/PayMethodBtn";
import SwitchMethod from "../components/Payments/SwitchMethod";
import Layout from "../components/Layout";
import ReactPixel from "react-facebook-pixel";
import { useMediaQuery } from "react-responsive";
import { updateBillingOption } from "../Redux/features/billingSlice";

/**
 * PaymentMethod component handles the payment method selection page
 * Displays pricing information and available payment options
 */
const PaymentMethod = () => {
  const navigate = useNavigate();
  const billingOption = useAppSelector((state: RootState) => state.billing);
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

  const getPricingText = (): string => {
    return billingOption.method
      ? "$0.00 for 7-day free trial; converts to $299.99 annually renewing subscription."
      : "$0.00 for 3-day free trial; converts to $49.99 monthly renewing subscription.";
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between max-w-[1200px] m-auto gap-6 sm:gap-[140px]">
          {/* Billing Switch Section */}
          {!isMobile && (
            <div className="m-auto sm:m-0 max-w-[90%] sm:w-full">
              <SwitchMethod />
            </div>
          )}

          {/* Payment Options Section */}
          <div className="m-auto sm:m-0 my-2 sm:mt-32">
            <div className="w-[343px] px-[21px] py-[47px] sm:w-[608px] sm:px-[85px] sm:py-[100px] h-auto bg-white border-2 rounded-3xl border-[#B8B8B8]">
              <div className="w-full h-full flex flex-col items-center justify-between">
                {/* Header Section */}
                <div className="text-center">
                  <h2 className="text-[28px] sm:text-[40px] font-semibold mb-6">
                    Choose How to Pay
                  </h2>
                  <div className="text-base sm:text-lg font-medium mb-10">
                    {getPricingText()}
                  </div>
                </div>

                {/* Payment Methods Section */}
                <div className="w-full h-full flex flex-col justify-between gap-[30px]">
                  <PayMethodBtn onClick={() => navigate("/paymentdetail")} />

                  {/* Footer Section */}
                  <div>
                    <div className="text-[14px] font-semibold opacity-60 text-center">
                      Applicable VAT, sales or other applicable taxes may apply.
                    </div>
                    <div className="text-[#0061EF] text-center text-[18px] font-semibold underline cursor-pointer">
                      Cancel anytime.
                    </div>
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

export default PaymentMethod;
