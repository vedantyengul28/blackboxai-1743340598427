import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Seller Information</h2>
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {product.seller.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Campus:</span> {product.campus}
              </p>
            </div>
            {user && user._id === product.seller._id && (
              <div className="mt-6 space-x-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Mark as Sold
                </button>
                <Link 
                  to={`/edit-product/${product._id}`}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
                >
                  Edit Listing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;