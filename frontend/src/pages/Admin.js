import React, { useState, useEffect } from "react";
import { Plus, Settings, Trash2, Calendar, Users } from "lucide-react";
import { tripAPI, bookingAPI } from "../services/api";
import TripCard from "../components/TripCard";
import toast from "react-hot-toast";

const Admin = () => {
  const [trips, setTrips] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    duration: "",
    startDate: "",
    endDate: "",
    availableSeats: "",
  });

  useEffect(() => {
    fetchTrips();
    fetchAllBookings();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await tripAPI.getAllTrips();
      setTrips(data.trips || []);
    } catch (error) {
      toast.error("Failed to fetch trips");
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBookings = async () => {
    try {
      const data = await bookingAPI.getAllBookings();
      setAllBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dates
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate <= startDate) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      setIsSubmitting(true);

      const tripData = {
        ...formData,
        price: parseInt(formData.price),
        duration: parseInt(formData.duration),
        availableSeats: parseInt(formData.availableSeats),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      await tripAPI.createTrip(tripData);
      toast.success("Trip created successfully!");

      // Reset form
      setFormData({
        title: "",
        location: "",
        price: "",
        duration: "",
        startDate: "",
        endDate: "",
        availableSeats: "",
      });

      // Refresh trips list
      fetchTrips();
    } catch (error) {
      toast.error("Failed to create trip");
      console.error("Error creating trip:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await tripAPI.deleteTrip(tripId);
      toast.success("Trip deleted successfully");
      fetchTrips(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete trip");
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="flex items-center justify-center text-4xl font-bold text-gray-900 mb-4">
            <Settings className="mr-3 text-primary-600" size={40} />
            Admin Panel
          </h1>
          <p className="text-xl text-gray-600">Manage trips and monitor bookings</p>
        </div>

        {/* Add Trip Form */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Plus className="mr-3 text-primary-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Add New Trip</h2>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Amazing Beach Paradise"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Maldives"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Person ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="299"
                    className="input"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (days) *
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="7"
                    className="input"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="input"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="input"
                    min={formData.startDate || new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700 mb-2">
                  Available Seats *
                </label>
                <input
                  type="number"
                  id="availableSeats"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleInputChange}
                  placeholder="20"
                  className="input"
                  min="1"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large w-full md:w-auto"
                disabled={isSubmitting}
              >
                <Plus size={20} className="mr-2" />
                {isSubmitting ? "Creating..." : "Create Trip"}
              </button>
            </form>
          </div>
        </div>

        {/* Manage Trips */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Trash2 className="mr-3 text-primary-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">
                Manage Trips ({trips.length})
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading trips...</p>
            </div>
          ) : trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onDelete={handleDeleteTrip}
                  showActions={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Plus size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No trips created yet</h3>
              <p className="text-gray-600">Create your first trip using the form above</p>
            </div>
          )}
        </div>

        {/* Trip Statistics */}
        {trips.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map(trip => {
                const tripBookings = allBookings.filter(b => b.tripId === trip.id);
                const bookedSeats = tripBookings.reduce((sum, b) => sum + b.numberOfPeople, 0);
                const totalSeats = trip.availableSeats + bookedSeats;
                
                return (
                  <div key={trip.id} className="card p-6">
                    <h4 className="font-bold text-gray-900 mb-4">{trip.title}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Seats:</span>
                        <span className="font-semibold text-lg">{totalSeats}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Booked:</span>
                        <span className="font-semibold text-lg text-red-600">{bookedSeats}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Available:</span>
                        <span className="font-semibold text-lg text-green-600">{trip.availableSeats}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Bookings:</span>
                        <span className="font-semibold text-lg text-blue-600">{tripBookings.length}</span>
                      </div>
                      <div className="mt-4 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(bookedSeats / totalSeats) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        {Math.round((bookedSeats / totalSeats) * 100)}% Booked
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Bookings Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Calendar className="mr-3 text-primary-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">
                All Bookings ({allBookings.length})
              </h2>
            </div>
          </div>

          {allBookings.length > 0 ? (
            <div className="space-y-4">
              {allBookings.map(booking => (
                <div key={booking.id} className="card p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Trip</p>
                      <p className="font-semibold text-gray-900">{booking.Trip?.title}</p>
                      <p className="text-xs text-gray-500">{booking.Trip?.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Customer</p>
                      <p className="font-semibold text-gray-900">{booking.userName || `User #${booking.userId}`}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">People</p>
                      <div className="flex items-center">
                        <Users size={16} className="mr-1 text-primary-500" />
                        <p className="font-semibold text-gray-900">{booking.numberOfPeople}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Price</p>
                      <p className="font-semibold text-gray-900">${booking.totalPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                    Booking ID: #{booking.id} • Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600">Bookings will appear here once users start booking trips</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;