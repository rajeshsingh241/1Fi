import React from 'react';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { EMIPlan } from '../types';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export const EMIPlanCard: React.FC<EMIPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl p-4 transition-all duration-200 cursor-pointer border-2 ${
        isSelected
          ? 'bg-fi-purple-light/40 border-fi-purple shadow-sm ring-1 ring-fi-purple/20'
          : 'bg-white border-slate-100 shadow-card hover:border-slate-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-extrabold text-fi-text text-base">
              {plan.tenureMonths} Months
            </span>
            {plan.isNoCost && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-emerald-600 stroke-none" />
                No Cost EMI
              </span>
            )}
            {plan.cashback && plan.cashback > 0 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900">
                ₹{plan.cashback} Cashback
              </span>
            )}
          </div>

          {/* EMI Amount */}
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-fi-purple">
              ₹{plan.monthlyAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-semibold text-fi-muted">/month</span>
          </div>

          {/* Subtext info */}
          <div className="flex items-center gap-3 mt-2 text-xs text-fi-muted font-medium">
            <span>
              Interest: {plan.interestRate === 0 ? '0% (Free)' : `${plan.interestRate}% p.a.`}
            </span>
            <span>•</span>
            <span>
              Fee: {plan.processingFee === 0 ? '₹0' : `₹${plan.processingFee}`}
            </span>
          </div>
        </div>

        {/* Right Radio Indicator */}
        <div className="shrink-0 pt-0.5">
          {isSelected ? (
            <CheckCircle2 className="w-6 h-6 text-fi-purple fill-fi-purple text-white" />
          ) : (
            <Circle className="w-6 h-6 text-slate-300" />
          )}
        </div>
      </div>
    </div>
  );
};
