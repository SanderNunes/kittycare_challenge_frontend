import { FC } from 'react';
import { CornerImageProps } from './types';

export const CornerImage: FC<CornerImageProps> = ({ src, alt, className }) => (
    <img
        src={src}
        alt={alt}
        className={className}
        aria-hidden="true" // Decorative images should be hidden from screen readers
    />
); 