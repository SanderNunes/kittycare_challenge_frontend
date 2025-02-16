import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signUpAPI, loginAPI, verifyOTPAPI } from '../../services/api';
import { LoginState, SignupState, UserState } from '../../utils/types';
import { setAuthToken, clearTokens } from '../../utils/auth';
import { fetchCatsAsync } from './catsSlice';
import { fetchSubscriptionsAsync } from './subscriptionSlice';
import axios from 'axios';

const initialState: UserState = {
  first_name: localStorage.getItem("first_name") || '',
  last_name: localStorage.getItem("last_name") || '',
  email: localStorage.getItem("email") || '',
  isAuthenticated: localStorage.getItem("token") ? true : false,
  status: '',
  error: '',
  picture: localStorage.getItem("picture") || '',
};

export const signUpUserAsync = createAsyncThunk(
  'user/signUpUser',
  async (userData: SignupState, { rejectWithValue }) => {
    try {
      const response = await signUpAPI(userData);

      setAuthToken({
        token: response.token,
        expiresIn: response.expiresIn || '1h',
        email: userData.email,
        photo: response.photo || ''
      });
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpUserWithOTPAsync = createAsyncThunk(
  'user/signUpUserWithOTP',
  async (credentials: SignupState, { rejectWithValue }) => {
    try {
      let response = await verifyOTPAPI(credentials.email, credentials.token || '');
      
      setAuthToken({
        token: response.session.access_token,
        expiresIn: response.session.expires_in,
        email: credentials.email,
        photo: response.user.user_metadata?.avatar_url || ''
      });
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (credentials: LoginState, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginAPI(credentials);

      setAuthToken({
        token: response.token,
        expiresIn: response.expiresIn || '1h',
        email: credentials.email,
        photo: response.photo || ''
      });

      try {
        await dispatch(fetchSubscriptionsAsync(response.token)).unwrap();
      } catch (error) {
        // Silently ignore any errors from fetchSubscriptionsAsync
      }

      try {
        await dispatch(fetchCatsAsync(response.token)).unwrap();
      } catch (error) {
        // Silently ignore any errors from fetchCatsAsync
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserWithOTPAsync = createAsyncThunk(
  'user/loginUserWithOTP',
  async (credentials: { email: string, token: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await verifyOTPAPI(credentials.email, credentials.token);

      setAuthToken({
        token: response.session.access_token,
        expiresIn: response.session.expires_in,
        email: credentials.email,
        photo: response.user.user_metadata?.avatar_url || ''
      });

      try {
        await dispatch(fetchSubscriptionsAsync(response.session.access_token)).unwrap();
      } catch (error) {
        // Silently ignore any errors from fetchSubscriptionsAsync
      }

      try {
        await dispatch(fetchCatsAsync(response.session.access_token)).unwrap();
      } catch (error) {
        // Silently ignore any errors from fetchCatsAsync
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Oauth requests - (Google)
export const googleLoginAsync = createAsyncThunk(
  "user/googleLogin",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/api/oauth/google", { token });

      console.log("Google OAuth API Response:", response.data);

      const user = response.data.user;

      // Store token locally
      setAuthToken({
        token: response.data.token,
        expiresIn: "1h",
        email: user.email,  
        photo: user.picture || '',
      });

      return {
        token: response.data.token,
        email: user.email,
        full_name: user.full_name,
        picture: user.picture || '',
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserFromToken = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:3000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response || !response.data) {
      console.error("Invalid response from API");
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user from token:", error);
    return null;
  }
};



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUpUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      clearTokens();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
        if (action.payload?.token) {
          Object.assign(state, {
            status: "succeeded",
            isAuthenticated: true,
          });
        }
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        if (action.payload?.token) {
          Object.assign(state, {
            status: "succeeded",
            isAuthenticated: true,
          });
        }
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(googleLoginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(googleLoginAsync.fulfilled, (state, action) => {
        console.log("Google login success payload:", action.payload);

        if (action.payload?.token) {
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.email = action.payload.email || "";
          state.first_name = action.payload.full_name || "";
          state.picture = action.payload.picture || "";
          state.isLoading = false;

          // keeping user data
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("email", action.payload.email || "");
          localStorage.setItem("first_name", action.payload.full_name || "");
          localStorage.setItem("picture", action.payload.picture || "");
        } else {
          console.error("Token is missing from response!");
        }
      })
      .addCase(googleLoginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
  },
});

export const { signUpUser, logout } = userSlice.actions;
export default userSlice.reducer; 