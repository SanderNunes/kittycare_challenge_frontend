import { configureStore, Reducer } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import chatReducer from './features/chatSlice';
import catsReducer from './features/catsSlice';
import billingReducer from './features/billingSlice';
import subscriptionReducer from './features/subscriptionSlice';
import { uiReducer } from '../store/ui/reducer';
import { UIState, SetLoadingAction } from '../store/ui/types';
import { AnyAction } from 'redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    cats: catsReducer,
    billing: billingReducer,
    subscription: subscriptionReducer,
    ui: uiReducer as Reducer<UIState, SetLoadingAction | AnyAction>,  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
