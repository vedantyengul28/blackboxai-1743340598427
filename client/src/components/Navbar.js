import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          SecondHand
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/create-product" className="hover:text-primary-dark">
                <i className="fas fa-plus mr-1"></i> Sell Item
              </Link>
              <Link to="/profile" className="hover:text-primary-dark">
                <i className="fas fa-user mr-1"></i> Profile
              </Link>
              <button 
                onClick={logout}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-sign-out-alt mr-1"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary-dark">
                Login
              </Link>
              <Link to="/signup" className="hover:text-primary-dark">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;