import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Receipt, Sparkles, AlertCircle } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useSelection } from '../context/SelectionContext';

export function ConfirmationPage() {
  const navigate = useNavigate();
  const { product, selectedVariant, selectedEmiPlan, confirmCurrentOrder, clearSelection } = useSelection();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  if (!product || !selectedVariant || !selectedEmiPlan) {
    return (
      <div className="flex flex-col min-h-full bg-fi-bg">
        <TopHeader showBack title="Order Summary" />
        <div className="p-8 my-auto text-center space-y-4">
          <AlertCircle className="w-14 h-14 text-fi-purple mx-auto" />
          <h2 className="text-xl font-bold text-fi-text">No Product Selected</h2>
          <p className="text-xs text-fi-muted max-w-xs mx-auto">
            Your cart selection is empty. Please select a product and EMI plan from the marketplace.
          </p>
          <PrimaryButton onClick={() => navigate('/shop')}>
            Back to Marketplace
          </PrimaryButton>
        </div>
      </div>
    );
  }

  const basePrice = product.price;
  const variantDelta = selectedVariant.priceDelta;
  const productTotal = basePrice + variantDelta;
  const cashback = selectedEmiPlan.cashback || 0;
  const fee = selectedEmiPlan.processingFee || 0;
  const totalTenurePayable = selectedEmiPlan.monthlyAmount * selectedEmiPlan.tenureMonths;

  const handleConfirmOrder = () => {
    setSubmitting(true);
    // Simulate brief credit network call delay
    setTimeout(() => {
      const created = confirmCurrentOrder();
      setSubmitting(false);
      setConfirmed(true);
      if (created) {
        setOrderId(created.id);
      }
    }, 800);
  };

  const handleFinish = () => {
    clearSelection();
    navigate('/emi-dues');
  };

  return (
    <div className="flex flex-col min-h-full bg-fi-bg">
      <TopHeader showBack={!confirmed} title={confirmed ? "Application Approved" : "Plan Recap"} />

      {confirmed ? (
        /* Order Approved Screen */
        <div className="flex-1 px-5 pt-8 pb-10 flex flex-col items-center justify-center text-center my-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg relative">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              INSTANTLY APPROVED
            </span>
            <h1 className="text-2xl font-black text-fi-text">
              1Fi Credit Application Successful!
            </h1>
            <p className="text-xs text-fi-muted max-w-xs mx-auto">
              Application ID <span className="font-mono font-bold text-fi-text">#{orderId}</span> has been processed. Auto-debit is enabled for your monthly EMIs.
            </p>
          </div>

          {/* Approved Plan Recap Card */}
          <div className="w-full bg-white rounded-2xl p-5 shadow-card border border-slate-100 text-left space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <img src={product.image} alt={product.name} className="w-12 h-12 object-contain" />
              <div>
                <h4 className="font-bold text-fi-text text-sm">{product.name}</h4>
                <p className="text-xs text-fi-muted">{selectedVariant.name}</p>
              </div>
            </div>

            <div className="flex justify-between text-xs py-1">
              <span className="text-fi-muted">Monthly Installment:</span>
              <span className="font-bold text-fi-purple">₹{selectedEmiPlan.monthlyAmount.toLocaleString('en-IN')}/mo</span>
            </div>

            <div className="flex justify-between text-xs py-1">
              <span className="text-fi-muted">Tenure:</span>
              <span className="font-bold text-fi-text">{selectedEmiPlan.tenureMonths} Months</span>
            </div>

            <div className="flex justify-between text-xs py-1">
              <span className="text-fi-muted">First Auto-Debit:</span>
              <span className="font-bold text-fi-text">5th of Next Month</span>
            </div>
          </div>

          <div className="w-full pt-2">
            <PrimaryButton onClick={handleFinish}>
              View Active EMI Dues
            </PrimaryButton>
          </div>
        </div>
      ) : (
        /* Plan Recap & Confirmation Screen */
        <div className="flex-1 px-5 pt-3 pb-32 space-y-5">
          
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-fi-muted">FINAL STEP</span>
            <h1 className="text-2xl font-black text-fi-text tracking-tight">Review Order & Plan</h1>
          </div>

          {/* Product Recap Card */}
          <div className="bg-white rounded-2xl p-4 shadow-card border border-slate-100 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-fi-purple bg-fi-purple-light px-2 py-0.5 rounded-full">
                {product.brand}
              </span>
              <h3 className="font-bold text-fi-text text-base truncate mt-0.5">{product.name}</h3>
              <p className="text-xs text-fi-muted truncate">{selectedVariant.name}</p>
              <p className="text-sm font-extrabold text-fi-text mt-1">₹{productTotal.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Detailed Financial Recap Card */}
          <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-fi-purple-light text-fi-purple flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-fi-text text-sm">EMI Plan Breakdown</h3>
                  <span className="text-xs text-fi-muted">{selectedEmiPlan.tenureMonths} Months tenure</span>
                </div>
              </div>
              {selectedEmiPlan.isNoCost && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-emerald-600 stroke-none" />
                  0% Interest
                </span>
              )}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-fi-muted">Base Product Price</span>
                <span className="font-bold text-fi-text">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>

              {variantDelta > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-fi-muted">Selected Variant Addition</span>
                  <span className="font-bold text-fi-text">+ ₹{variantDelta.toLocaleString('en-IN')}</span>
                </div>
              )}

              {cashback > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-emerald-700 font-semibold">Promotional Cashback</span>
                  <span className="font-bold text-emerald-700">- ₹{cashback.toLocaleString('en-IN')}</span>
                </div>
              )}

              {fee > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-fi-muted">Processing Fee</span>
                  <span className="font-bold text-fi-text">₹{fee.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between py-1.5 border-b border-slate-50 font-bold">
                <span className="text-fi-purple">Monthly EMI</span>
                <span className="text-fi-purple text-base">₹{selectedEmiPlan.monthlyAmount.toLocaleString('en-IN')} / mo</span>
              </div>

              <div className="flex justify-between py-2 pt-3 border-t border-slate-200 text-sm font-black">
                <span className="text-fi-text">Total Tenure Payment</span>
                <span className="text-fi-text">₹{totalTenurePayable.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Pre-Approved Banner */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <h4 className="font-bold text-emerald-900 text-xs">Pre-Approved 1Fi Credit Limit</h4>
              <p className="text-[11px] text-emerald-700 font-medium">No manual paperwork needed. Auto-debit will set up seamlessly.</p>
            </div>
          </div>

        </div>
      )}

      {/* Sticky Bottom CTA */}
      {!confirmed && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[460px] bg-white p-4 border-t border-slate-200/80 shadow-lg z-40 rounded-t-3xl">
          <PrimaryButton
            onClick={handleConfirmOrder}
            loading={submitting}
          >
            Confirm & Apply for Plan
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
