import { ReactNode } from 'react';

export interface ChatroomLayoutProps {
  children: ReactNode;
}

export interface CornerImageProps {
  src: string;
  alt: string;
  className?: string;
} 