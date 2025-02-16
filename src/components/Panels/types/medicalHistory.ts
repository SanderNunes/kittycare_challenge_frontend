export interface MedicalHistory {
  medicalCondition: string | null;
  medication: string;
  dietaryRestrictions: string;
  surgeryHistory: string;
}

export interface MedicalHistoryFormProps {
  onSubmit: (data: MedicalHistory) => void;
  initialData?: MedicalHistory;
} 