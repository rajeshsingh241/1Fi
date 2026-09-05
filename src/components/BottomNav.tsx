import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Receipt, Zap, User } from 'lucide-react';
import { MainTabType } from '../types';

interface BottomNavProps {
  activeTab?: MainTabType;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current active tab from prop or URL pathname
  const getCurrentTab = (): MainTabType => {
    if (activeTab) return activeTab;
    const path = location.pathname;
    if (path.startsWith('/shop') || path === '/') return 'shop';
    if (path.startsWith('/home')) return 'home';
    if (path.startsWith('/emi-dues')) return 'emi-dues';
    if (path.startsWith('/limit')) return 'limit';
    if (path.startsWith('/profile')) return 'profile';
    return 'shop';
  };

  const currentTab = getCurrentTab();

  const tabs: { id: MainTabType; label: string; icon: React.ReactNode; path: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" />, path: '/home' },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag className="w-5 h-5" />, path: '/shop' },
    { id: 'emi-dues', label: 'EMI Dues', icon: <Receipt className="w-5 h-5" />, path: '/emi-dues' },
    { id: 'limit', label: 'Limit', icon: <Zap className="w-5 h-5" />, path: '/limit' },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" />, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[420px] bg-white rounded-full py-2 px-3 shadow-nav border border-slate-100 flex items-center justify-around z-40">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`relative flex flex-col items-center justify-center py-1 px-3.5 rounded-full transition-all duration-200 ${
              isActive ? 'text-fi-purple font-bold' : 'text-fi-muted font-medium hover:text-fi-text'
            }`}
          >
            <div className="relative mb-0.5">
              {tab.icon}
            </div>
            <span className="text-[10px] tracking-tight whitespace-nowrap">
              {tab.label}
            </span>

            {/* Active purple underline indicator */}
            {isActive && (
              <span className="absolute -bottom-1 w-4 h-1 bg-fi-purple rounded-full animate-in fade-in zoom-in-50 duration-200"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};
