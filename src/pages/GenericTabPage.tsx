import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Receipt, Zap, User, CreditCard, Shield, ChevronRight, Clock, Award } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';
import { BottomNav } from '../components/BottomNav';
import { EmptyState } from '../components/EmptyState';
import { ListItemCard } from '../components/ListItemCard';
import { useSelection } from '../context/SelectionContext';
import { MainTabType } from '../types';

interface GenericTabPageProps {
  tab: MainTabType;
}

export const GenericTabPage: React.FC<GenericTabPageProps> = ({ tab }) => {
  const navigate = useNavigate();
  const { completedOrders } = useSelection();

  const renderContent = () => {
    switch (tab) {
      case 'home':
        return (
          <div className="space-y-4 px-5 pt-3">
            {/* Credit Limit Banner Card */}
            <div className="bg-gradient-to-br from-fi-purple to-indigo-900 rounded-3xl p-6 text-white shadow-pill space-y-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200">1Fi Approved Credit Limit</span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-400 text-slate-950">Active</span>
              </div>

              <div>
                <span className="text-xs text-purple-200 font-medium">Available Limit</span>
                <h2 className="text-3xl font-black tracking-tight mt-0.5">₹3,50,000</h2>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/15 text-xs text-purple-100">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-300" />
                  <span>Instant 0-Interest Checkout</span>
                </div>
                <button onClick={() => navigate('/shop')} className="font-bold underline text-white hover:text-purple-200">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => navigate('/shop')}
                className="bg-white rounded-2xl p-4 shadow-card border border-slate-100 cursor-pointer hover:border-fi-purple transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-fi-purple-light text-fi-purple flex items-center justify-center mb-2">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-fi-text text-sm">Marketplace</h4>
                <p className="text-xs text-fi-muted">Buy electronics on EMI</p>
              </div>

              <div
                onClick={() => navigate('/emi-dues')}
                className="bg-white rounded-2xl p-4 shadow-card border border-slate-100 cursor-pointer hover:border-fi-purple transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-fi-text text-sm">EMI Schedule</h4>
                <p className="text-xs text-fi-muted">View upcoming dues</p>
              </div>
            </div>

            {/* Recent Orders Section */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-fi-muted">RECENT APPLICATIONS</span>
              {completedOrders.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 text-center shadow-card border border-slate-100">
                  <p className="text-xs text-fi-muted font-medium mb-3">No orders placed yet.</p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="text-xs font-bold text-fi-purple hover:underline"
                  >
                    Browse 1Fi Marketplace →
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {completedOrders.map((ord) => (
                    <ListItemCard
                      key={ord.id}
                      imageUrl={ord.product.image}
                      title={ord.product.name}
                      subtitle={`EMI: ₹${ord.emiPlan.monthlyAmount.toLocaleString('en-IN')}/mo (${ord.emiPlan.tenureMonths} Months)`}
                      badgeText="APPROVED"
                      rightText={`₹${ord.totalPrice.toLocaleString('en-IN')}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'emi-dues':
        return (
          <div className="space-y-4 px-5 pt-3">
            <div className="px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-fi-muted">REPAYMENTS</span>
              <h1 className="text-2xl font-black text-fi-text tracking-tight mt-0.5">EMI Dues & History</h1>
            </div>

            {completedOrders.length === 0 ? (
              <EmptyState
                icon={<Receipt className="w-10 h-10 stroke-[1.75]" />}
                label="NO ACTIVE EMI DUES"
                description="You currently have zero active EMI repayments due. Shop items on 1Fi Marketplace to convert purchases to easy EMIs."
                ctaText="Browse Products"
                onCtaClick={() => navigate('/shop')}
              />
            ) : (
              <div className="space-y-3">
                {completedOrders.map((ord) => (
                  <div key={ord.id} className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-fi-purple">Order #{ord.id}</span>
                      <span className="text-xs text-slate-500">{ord.orderDate}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src={ord.product.image} alt={ord.product.name} className="w-12 h-12 object-contain" />
                      <div>
                        <h4 className="font-bold text-fi-text text-sm">{ord.product.name}</h4>
                        <p className="text-xs text-fi-muted">{ord.variant.name}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <span className="text-fi-muted block">Next EMI Amount</span>
                        <span className="font-extrabold text-fi-purple text-base">₹{ord.emiPlan.monthlyAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                        Due 5th Next Month
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'limit':
        return (
          <div className="space-y-4 px-5 pt-3">
            <div className="px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-fi-muted">CREDIT PROFILE</span>
              <h1 className="text-2xl font-black text-fi-text tracking-tight mt-0.5">Limit & Eligibility</h1>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-fi-purple-light text-fi-purple flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 fill-fi-purple stroke-none" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-fi-muted">TOTAL SANCTIONED LIMIT</span>
                <h2 className="text-3xl font-black text-fi-text mt-1">₹3,50,000</h2>
              </div>

              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-fi-purple h-full w-[85%] rounded-full"></div>
              </div>

              <div className="flex justify-between text-xs font-semibold text-fi-muted px-1">
                <span>Available: ₹2,97,500</span>
                <span>Used: ₹52,500</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-fi-muted">CREDIT HEALTH SCORE</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm">
                    785
                  </div>
                  <div>
                    <h5 className="font-bold text-fi-text text-sm">Excellent Bureau Rating</h5>
                    <span className="text-xs text-fi-muted">Updated today</span>
                  </div>
                </div>
                <Award className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4 px-5 pt-3">
            <div className="px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-fi-muted">ACCOUNT</span>
              <h1 className="text-2xl font-black text-fi-text tracking-tight mt-0.5">My 1Fi Profile</h1>
            </div>

            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-fi-purple text-white font-extrabold text-xl flex items-center justify-center shadow-pill">
                AR
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-fi-text text-base">Archit Sharma</h3>
                <p className="text-xs text-fi-muted">+91 98765 43210</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  KYC Verified
                </span>
              </div>
            </div>

            {/* Profile Options List */}
            <div className="bg-white rounded-2xl shadow-card border border-slate-100 divide-y divide-slate-100">
              <div className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <span className="font-semibold text-fi-text text-sm">Bank Account & Auto-Debit</span>
                <ChevronRight className="w-4 h-4 text-fi-muted" />
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <span className="font-semibold text-fi-text text-sm">Credit Agreement & Documents</span>
                <ChevronRight className="w-4 h-4 text-fi-muted" />
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                <span className="font-semibold text-fi-text text-sm">Support & Help Desk</span>
                <ChevronRight className="w-4 h-4 text-fi-muted" />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-24 bg-fi-bg">
      <TopHeader />
      {renderContent()}
      <BottomNav activeTab={tab} />
    </div>
  );
};
