import axios from 'axios';

// Use port 4000 to match backend
const API_BASE_URL = 'http://localhost:4000/api';

console.log('🔗 API Base URL:', API_BASE_URL)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Trip API calls
export const tripAPI = {
  // Get all trips
  getAllTrips: async () => {
    const response = await api.get('/trips');
    return response.data;
  },

  // Get trip by ID
  getTripById: async (id) => {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  // Create new trip
  createTrip: async (tripData) => {
    const response = await api.post('/trips', tripData);
    return response.data;
  },

  // Update trip
  updateTrip: async (id, tripData) => {
    const response = await api.put(`/trips/${id}`, tripData);
    return response.data;
  },

  // Delete trip
  deleteTrip: async (id) => {
    const response = await api.delete(`/trips/${id}`);
    return response.data;
  },
};

// Booking API calls
export const bookingAPI = {
  // Get all bookings
  getAllBookings: async () => {
    const response = await api.get('/trips/bookings');
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await api.get(`/trips/bookings/${id}`);
    return response.data;
  },

  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/trips/bookings', bookingData);
    return response.data;
  },

  // Update booking status
  updateBookingStatus: async (id, status) => {
    const response = await api.put(`/trips/bookings/${id}`, { status });
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id) => {
    const response = await api.delete(`/trips/bookings/${id}`);
    return response.data;
  },
};

// Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error: Cannot connect to backend. Make sure backend is running on http://localhost:4000');
    } else {
      console.error('API Error:', error.response?.data || error.message);
    }
    throw error;
  }
);

export default api;