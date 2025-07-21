import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = 'h-5 w-5 text-gray-500' }) => {
  return (
    <Loader2 className={`animate-spin ${className}`} />
  );
};

export default LoadingSpinner;