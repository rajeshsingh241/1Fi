import React from 'react';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'solid' | 'outline' | 'ghost';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  variant = 'solid',
}) => {
  const baseStyles = 'w-full h-14 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-pill active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none';

  const variants = {
    solid: 'bg-fi-purple hover:bg-fi-purple-hover text-white',
    outline: 'bg-white border-2 border-fi-purple text-fi-purple hover:bg-fi-purple-light',
    ghost: 'bg-fi-purple-light text-fi-purple hover:bg-fi-purple-light-hover shadow-none',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
