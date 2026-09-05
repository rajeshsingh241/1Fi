import React from 'react';

export const ProductSkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-3.5 border border-slate-100">
          <div className="w-14 h-14 rounded-xl bg-slate-200 shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
          <div className="w-6 h-6 bg-slate-200 rounded-full shrink-0"></div>
        </div>
      ))}
    </div>
  );
};

export const DetailSkeletonLoader: React.FC = () => {
  return (
    <div className="p-4 space-y-6 animate-pulse">
      <div className="w-full h-56 bg-slate-200 rounded-3xl"></div>
      <div className="space-y-3">
        <div className="h-6 bg-slate-200 rounded w-2/3"></div>
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-slate-200 rounded-full w-24"></div>
          <div className="h-10 bg-slate-200 rounded-full w-28"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-20 bg-slate-200 rounded-2xl"></div>
        <div className="h-20 bg-slate-200 rounded-2xl"></div>
      </div>
    </div>
  );
};
