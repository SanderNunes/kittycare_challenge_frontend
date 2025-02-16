import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSubscriptionAPI, getSubscriptionsAPI, deleteSubscriptionAPI, deleteStripeSubscriptionAPI, cancelPayPalSubscription } from '../../services/api';
import { SubscriptionState } from '../../utils/types';
import { clearTokens } from '../../utils/auth';

interface SubscriptionStateWithStatus extends SubscriptionState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isAuthenticated?: boolean;
}

const initialState: SubscriptionStateWithStatus = {
  id: '',
  email: '',
  plan: '',
  end_date: '',
  start_date: '',
  provider: '',
  billing_period: '',
  status: 'idle',
  error: null,
  isAuthenticated: false
};

export const createSubscriptionAsync = createAsyncThunk(
  'subscription/createSubscription',
  async (subscriptionData: SubscriptionState, { rejectWithValue }) => {
    try {
      const response = await createSubscriptionAPI(subscriptionData);
      localStorage.setItem('subscriptionId', response.id);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSubscriptionsAsync = createAsyncThunk(
  'subscription/fetchSubscriptions',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getSubscriptionsAPI(token);
      localStorage.setItem('subscriptionId', response.id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSubscriptionAsync = createAsyncThunk(
  'subscription/deleteSubscription',
  async (_, { rejectWithValue }) => {
    try {
      const subscriptionId = localStorage.getItem('subscriptionId');
      if (!subscriptionId) {
        throw new Error('No subscription ID found');
      }

      if (subscriptionId.startsWith('sub_')) {
        // Call Stripe subscription delete API
        await deleteStripeSubscriptionAPI(subscriptionId);
      } else if (subscriptionId.startsWith('I-')) {
        // Call PayPal subscription delete API
        await cancelPayPalSubscription(subscriptionId);
      } else {
        throw new Error('Invalid subscription ID');
      }

      await deleteSubscriptionAPI(subscriptionId);
      localStorage.removeItem('subscriptionId');
      return {
        success: true,
        message: 'Subscription deleted successfully'
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    updateSubscription: (state, action: PayloadAction<Partial<SubscriptionState>>) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      clearTokens();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubscriptionAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createSubscriptionAsync.fulfilled, (state, action) => {
        if (action.payload?.token) {
          Object.assign(state, {
            status: 'succeeded',
            isAuthenticated: true,
            id: action.payload.id,
            email: action.payload.email,
            plan: action.payload.plan,
            end_date: action.payload.end_date,
            start_date: action.payload.start_date,
            provider: action.payload.provider,
            billing_period: action.payload.billing_period,
            error: null
          });
        }
      })
      .addCase(createSubscriptionAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchSubscriptionsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSubscriptionsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          Object.assign(state, {
            id: action.payload.id,
            email: action.payload.email,
            plan: action.payload.plan,
            end_date: action.payload.end_date,
            start_date: action.payload.start_date,
            provider: action.payload.provider,
            billing_period: action.payload.billing_period,
            error: null
          });
        }
      })
      .addCase(fetchSubscriptionsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteSubscriptionAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteSubscriptionAsync.fulfilled, (state) => {
        Object.assign(state, initialState);
        localStorage.removeItem('subscriptionId');
      })
      .addCase(deleteSubscriptionAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { updateSubscription, logout } = subscriptionSlice.actions;

// Selectors
export const selectSubscription = (state: { subscription: SubscriptionStateWithStatus }) => state.subscription;
export const selectSubscriptionStatus = (state: { subscription: SubscriptionStateWithStatus }) => state.subscription.status;
export const selectSubscriptionError = (state: { subscription: SubscriptionStateWithStatus }) => state.subscription.error;

export default subscriptionSlice.reducer; 