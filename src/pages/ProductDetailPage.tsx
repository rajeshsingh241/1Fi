import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Check, Sparkles, AlertCircle } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { EMIPlanCard } from '../components/EMIPlanCard';
import { DetailSkeletonLoader } from '../components/SkeletonLoader';
import { getProductById, getEmiPlans } from '../services/api';
import { useSelection } from '../context/SelectionContext';
import { Product, EMIPlan, ProductVariant } from '../types';

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const {
    product: contextProduct,
    selectedVariant,
    selectedEmiPlan,
    selectProduct,
    selectVariant,
    selectEmiPlan,
  } = useSelection();

  const [productData, setProductData] = useState<Product | null>(contextProduct);
  const [basePlans, setBasePlans] = useState<EMIPlan[]>([]);
  
  const [loading, setLoading] = useState<boolean>(!contextProduct);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load product details on mount or URL change
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (!productId) return;
      try {
        setLoading(true);
        setErrorMsg(null);
        
        let p = contextProduct;
        if (!p || p.id !== productId) {
          p = await getProductById(productId);
          if (isMounted) selectProduct(p);
        }
        if (isMounted) setProductData(p);

        setLoadingPlans(true);
        const fetchedPlans = await getEmiPlans(productId);
        if (isMounted) {
          setBasePlans(fetchedPlans);
          if (fetchedPlans.length > 0 && !selectedEmiPlan) {
            selectEmiPlan(fetchedPlans[0]);
          }
        }
      } catch (err: any) {
        if (isMounted) setErrorMsg(err.message || 'Product failed to load');
      } finally {
        if (isMounted) {
          setLoading(false);
          setLoadingPlans(false);
        }
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [productId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-full bg-fi-bg">
        <TopHeader showBack title="Loading..." />
        <DetailSkeletonLoader />
      </div>
    );
  }

  if (errorMsg || !productData) {
    return (
      <div className="flex flex-col min-h-full bg-fi-bg">
        <TopHeader showBack title="Product Detail" />
        <div className="p-6 my-auto text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-fi-text mb-1">Product Not Found</h2>
          <p className="text-xs text-fi-muted mb-4">{errorMsg || 'Unable to retrieve product details.'}</p>
          <PrimaryButton onClick={() => navigate('/shop')}>Back to Marketplace</PrimaryButton>
        </div>
      </div>
    );
  }

  // Handle active variant & dynamic price calculation
  const activeVariant: ProductVariant = selectedVariant || productData.variants[0] || { id: 'default', name: 'Standard', priceDelta: 0 };
  const calculatedPrice = productData.price + activeVariant.priceDelta;

  // Dynamically calculate monthly amount based on variant price
  const activeEmiPlans: EMIPlan[] = basePlans.map(plan => {
    let monthly = plan.monthlyAmount;
    if (activeVariant.priceDelta > 0) {
      if (plan.isNoCost) {
        monthly = Math.round(calculatedPrice / plan.tenureMonths);
      } else {
        const totalWithInterest = calculatedPrice * (1 + (plan.interestRate * (plan.tenureMonths / 12)) / 100);
        monthly = Math.round(totalWithInterest / plan.tenureMonths);
      }
    }
    return {
      ...plan,
      monthlyAmount: monthly
    };
  });

  // Keep selected plan synced with dynamic monthly calculation
  const currentSelectedPlan = activeEmiPlans.find(p => p.id === selectedEmiPlan?.id) || activeEmiPlans[0] || selectedEmiPlan;

  const handleProceed = () => {
    if (!currentSelectedPlan) return;
    // Save chosen variant plan into context
    selectEmiPlan(currentSelectedPlan);
    navigate('/confirmation');
  };

  return (
    <div className="flex flex-col min-h-full bg-fi-bg">
      <TopHeader showBack title={productData.name} />

      <div className="flex-1 px-5 pt-3 pb-32 space-y-5">
        
        {/* Product Image Hero Container */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
          {productData.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-extrabold bg-fi-purple-light text-fi-purple flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-fi-purple" />
              {productData.badge}
            </span>
          )}

          <div className="w-full h-56 flex items-center justify-center p-2 my-2">
            <img
              src={productData.image}
              alt={productData.name}
              className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="w-full flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-bold text-amber-900 border border-amber-200">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{productData.rating}</span>
              <span className="text-amber-700 font-normal">({productData.reviewCount})</span>
            </div>

            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Instant Approval
            </span>
          </div>
        </div>

        {/* Title and Price Info */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-fi-muted">
            {productData.brand} • {productData.category}
          </span>
          <h1 className="text-xl font-extrabold text-fi-text leading-tight">
            {productData.name}
          </h1>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-2xl font-black text-fi-text">
              ₹{calculatedPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-fi-muted font-medium">Inclusive of all taxes</span>
          </div>
        </div>

        {/* Variant Selector (Pill Chips) */}
        {productData.variants && productData.variants.length > 0 && (
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-fi-muted px-1 block">
              SELECT VARIANT
            </label>
            <div className="flex flex-wrap gap-2">
              {productData.variants.map((v) => {
                const isSelected = activeVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => selectVariant(v)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-fi-purple text-white shadow-pill ring-2 ring-fi-purple/30'
                        : 'bg-white text-fi-text border border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    <span>{v.name}</span>
                    {v.priceDelta > 0 && (
                      <span className={isSelected ? 'text-purple-200' : 'text-fi-muted'}>
                        (+₹{v.priceDelta.toLocaleString('en-IN')})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* EMI Plan List Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-fi-muted">
              CHOOSE FLEXIBLE EMI PLAN
            </label>
            <span className="text-xs font-bold text-fi-purple">0% Processing on selected</span>
          </div>

          {loadingPlans ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-20 bg-slate-200 rounded-2xl"></div>
              <div className="h-20 bg-slate-200 rounded-2xl"></div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {activeEmiPlans.map((plan) => (
                <EMIPlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={currentSelectedPlan?.id === plan.id}
                  onSelect={() => selectEmiPlan(plan)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Specifications */}
        {productData.specifications && productData.specifications.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-fi-muted">
              PRODUCT HIGHLIGHTS
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {productData.specifications.map((spec, i) => (
                <div key={i} className="flex justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                  <span className="font-semibold text-fi-muted">{spec.label}</span>
                  <span className="font-bold text-fi-text text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[460px] bg-white p-4 border-t border-slate-200/80 shadow-lg z-40 rounded-t-3xl flex flex-col gap-2">
        {currentSelectedPlan && (
          <div className="flex items-center justify-between text-xs px-2">
            <span className="text-fi-muted font-medium">Selected Plan:</span>
            <span className="font-extrabold text-fi-text">
              <span className="text-fi-purple">₹{currentSelectedPlan.monthlyAmount.toLocaleString('en-IN')}/mo</span> for {currentSelectedPlan.tenureMonths} Months
            </span>
          </div>
        )}
        <PrimaryButton
          onClick={handleProceed}
          disabled={!currentSelectedPlan}
        >
          Proceed with this plan
        </PrimaryButton>
      </div>
    </div>
  );
}
