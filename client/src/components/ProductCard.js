import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
        <Link to={`/products/${product._id}`} className="text-primary hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;