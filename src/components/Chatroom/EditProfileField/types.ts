export interface ProfileInfo {
  name: string;
  breed: string;
  gender: string;
  target_weight: string;
  medical_history: string;
  dietary_restrictions: string;
}

export interface PhotoData {
  buffer: number[];
  mimetype: string;
  originalname: string;
} 