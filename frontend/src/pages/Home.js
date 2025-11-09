import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Calendar, MapPin, Star, ArrowRight } from 'lucide-react';
import { tripAPI } from '../services/api';
import TripCard from '../components/TripCard';

const Home = () => {
  const [featuredTrips, setFeaturedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedTrips();
  }, []);

  const fetchFeaturedTrips = async () => {
    try {
      const data = await tripAPI.getAllTrips();
      // Show only first 3 trips as featured
      setFeaturedTrips(data.trips?.slice(0, 3) || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
                Discover Amazing
                <span className="text-gradient block">Travel Destinations</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-slide-up">
                Book your dream vacation with our curated selection of incredible trips 
                around the world. Adventure awaits!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-bounce-in">
                <Link to="/trips" className="btn btn-primary btn-large">
                  <Plane size={20} />
                  Explore Trips
                </Link>
                <Link to="/bookings" className="btn btn-secondary btn-large">
                  <Calendar size={20} />
                  My Bookings
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="card p-8 text-center animate-bounce-in bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
                <Plane size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">1000+ Destinations</h3>
                <p className="text-primary-100">Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose TravelBook?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Amazing Destinations</h3>
              <p className="text-gray-600">Carefully selected destinations around the world with unique experiences</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-600">Simple and secure booking process with instant confirmation</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Best Prices</h3>
              <p className="text-gray-600">Competitive prices with no hidden fees and flexible payment options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Trips</h2>
            <Link to="/trips" className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View All Trips
              <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading amazing trips...</p>
            </div>
          ) : featuredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Plane size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No trips available</h3>
              <p className="text-gray-600 mb-6">Check back later for amazing travel opportunities!</p>
              <Link to="/admin" className="btn btn-primary">
                Add First Trip
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of travelers who have discovered amazing destinations with us
          </p>
          <Link to="/trips" className="btn bg-white text-primary-600 hover:bg-gray-100 btn-large">
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;