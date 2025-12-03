import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'white' | 'black' | 'primary';
    className?: string;
}

export default function LoadingSpinner({
    size = 'md',
    color = 'white',
    className = ''
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-2',
        lg: 'h-12 w-12 border-2',
        xl: 'h-16 w-16 border-4'
    };

    const colorClasses = {
        white: 'border-white border-t-transparent',
        black: 'border-black border-t-transparent',
        primary: 'border-blue-500 border-t-transparent'
    };

    return (
        <div
            className={`
        animate-spin rounded-full 
        ${sizeClasses[size]} 
        ${colorClasses[color]}
        ${className}
      `}
        />
    );
}
