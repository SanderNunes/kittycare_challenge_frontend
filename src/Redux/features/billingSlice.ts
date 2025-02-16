import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createPlanAPI, removePlanAPI, updatePlanAPI } from "../../services/api";
import { BillingState, PlanState } from "../../utils/types";
import { clearTokens } from "../../utils/auth";
import { RootState } from "../../Redux/store";

const initialState: BillingState = {
  method: false, // Changed to false for monthly default
  price: 49.99,  // Changed to monthly price since it's the default
  daily: 0.82,
  monthly: 49.99,
  yearly: 299.99,
  trustOption: true,
  nostringOption: true,
  saveOption: true,
  status: "",
  error: "",
};

export const createPlanAsync = createAsyncThunk(
  "billing/createPlan",
  async (_userData: BillingState, { rejectWithValue }) => {
    try {
      const response = await createPlanAPI();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlanAsync = createAsyncThunk(
  "billing/updatePlan",
  async (
    credentials: PlanState,
    { rejectWithValue }
  ) => {
    try {
      const response = await updatePlanAPI(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removePlanAsync = createAsyncThunk(
  "billing/removePlan",
  async (_, { rejectWithValue }) => {
    try {
      const response = await removePlanAPI();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    changeMethod: (state, action: PayloadAction<Partial<BillingState>>) => {
      return { ...state, ...action.payload, price: action.payload.method ? state.yearly : state.monthly };
    },
    logout: () => {
      clearTokens();
      return initialState;
    },
    updateBillingOption(state, action) {
      const { method } = action.payload;
      state.method = method; // Update the method
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlanAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPlanAsync.fulfilled, (state, action) => {
        if (action.payload?.token) {
          Object.assign(state, {
            status: "succeeded",
            isAuthenticated: true,
          });
        }
      })
      .addCase(createPlanAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updatePlanAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePlanAsync.fulfilled, (state, action) => {
        if (action.payload?.token) {
          Object.assign(state, {
            status: "succeeded",
            isAuthenticated: true,
          });
        }
      })
      .addCase(updatePlanAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { changeMethod, logout, updateBillingOption } = billingSlice.actions;
export default billingSlice.reducer;

// Add this selector
export const selectBilling = (state: RootState) => state.billing;
