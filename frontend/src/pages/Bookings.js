import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { bookingAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingAPI.getAllBookings();
      setBookings(data.bookings || []);
    } catch (error) {
      toast.error('Failed to fetch bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingAPI.updateBookingStatus(bookingId, newStatus);
      toast.success(`Booking ${newStatus} successfully`);
      fetchBookings(); // Refresh the list
    } catch (error) {
      toast.error('Failed to update booking status');
      console.error('Error updating booking:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingAPI.cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
      fetchBookings(); // Refresh the list
    } catch (error) {
      toast.error('Failed to cancel booking');
      console.error('Error cancelling booking:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="flex items-center justify-center text-4xl font-bold text-gray-900 mb-4">
            <Calendar className="mr-3 text-primary-600" size={40} />
            My Bookings
          </h1>
          <p className="text-xl text-gray-600">
            Manage your travel bookings and view trip details
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your bookings...</p>
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking.id} className="card p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {booking.Trip?.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin size={16} className="mr-2" />
                          <span>{booking.Trip?.location}</span>
                        </div>
                        {booking.userName && (
                          <div className="text-sm text-gray-500">
                            Booked by: <span className="font-medium text-gray-700">{booking.userName}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Status Badge */}
                      <div className="flex items-center">
                        {booking.status === 'confirmed' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <CheckCircle size={16} className="mr-1" />
                            Confirmed
                          </span>
                        )}
                        {booking.status === 'pending' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            <AlertCircle size={16} className="mr-1" />
                            Pending
                          </span>
                        )}
                        {booking.status === 'cancelled' && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            <XCircle size={16} className="mr-1" />
                            Cancelled
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Users size={16} className="mr-2 text-primary-500" />
                        <span className="text-sm">{booking.numberOfPeople} person{booking.numberOfPeople !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign size={16} className="mr-2 text-primary-500" />
                        <span className="text-sm font-semibold">${booking.totalPrice}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-2 text-primary-500" />
                        <span className="text-sm">{booking.Trip?.duration} days</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar size={16} className="mr-2 text-primary-500" />
                        <span className="text-sm">
                          {formatDate(booking.Trip?.startDate)} - {formatDate(booking.Trip?.endDate)}
                        </span>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 border-t pt-4">
                      <span>Booked on {formatDate(booking.createdAt)}</span>
                      <span>Booking ID: #{booking.id}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 lg:ml-6">
                    {booking.status === 'pending' && user?.email === 'admin@gmail.com' && (
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                        className="btn btn-primary btn-small"
                      >
                        <CheckCircle size={16} className="mr-1" />
                        Confirm
                      </button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="btn btn-danger btn-small"
                      >
                        <XCircle size={16} className="mr-1" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start exploring our amazing trips!</p>
            <a href="/trips" className="btn btn-primary">
              Browse Trips
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;