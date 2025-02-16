import { CatFormData } from '../types/cat.types';
import { AuthToken } from './types';

export const setAuthToken = (data: { token: string; expiresIn: string; email: string; photo: string }) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);
  localStorage.setItem("photo", data.photo);
};


/**
 * Function to store Google OAuth token in localStorage
 * @param googleAuthData - Google authentication token and user details
 */
export const setGoogleAuthToken = (googleAuthData: { token: string, email: string, name: string, photo?: string }) => {
  console.log("Google Auth Token Set", googleAuthData);

  localStorage.setItem('token', googleAuthData.token);
  localStorage.setItem('email', googleAuthData.email);
  localStorage.setItem('name', googleAuthData.name);
  if (googleAuthData.photo) localStorage.setItem('photo', googleAuthData.photo);

  // Set expiration for 1 hour (Google tokens typically expire quickly)
  const expiresAt = new Date().getTime() + 3600 * 1000; 
  localStorage.setItem('expiresAt', expiresAt.toString());
};

export const clearTokens = () => {
  const keysToRemove = [
    "token",
    "expiresAt",
    "email",
    "name",
    "photo",
    "catId",
    "ConversationId",
    "activity_level",
    "age",
    "cat_name",
    "breed",
    "check_in_period",
    "country",
    "dietary_restrictions",
    "gender",
    "goals",
    "issues_faced",
    "items",
    "medical_conditions",
    "medications",
    "required_progress",
    "selectedDate",
    "medical_history",
    "target_weight",
    "training_days",
    "unit",
    "weight",
    "zipcode",
    "food_bowls",
    "treats",
    "playtime",
    "subscriptionId",
    "goals",
    "issues_identified",
    "required_progress",
    "paymentMade",
    "catFormData"
  ];

  keysToRemove.forEach((key) => localStorage.removeItem(key));

  window.location.href = "/login";
};


export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');

  if (!token || !expiresAt) return false;

  const isValid = new Date().getTime() < parseInt(expiresAt);
  return isValid;
};
// Helper to parse expiration time (e.g., "1h" to milliseconds)
// const parseExpirationTime = (expiresIn: string): number => {
//   const unit = expiresIn.slice(-1);
//   const value = parseInt(expiresIn.slice(0, -1));
  
//   switch (unit) {
//     case 'd': return value * 24 * 60 * 60 * 1000;
//     case 'h': return value * 60 * 60 * 1000;
//     case 'm': return value * 60 * 1000;
//     case 's': return value * 1000;
//     default: return 0;
//   }
// }; 

export const collectFormData = (): CatFormData => {
  return {
    name: localStorage.getItem('cat_name'),
    goals: localStorage.getItem('goals'),
    issues_faced: localStorage.getItem('issues_faced'),
    activity_level: localStorage.getItem('activity_level'),
    gender: localStorage.getItem('gender'),
    age: parseInt(localStorage.getItem('age') || '0'),
    breed: localStorage.getItem('breed'),
    weight: parseFloat(localStorage.getItem('weight') || '0'),
    target_weight: parseFloat(localStorage.getItem('target_weight') || '0'),
    required_progress: localStorage.getItem('required_progress'),
    check_in_period: localStorage.getItem('check_in_period'),
    training_days: localStorage.getItem('training_days'),
    medical_conditions: localStorage.getItem('medical_conditions'),
    medications: localStorage.getItem('medications'),
    dietary_restrictions: localStorage.getItem('dietary_restrictions'),
    medical_history: localStorage.getItem('medical_history'),
    items: localStorage.getItem('items'),
  };
};