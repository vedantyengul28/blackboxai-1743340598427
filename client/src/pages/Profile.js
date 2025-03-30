import { useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import ProductCard from '../components/ProductCard';

const Profile = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const res = await api.get('/products', {
          params: { seller: user._id }
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching user products', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?._id) {
      fetchUserProducts();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold">Name</h2>
              <p>{user?.name}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Email</h2>
              <p>{user?.email}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Campus</h2>
              <p>{user?.campus}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Your Listings</h2>
        {loading ? (
          <p>Loading your products...</p>
        ) : products.length === 0 ? (
          <p>You haven't listed any products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;