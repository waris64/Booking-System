import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Calendar, Settings, Home, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 w-full z-50">
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
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3">
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
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.displayName || user.email}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;