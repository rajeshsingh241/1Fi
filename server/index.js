import express from 'express';
import cors from 'cors';
import { products, emiPlansMap, generateDefaultEmiPlans } from './data.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins, headers and preflight OPTIONS requests
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Simulated network delay middleware (400ms)
app.use((req, res, next) => {
  const delay = 400;
  setTimeout(next, delay);
});

// GET /api/products (supports optional ?q= & ?category=)
app.get('/api/products', (req, res) => {
  try {
    const { q, category } = req.query;
    let result = [...products];

    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
    }

    if (q) {
      const searchTerm = String(q).toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      );
    }

    res.json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

// GET /api/products/:productId
app.get('/api/products/:productId', (req, res) => {
  try {
    const { productId } = req.params;
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch product detail' });
  }
});

// GET /api/emi-plans/:productId
app.get('/api/emi-plans/:productId', (req, res) => {
  try {
    const { productId } = req.params;
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found for EMI plans' });
    }

    const plans = emiPlansMap[productId] || generateDefaultEmiPlans(productId, product.price);

    res.json({
      success: true,
      productId,
      data: plans
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch EMI plans' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 1Fi Mock API Server running on port ${PORT}`);
});
