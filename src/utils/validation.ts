import { UserInfo } from "./types";

export const validateEmail = (email: string): string => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";
  return "";
};

export const validateName = (name: string, fieldName: string): string => {
  if (!name.trim()) return `${fieldName} is required`;
  if (name.length < 2) return `${fieldName} must be at least 2 characters`;
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";
  
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password);

  const missing = [];
  if (!hasLowerCase) missing.push("lowercase letter");
  if (!hasUpperCase) missing.push("uppercase letter");
  if (!hasNumber) missing.push("number");
  if (!hasSpecialChar) missing.push("special character");

  if (missing.length > 0) {
    return `Password must include at least one ${missing.join(", ")}`;
  }

  return "";
};

export const validateUserInfo = (userInfo: UserInfo, isChecked: boolean) => {
  const errors = {
    first_name: validateName(userInfo.first_name, "First name"),
    last_name: validateName(userInfo.last_name, "Last name"),
    email: validateEmail(userInfo.email),
    general: "",
  };

  if (!isChecked) {
    errors.general = "Please accept the Terms and Privacy Policy";
  }

  const isValid = !Object.values(errors).some((error) => error !== "");
  return { isValid, errors };
};
