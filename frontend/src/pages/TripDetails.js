import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, DollarSign, ArrowLeft, AlertTriangle } from 'lucide-react';
import { tripAPI, bookingAPI } from '../services/api';
import toast from 'react-hot-toast';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    userName: '',
    numberOfPeople: 1
  });
  const [isBooking, setIsBooking] = useState(false);

  const fetchTripDetails = async () => {
    try {
      setLoading(true);
      const data = await tripAPI.getTripById(id);
      setTrip(data);
    } catch (error) {
      toast.error('Failed to fetch trip details');
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTripDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (bookingData.numberOfPeople > trip.availableSeats) {
      toast.error('Not enough seats available');
      return;
    }

    try {
      setIsBooking(true);
      const booking = await bookingAPI.createBooking({
        ...bookingData,
        tripId: parseInt(id)
      });
      
      toast.success('Booking created successfully!');
      navigate('/bookings');
    } catch (error) {
      toast.error('Failed to create booking');
      console.error('Error creating booking:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotal = () => {
    return trip ? trip.price * bookingData.numberOfPeople : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h2>
          <button onClick={() => navigate('/trips')} className="btn btn-primary">
            Back to Trips
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/trips')} 
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Trips
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Information */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
                  {trip.title}
                </h1>
                <div className="flex items-center text-3xl font-bold text-primary-600">
                  <DollarSign size={28} />
                  <span>{trip.price}</span>
                  <span className="text-sm text-gray-500 ml-2">per person</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center text-xl text-gray-600 mb-8">
                <MapPin size={24} className="mr-3 text-primary-500" />
                <span>{trip.location}</span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-2">
                    <Clock className="text-primary-500 mr-3" size={24} />
                    <h3 className="text-lg font-semibold text-gray-900">Duration</h3>
                  </div>
                  <p className="text-gray-600">{trip.duration} days</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-2">
                    <Users className="text-primary-500 mr-3" size={24} />
                    <h3 className="text-lg font-semibold text-gray-900">Available Seats</h3>
                  </div>
                  <p className="text-gray-600">{trip.availableSeats} seats left</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-2">
                    <Calendar className="text-primary-500 mr-3" size={24} />
                    <h3 className="text-lg font-semibold text-gray-900">Start Date</h3>
                  </div>
                  <p className="text-gray-600">{formatDate(trip.startDate)}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-2">
                    <Calendar className="text-primary-500 mr-3" size={24} />
                    <h3 className="text-lg font-semibold text-gray-900">End Date</h3>
                  </div>
                  <p className="text-gray-600">{formatDate(trip.endDate)}</p>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">About this trip</h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience the beauty of {trip.location} on this amazing {trip.duration}-day adventure. 
                  This carefully crafted itinerary offers the perfect blend of exploration, relaxation, 
                  and cultural immersion. Join us for an unforgettable journey that will create 
                  memories to last a lifetime.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Book This Trip</h3>
              
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={bookingData.userName}
                    onChange={(e) => setBookingData({
                      ...bookingData,
                      userName: e.target.value
                    })}
                    className="input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of People
                  </label>
                  <input
                    type="number"
                    id="numberOfPeople"
                    value={bookingData.numberOfPeople}
                    onChange={(e) => setBookingData({
                      ...bookingData,
                      numberOfPeople: parseInt(e.target.value)
                    })}
                    className="input"
                    min="1"
                    max={trip.availableSeats}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Maximum {trip.availableSeats} people</p>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>${trip.price} × {bookingData.numberOfPeople} person{bookingData.numberOfPeople !== 1 ? 's' : ''}</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-large w-full"
                  disabled={isBooking || trip.availableSeats === 0}
                >
                  {isBooking ? 'Booking...' : trip.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                </button>
              </form>

              {/* Availability Warning */}
              {trip.availableSeats <= 5 && trip.availableSeats > 0 && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center text-orange-800">
                    <AlertTriangle size={16} className="mr-2" />
                    <span className="text-sm font-medium">Only {trip.availableSeats} seats left!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;