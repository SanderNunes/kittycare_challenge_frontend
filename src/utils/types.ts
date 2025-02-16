import { ChangeEvent } from "react";

export interface AuthToken {
  token: string;
  expiresIn: string;
  email: string;
  photo?: string;
}

export interface UserState {
  first_name: string;
  last_name: string;
  email: string;
  isAuthenticated: boolean;
  status: string;
  error: string;
  picture: string;
  isLoading: boolean;
}

export interface Message {
  id: string;
  role: string;
  content: string;
}

export interface BillingState {
  method: boolean;
  price: number;
  daily: number;
  monthly: number;
  yearly: number;
  trustOption: boolean;
  nostringOption: boolean;
  saveOption: boolean;
  status: string;
  error: string;
}

export interface PlanState {
  plan: string;
  end_date: string;
  provider: string;
}

export interface SignupState {
  first_name: string;
  last_name: string;
  email: string;
  token?: string;
}

export interface LoginState {
  email: string;
  password: string;
}

export interface ProfileState {
  name: string;
  breed: string;
  gender: string;
  color: string;
  medicalHistory: string;
  dietaryPreferences: string;
  status: string;
  error: string;
}

export interface TextInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  error?: string;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
}

export interface LogBtnByProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export interface ToggleProps {
  name: string;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
}

export interface ApplePayButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export interface PriceSelectBoxProps {
  checked: boolean;
  method: boolean;
  annual?: number;
  monthly?: number;
  daily?: number;
  isBest: boolean;
}
export interface LocalStorage {
  bearerToken: string;
  catId: string;
  conversationId: string;
  subscriptionId: string;
}

export interface SubscriptionState {
  id: string;
  email: string | null;
  plan: string;
  end_date: string;
  start_date: string;
  provider: string;
  billing_period: string;
}

export interface Goal {
  title: string;
  description: string;
}
