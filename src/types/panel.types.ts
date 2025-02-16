export interface MedicalHistoryForm {
  medicalCondition: string | null;
  medication: string;
  dietaryRestrictions: string;
  surgeryHistory: string;
}

export interface Panel05Props {
  nextStep: () => void;
  previousStep: () => void;
} 

export interface Panel15Props {
  openPaymentModal?: () => void;
  previousStep?: () => void;  // Made optional since it's not currently used
} 