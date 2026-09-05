import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCcw, AlertCircle, ShoppingBag, Store, Tag } from 'lucide-react';
import { TopHeader } from '../components/TopHeader';
import { ListItemCard } from '../components/ListItemCard';
import { EmptyState } from '../components/EmptyState';
import { BottomNav } from '../components/BottomNav';
import { ProductSkeletonLoader } from '../components/SkeletonLoader';
import { getProducts } from '../services/api';
import { useSelection } from '../context/SelectionContext';
import { Product, ShopSubTabType } from '../types';

export function ShopPage() {
  const navigate = useNavigate();
  const { selectProduct } = useSelection();

  // Sub-tab selection state
  const [activeTab, setActiveTab] = useState<ShopSubTabType>('marketplace');
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const categoryList = ['All', 'Mobiles', 'Laptops', 'Audio', 'Tablets', 'Wearables'];

  const fetchCatalog = async (searchTerm?: string, catFilter?: string) => {
    try {
      setLoading(true);
      setFetchError(null);
      const data = await getProducts(searchTerm, catFilter);
      setProducts(data);
    } catch (err: any) {
      // console.error('Fetch catalog error:', err);
      setFetchError(err.message || 'Error connecting to mock API server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'marketplace') {
      fetchCatalog(query, category);
    }
  }, [activeTab, category]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCatalog(query, category);
  };

  const handleProductSelect = (item: Product) => {
    selectProduct(item);
    navigate(`/product/${item.id}`);
  };

  return (
    <div className="flex flex-col min-h-full pb-24 bg-fi-bg">
      <TopHeader />

      <div className="px-5 pt-4 pb-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-fi-muted">1Fi Shop</span>
        <h1 className="text-2xl font-black text-fi-text tracking-tight mt-0.5">Explore Marketplace</h1>
      </div>

      {/* Top 3 Sub-tabs */}
      <div className="px-5 my-2">
        <div className="bg-slate-200/70 p-1 rounded-2xl flex items-center justify-between">
          <button
            onClick={() => setActiveTab('top-brands')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeTab === 'top-brands'
                ? 'bg-white text-fi-purple shadow-card'
                : 'text-fi-muted hover:text-fi-text'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Top Brands</span>
          </button>

          <button
            onClick={() => setActiveTab('nearby-stores')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeTab === 'nearby-stores'
                ? 'bg-white text-fi-purple shadow-card'
                : 'text-fi-muted hover:text-fi-text'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Nearby Stores</span>
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeTab === 'marketplace'
                ? 'bg-fi-purple text-white shadow-pill'
                : 'text-fi-muted hover:text-fi-text'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>1Fi Marketplace</span>
          </button>
        </div>
      </div>

      {/* Top Brands Placeholder */}
      {activeTab === 'top-brands' && (
        <EmptyState
          icon={<Tag className="w-10 h-10 stroke-[1.75]" />}
          label="TOP BRANDS COMING SOON"
          description="We are partnering with official brand outlets for direct credit checkout."
          ctaText="Explore 1Fi Marketplace"
          onCtaClick={() => setActiveTab('marketplace')}
        />
      )}

      {/* Nearby Stores Placeholder */}
      {activeTab === 'nearby-stores' && (
        <EmptyState
          icon={<Store className="w-10 h-10 stroke-[1.75]" />}
          label="NO NEARBY STORES FOUND"
          description="Check back soon as we onboard local partner electronics outlets near your location."
          ctaText="Shop Digital Marketplace"
          onCtaClick={() => setActiveTab('marketplace')}
        />
      )}

      {/* 1Fi Marketplace Active View */}
      {activeTab === 'marketplace' && (
        <div className="px-5 space-y-4 mt-2">
          
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands or models..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white text-sm font-medium text-fi-text placeholder:text-slate-400 border border-slate-200/80 shadow-card focus:outline-none focus:border-fi-purple focus:ring-2 focus:ring-fi-purple/20 transition-all"
            />
            <Search className="w-5 h-5 text-fi-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  category === cat
                    ? 'bg-fi-text text-white shadow-sm'
                    : 'bg-white text-fi-muted border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-fi-muted">
              PRODUCTS AVAILABLE ({products.length})
            </span>
            <span className="text-xs font-bold text-fi-purple">0% EMI Available</span>
          </div>

          {loading && <ProductSkeletonLoader />}

          {!loading && fetchError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center my-4">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
              <h3 className="font-bold text-red-900 text-sm mb-1">Failed to load marketplace</h3>
              <p className="text-xs text-red-700 mb-4">{fetchError}</p>
              <button
                onClick={() => fetchCatalog(query, category)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 mx-auto hover:bg-red-700 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Fetching</span>
              </button>
            </div>
          )}

          {!loading && !fetchError && products.length === 0 && (
            <EmptyState
              label="NO MATCHING PRODUCTS"
              description={`We couldn't find any products matching "${query}". Try clearing search.`}
              ctaText="Clear Filters"
              onCtaClick={() => {
                setQuery('');
                setCategory('All');
              }}
            />
          )}

          {!loading && !fetchError && products.length > 0 && (
            <div className="space-y-3">
              {products.map((item) => (
                <ListItemCard
                  key={item.id}
                  imageUrl={item.image}
                  title={item.name}
                  subtitle={`EMI from ₹${item.startingEmi.toLocaleString('en-IN')}/mo`}
                  badgeText={item.badge}
                  rightText={`₹${item.price.toLocaleString('en-IN')}`}
                  onClick={() => handleProductSelect(item)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <BottomNav activeTab="shop" />
    </div>
  );
}
