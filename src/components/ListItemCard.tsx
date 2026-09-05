import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ListItemCardProps {
  icon?: React.ReactNode;
  imageUrl?: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  rightText?: string;
  onClick?: () => void;
  className?: string;
}

export const ListItemCard: React.FC<ListItemCardProps> = ({
  icon,
  imageUrl,
  title,
  subtitle,
  badgeText,
  rightText,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 shadow-card hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-3.5 border border-slate-100/80 active:scale-[0.98] ${className}`}
    >
      {/* Left Icon / Image Chip */}
      {imageUrl ? (
        <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center shrink-0 p-1">
          <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        </div>
      ) : icon ? (
        <div className="w-12 h-12 rounded-xl bg-fi-purple-light text-fi-purple flex items-center justify-center shrink-0">
          {icon}
        </div>
      ) : null}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-bold text-fi-text text-base leading-snug truncate">{title}</h3>
          {badgeText && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-fi-purple-light text-fi-purple shrink-0">
              {badgeText}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-fi-muted font-normal leading-relaxed truncate">{subtitle}</p>
        )}
      </div>

      {/* Right Side Content + Chevron */}
      <div className="flex items-center gap-2 shrink-0">
        {rightText && (
          <span className="font-bold text-fi-text text-sm">{rightText}</span>
        )}
        <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-fi-purple">
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
