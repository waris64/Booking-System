import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Calendar, Settings, Home, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Plane className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">TravelBook</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/trips" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive('/trips') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <Plane size={18} />
              <span>Trips</span>
            </Link>
            
            <Link 
              to="/bookings" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive('/bookings') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <Calendar size={18} />
              <span>My Bookings</span>
            </Link>
            
           
            {user?.email === 'admin@gmail.com' &&(
               <Link 
              to="/admin" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive('/admin') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
            >
              <Settings size={18} />
              <span>Admin</span>
            </Link>
            )}
          </div>

          {/* Desktop User Menu & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Desktop User Menu */}
            {user && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName} 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-8 w-8 p-1 bg-gray-200 rounded-full text-gray-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName || user.email}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-slide-up">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive('/') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/trips" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive('/trips') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                <Plane size={18} />
                <span>Trips</span>
              </Link>
              
              <Link 
                to="/bookings" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive('/bookings') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                <Calendar size={18} />
                <span>My Bookings</span>
              </Link>
              
              {user?.email === 'admin@gmail.com' && (
                <Link 
                  to="/admin" 
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive('/admin') 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                >
                  <Settings size={18} />
                  <span>Admin</span>
                </Link>
              )}

              {/* Mobile User Info & Logout */}
              {user && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex items-center space-x-2 px-4 py-2">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName} 
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <User className="h-8 w-8 p-1 bg-gray-200 rounded-full text-gray-600" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;