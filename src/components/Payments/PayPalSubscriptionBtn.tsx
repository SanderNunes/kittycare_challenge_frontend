import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { createPayPalSubscription, fetchOrCreatePlan, fetchOrCreateProduct } from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { RootState } from "../../Redux/store";
import { createSubscriptionAsync } from "../../Redux/features/subscriptionSlice";

interface SubscriberDetails {
  name: {
    given_name: string;
    surname: string;
  };
  email_address: string;
  shipping_address: {
    name: {
      full_name: string;
    };
    address: {
      address_line_1: string;
      address_line_2?: string;
      admin_area_2: string;
      admin_area_1: string;
      postal_code: string;
      country_code: string;
    };
  };
}

const PAYMENT_CONFIG = {
  TRIAL_DAYS: {
    MONTHLY: 3,
    YEARLY: 7,
  },
  PRICES: {
    MONTHLY: 49.99,
    YEARLY: 299.99,
  },
  CARD_ELEMENT_OPTIONS: {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Inter, "Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: window.innerWidth < 640 ? "16px" : "20px",
        lineHeight: "normal",
        fontWeight: 500,
        "::placeholder": {
          color: "#B8B9BC",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
      complete: {
        color: "#28a745",
      },
    },
  },
};

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const calculateEndDate = (isYearly: boolean): string => {
  const trialDays = isYearly ? PAYMENT_CONFIG.TRIAL_DAYS.YEARLY : PAYMENT_CONFIG.TRIAL_DAYS.MONTHLY;
  return formatDate(
    new Date(new Date().getTime() + trialDays * 24 * 60 * 60 * 1000)
  );
};

const PayPalSubscriptionBtn: React.FC<{ onClose: () => void; }> = ({ onClose }) => {
  const [planId, setPlanId] = useState<string | null>(null);
  const billingOption = useAppSelector((state: RootState) => state.billing);
  const dispatch = useAppDispatch();

  const payPeriod = billingOption.method ? "Annual" : "Monthly";
  useEffect(() => {
    (async () => {
      try {
        const productID = await fetchOrCreateProduct();
        const id = await fetchOrCreatePlan(payPeriod, productID);
        setPlanId(id);
      } catch (error) {
        console.error("Error fetching or creating plan:", error);
      }
    })();
  }, []);

  // Handle subscription approval
  const handleApprove = async (_data: any, actions: any) => {
    try {
      const subscriptionDetails = await actions.subscription.get();
      console.log("Subscription approved:", subscriptionDetails);

      // Optionally, send subscription details to your backend for processing
      const subscriberDetails: SubscriberDetails = {
        name: subscriptionDetails.subscriber.name,
        email_address: subscriptionDetails.subscriber.email_address, // Added the missing comma here
        shipping_address: {
          name: {
            full_name: `${subscriptionDetails.subscriber.name?.given_name} ${subscriptionDetails.subscriber.name?.surname}`
          },
          address: subscriptionDetails.subscriber.shipping_address.address
        },
      };

      const subscription = await createPayPalSubscription(planId, subscriberDetails);
      console.log("subscription success on paypal", subscription);


      if (subscription.id) {
        await dispatch(createSubscriptionAsync({
          id: subscriptionDetails.id,
          email: subscriptionDetails.subscriber.email_address || localStorage.getItem("email"),
          plan: "Free Trial",
          end_date: calculateEndDate(billingOption.method),
          start_date: subscriptionDetails.start_time,
          provider: "PayPal",
          billing_period: payPeriod
        })).unwrap();

        console.log("created subscription transaction on supabase");
        onClose();
      }

    } catch (error) {
      console.error("Error during subscription approval:", error);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        vault: true,
        components: "buttons",
      }}
    >
      {planId ? (
        <PayPalButtons
          createSubscription={(_data, actions) => {
            return actions.subscription.create({
              plan_id: planId,
            });
          }}
          onApprove={handleApprove}
          onError={(error: any) => console.error("PayPal error:", error)}
          style={{
            layout: "vertical",
            shape: "rect",
            label: "subscribe",
            color: 'white'
          }}
          fundingSource={FUNDING.PAYPAL}
        />
      ) : (
        <p className="text-center">Loading PayPal Button...</p>
      )}
    </PayPalScriptProvider>
  );
};
export default PayPalSubscriptionBtn;

