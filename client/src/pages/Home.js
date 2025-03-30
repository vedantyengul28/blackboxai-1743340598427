import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    campus: '',
    category: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (filter.campus) params.campus = filter.campus;
        if (filter.category) params.category = filter.category;
        
        const res = await api.get('/products', { params });
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filter]);

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campus
              </label>
              <select
                value={filter.campus}
                onChange={(e) => setFilter({...filter, campus: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">All Campuses</option>
                <option value="Harvard University">Harvard</option>
                <option value="Stanford University">Stanford</option>
                {/* Add other campuses */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filter.category}
                onChange={(e) => setFilter({...filter, category: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">All Categories</option>
                <option value="Textbooks">Textbooks</option>
                <option value="Electronics">Electronics</option>
                {/* Add other categories */}
              </select>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="w-full md:w-3/4">
          <h1 className="text-2xl font-bold mb-6">Available Items</h1>
          {products.length === 0 ? (
            <p className="text-gray-500">No products found matching your filters</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;