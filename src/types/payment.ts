export interface BillingOption {
  method: boolean;
  monthly: number;
  yearly: number;
}

export interface PayMethodBtnProps {
  payBy: 'card' | 'paypal' | 'apple' | 'google';
  onClick?: () => void;
} 