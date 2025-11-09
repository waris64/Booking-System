import React, { useState } from 'react';
import { Plane } from 'lucide-react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <Plane className="h-12 w-12 text-primary-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">TravelBook</h1>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Your Next Adventure
              <span className="text-gradient block">Awaits You</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Discover amazing destinations, book incredible trips, and create memories 
              that will last a lifetime. Join thousands of travelers who trust TravelBook 
              for their adventures.
            </p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-primary-600">1000+</div>
                <div className="text-sm text-gray-600">Destinations</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary-600">50K+</div>
                <div className="text-sm text-gray-600">Happy Travelers</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary-600">4.9★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="card p-8 animate-slide-up">
            {isLogin ? (
              <Login onToggleMode={() => setIsLogin(false)} />
            ) : (
              <SignUp onToggleMode={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;