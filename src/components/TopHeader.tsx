import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Bell } from 'lucide-react';

interface TopHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  showBack = false,
  onBack,
  rightElement,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="bg-fi-bg sticky top-0 z-30 px-5 pt-3 pb-3 flex items-center justify-between border-b border-slate-200/50">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white text-fi-text flex items-center justify-center shadow-card hover:bg-slate-50 transition-all"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-fi-purple text-white font-extrabold flex items-center justify-center text-sm shadow-pill">
              1Fi
            </div>
            <span className="font-black text-fi-text text-xl tracking-tight">Marketplace</span>
          </div>
        )}

        {title && showBack && (
          <h1 className="font-bold text-fi-text text-lg leading-tight truncate max-w-[200px]">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {rightElement ? (
          rightElement
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified</span>
            </div>
            <button className="w-9 h-9 rounded-full bg-white text-fi-text flex items-center justify-center shadow-card">
              <Bell className="w-4 h-4 text-fi-muted" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
