import axios from 'axios';
import { Message, LoginState, PlanState, SignupState, SubscriptionState } from '../utils/types';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const baseURL = import.meta.env.VITE_BASE_API_URL || 'https://kittycare-nodejs.vercel.app';

const API = axios.create({
  baseURL: baseURL,
});

export const signUpAPI = async (userData: SignupState) => {
  try {
    const response = await API.post('/api/supabase/signup', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Signup failed');
  }
};

export const loginAPI = async (credentials: LoginState) => {
  try {
    const response = await API.post('/api/supabase/signin', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Login failed');
  }
};

export const chatAPI = async ({ catId, messages }: { catId: string; messages: Message[] }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }
    const response = await API.post('/api/openai/chat', { catId, messages }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Chat request failed');
  }
};

export const getCatsAPI = async (token: string) => {
  try {
    token = localStorage.getItem('token') || token;
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.get('/api/supabase/cats', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch cats');
  }
};

export const getCatRecommendationsAPI = async (catDetails: any) => {
  try {
    const response = await API.post('/api/openai/recommendations', catDetails);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to get cat suggestions');
  }
};

export const updateConversationAPI = async ({ id, messages }: { id: string; messages: Message[] }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.put(`/api/supabase/conversations/${id}`, { messages }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to update conversation');
  }
};

export const createConversationAPI = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.post('/api/supabase/conversations', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to create conversation');
  }
};

export const getConversationsAPI = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.get('/api/supabase/conversations', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch conversations');
  }
};

export const getConversationByIdAPI = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.get(`/api/supabase/conversations/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch conversation');
  }
};


export const createPlanAPI = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.post('/api/supabase/createPlan', {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Create plan failed');
  }
};

export const updatePlanAPI = async (credentials: PlanState) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.put('/api/supabase/updatePlan', credentials, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Update plan failed');
  }
};

type GetClientSecretKeyParams = {
  name: string;
  email: string | null;
  paymentMethodId: string | undefined;
  priceId: string;
  trial_end: number;
};

export const getClientSecretKey = async ({
  name,
  email,
  paymentMethodId,
  priceId,
  trial_end
}: GetClientSecretKeyParams) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }
    const response = await API.post('/api/payments/stripe/subscription', {
      name,
      email,
      paymentMethodId,
      priceId,
      trial_end
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;

  } catch (error: any) {
    console.log("error", error);
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Get client secret key failed');
  }
};

export const updateCatAPI = async (catData: any, catId: string | null) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.put(`/api/supabase/cats/${catId}`, catData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to update cat');
  }
};

export const createCatAPI = async (catDetails: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.post('/api/supabase/cats', catDetails, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to create cat');
  }
};

export const removePlanAPI = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.delete('/api/supabase/removePlan');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Cancel plan failed');
  }
}

export const createSubscriptionAPI = async (subscriptionData: SubscriptionState) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.post('/api/supabase/subscriptions', subscriptionData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to create subscription');
  }
};

export const getSubscriptionsAPI = async (token: string) => {
  try {
    token = localStorage.getItem('token') || token;
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.get('/api/supabase/subscriptions', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to fetch subscriptions');
  }
};

export const deleteSubscriptionAPI = async (subscriptionId: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.delete(`/api/supabase/subscriptions/${subscriptionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to delete subscription');
  }
};

export const deleteStripeSubscriptionAPI = async (subscriptionId: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }
    console.log('34343434343434343434');
    
    const response = await API.delete(`/api/payments/stripe/subscription/${subscriptionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to delete subscription on stripe');
  }
};

export const requestForgotPasswordAPI = async (email: string) => {

  try {
    const response = await API.post('/api/supabase/password-reset/request', { email }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to reset password');
  }
}

export const requestResetPasswordAPI = async (token: string, newPassword: string) => {
  try {
    const response = await API.post('/api/supabase/password-reset/reset', {
      token,
      newPassword,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to reset password');
  }
}

// Check if the product exists and create it if not
export const fetchOrCreateProduct = async () => {
  try {
    // Fetch plans from the backend
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.get("/api/payments/paypal/products", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const products = response.data.products;

    if (response.data.totalItems) {
      console.log("Existing products found:", products[0].id);
      return products[0].id;

    } else {
      console.log("two", response.data.totalItems);

      // Create the plan if it doesn't exist
      const createResponse = await API.post("/api/payments/paypal/product", {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      return createResponse.data.product.id;
    }
  } catch (error) {
    console.error("Error fetching or creating plan:", error);
  }
};

// Check if the plan exists and create it if not
export const fetchOrCreatePlan = async (planPeriod: "Monthly" | "Annual", productID: any) => {
  try {
    // Fetch plans from the backend
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.get("/api/payments/paypal/plans", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const plans = response.data.plans;

    // Check if the desired plan exists
    const existingPlan = plans.find(
      (plan: any) =>
        plan.name === `${planPeriod} Subscription Plan` && plan.status === "ACTIVE"
    );

    if (existingPlan) {
      console.log("Existing plan found:", existingPlan.id);
      return existingPlan.id;
    } else {
      // Create the plan if it doesn't exist
      console.log("Creating a new plan...", planPeriod);
      const createResponse = await API.post("/api/payments/paypal/plan", { planPeriod, productID }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      return createResponse.data.plan.id;
    }
  } catch (error) {
    console.error("Error fetching or creating plan:", error);
  }
};

export const createPayPalSubscription = async (planId: string | null, subscriberDetails: any) => {
  try {
    // Fetch plans from the backend
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.post("/api/payments/paypal/subscription", { planId, subscriberDetails }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const subscription = response.data.subscription;

    if (subscription.id) {
      return subscription;
    }

  } catch (error) {
    console.error("Error fetching or creating subscription on paypal:", error);
  }
}

export const cancelPayPalSubscription = async (subscriptionID: string) => {
  try {
    // Fetch plans from the backend
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User Not Authenticated");
    }

    const response = await API.post(`/api/payments/paypal/subscription/${subscriptionID}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;

  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || 'Failed to delete subscription on paypal');
  }
}

interface OTPSignInResponse {
  message: string;
  email: string;
}

interface OTPVerifyResponse {
  user: {
    id: string;
    email: string;
    user_metadata: {
      avatar_url: string;
    };
  };
  session: {
    access_token: string;
    expires_in: string;
  };
}

export const signInWithOTPAPI = async (email: string): Promise<OTPSignInResponse> => {
  try {
    const response = await API.post('/api/supabase/signin-otp', { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send OTP');
  }
};

export const verifyOTPAPI = async (email: string, token: string): Promise<OTPVerifyResponse> => {
  try {
    const response = await API.post('/api/supabase/verify-otp', { email, token, type: 'email' });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to verify OTP');
  }
};

export const signUpWithOTPAPI = async (userData: SignupState) => {
  try {
    const response = await API.post('/api/supabase/signup-otp', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to sign up with OTP');
  }
};
export default baseURL;
