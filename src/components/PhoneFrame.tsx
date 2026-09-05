import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex justify-center font-sans antialiased text-fi-text">
      {/* Clean Mobile-First Web Container */}
      <div className="w-full max-w-[460px] min-h-screen bg-fi-bg sm:shadow-lg relative flex flex-col overflow-x-hidden border-x border-slate-200/60">
        <div className="flex-1 flex flex-col relative">
          {children}
        </div>
      </div>
    </div>
  );
};

