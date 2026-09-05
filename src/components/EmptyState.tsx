import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

interface EmptyStateProps {
  label: string;
  description: string;
  ctaText?: string;
  onCtaClick?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  label,
  description,
  ctaText,
  onCtaClick,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 py-12 my-auto">
      {/* Purple-toned Illustration Container */}
      <div className="w-24 h-24 rounded-full bg-fi-purple-light text-fi-purple flex items-center justify-center mb-6 shadow-inner relative">
        <div className="absolute inset-0 rounded-full bg-fi-purple/10 animate-ping opacity-30"></div>
        {icon || <ShoppingBag className="w-12 h-12 stroke-[1.75]" />}
      </div>

      {/* Uppercase Gray Label */}
      <span className="text-xs uppercase tracking-widest font-bold text-fi-muted mb-2">
        {label}
      </span>

      {/* Dark Descriptive Sentence */}
      <p className="text-fi-text text-base font-semibold max-w-xs leading-relaxed mb-6">
        {description}
      </p>

      {/* Optional CTA Button */}
      {ctaText && onCtaClick && (
        <div className="w-full max-w-xs">
          <PrimaryButton onClick={onCtaClick}>
            {ctaText}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};
