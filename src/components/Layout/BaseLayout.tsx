import { ReactNode } from 'react';

interface BaseLayoutProps {
    children: ReactNode;
    className?: string;
}

export const BaseLayout = ({ children, className = '' }: BaseLayoutProps) => {
    return (
        <div className={`min-h-screen w-full bg-gray-50 ${className}`}>
            {children}
        </div>
    );
}; 