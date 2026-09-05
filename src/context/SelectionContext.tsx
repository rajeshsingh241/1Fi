import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, EMIPlan } from '../types';

export interface CompletedOrder {
  id: string;
  product: Product;
  variant: ProductVariant;
  emiPlan: EMIPlan;
  totalPrice: number;
  orderDate: string;
}

interface SelectionContextType {
  product: Product | null;
  selectedVariant: ProductVariant | null;
  selectedEmiPlan: EMIPlan | null;
  completedOrders: CompletedOrder[];
  selectProduct: (product: Product) => void;
  selectVariant: (variant: ProductVariant) => void;
  selectEmiPlan: (plan: EMIPlan) => void;
  clearSelection: () => void;
  confirmCurrentOrder: () => CompletedOrder | null;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

// Helper to safely load JSON from localStorage
function loadSavedData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    // console.error('Failed to read localStorage:', err);
    return fallback;
  }
}

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<Product | null>(() => loadSavedData('1fi_sel_product', null));
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(() => loadSavedData('1fi_sel_variant', null));
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EMIPlan | null>(() => loadSavedData('1fi_sel_plan', null));
  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>(() => loadSavedData('1fi_orders', []));

  // Persist selections to localStorage so direct URL refresh won't wipe state
  useEffect(() => {
    try {
      if (product) localStorage.setItem('1fi_sel_product', JSON.stringify(product));
      else localStorage.removeItem('1fi_sel_product');

      if (selectedVariant) localStorage.setItem('1fi_sel_variant', JSON.stringify(selectedVariant));
      else localStorage.removeItem('1fi_sel_variant');

      if (selectedEmiPlan) localStorage.setItem('1fi_sel_plan', JSON.stringify(selectedEmiPlan));
      else localStorage.removeItem('1fi_sel_plan');

      localStorage.setItem('1fi_orders', JSON.stringify(completedOrders));
    } catch (e) {
      // LocalStorage quota or permission issue fallback
    }
  }, [product, selectedVariant, selectedEmiPlan, completedOrders]);

  const selectProduct = (newProd: Product) => {
    setProduct(newProd);
    if (newProd.variants && newProd.variants.length > 0) {
      setSelectedVariant(newProd.variants[0]);
    } else {
      setSelectedVariant(null);
    }
    setSelectedEmiPlan(null);
  };

  const selectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  const selectEmiPlan = (plan: EMIPlan) => {
    setSelectedEmiPlan(plan);
  };

  const clearSelection = () => {
    setProduct(null);
    setSelectedVariant(null);
    setSelectedEmiPlan(null);
  };

  const confirmCurrentOrder = (): CompletedOrder | null => {
    if (!product || !selectedVariant || !selectedEmiPlan) return null;

    const basePrice = product.price + (selectedVariant ? selectedVariant.priceDelta : 0);

    const newOrder: CompletedOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      product,
      variant: selectedVariant,
      emiPlan: selectedEmiPlan,
      totalPrice: basePrice,
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newOrder, ...completedOrders];
    setCompletedOrders(updated);
    try {
      localStorage.setItem('1fi_orders', JSON.stringify(updated));
    } catch (err) {}
    
    return newOrder;
  };

  return (
    <SelectionContext.Provider
      value={{
        product,
        selectedVariant,
        selectedEmiPlan,
        completedOrders,
        selectProduct,
        selectVariant,
        selectEmiPlan,
        clearSelection,
        confirmCurrentOrder
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error('useSelection must be used inside SelectionProvider');
  }
  return ctx;
};
