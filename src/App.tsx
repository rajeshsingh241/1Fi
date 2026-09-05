import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PhoneFrame } from './components/PhoneFrame';
import { SelectionProvider } from './context/SelectionContext';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { GenericTabPage } from './pages/GenericTabPage';

export const App: React.FC = () => {
  return (
    <SelectionProvider>
      <BrowserRouter>
        <PhoneFrame>
          <Routes>
            <Route path="/" element={<Navigate to="/shop" replace />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            
            {/* Main Tabs */}
            <Route path="/home" element={<GenericTabPage tab="home" />} />
            <Route path="/emi-dues" element={<GenericTabPage tab="emi-dues" />} />
            <Route path="/limit" element={<GenericTabPage tab="limit" />} />
            <Route path="/profile" element={<GenericTabPage tab="profile" />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/shop" replace />} />
          </Routes>
        </PhoneFrame>
      </BrowserRouter>
    </SelectionProvider>
  );
};

export default App;
