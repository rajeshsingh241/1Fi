import { Product, EMIPlan } from '../types';

const API_BASE = '/api';

export async function getProducts(query?: string, category?: string): Promise<Product[]> {
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (category && category !== 'All') params.append('category', category);

  const response = await fetch(`${API_BASE}/products?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const json = await response.json();
  if (!json.success) {
    throw new Error(json.error || 'Server error while fetching products');
  }

  return json.data;
}

export async function getProductById(productId: string): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${productId}`);

  if (!response.ok) {
    throw new Error(`Product not found: ${response.statusText}`);
  }

  const json = await response.json();
  if (!json.success) {
    throw new Error(json.error || 'Server error while fetching product detail');
  }

  return json.data;
}

export async function getEmiPlans(productId: string): Promise<EMIPlan[]> {
  const response = await fetch(`${API_BASE}/emi-plans/${productId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch EMI plans: ${response.statusText}`);
  }

  const json = await response.json();
  if (!json.success) {
    throw new Error(json.error || 'Server error while fetching EMI plans');
  }

  return json.data;
}
