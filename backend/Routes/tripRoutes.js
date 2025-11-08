import express from 'express'
import {
    createTrip,
    allTrips,
    getTripById,
    deleteTrip
} from '../Controllers/tripController.js';
import { 
    handleCreateBooking,
    handleGetAllBookings,
    handleBookingById,
    handleUpdateBookingStatus,
    handleCancelBooking
} from '../Controllers/bookingController.js';

const router = express.Router();

// Booking routes (must come before /:id routes)
router.post('/bookings', handleCreateBooking);
router.get('/bookings', handleGetAllBookings);
router.get('/bookings/:id', handleBookingById);
router.put('/bookings/:id', handleUpdateBookingStatus);
router.delete('/bookings/:id', handleCancelBooking);

// Trip routes
router.post('/', createTrip);
router.get('/', allTrips);
router.get('/:id', getTripById);
router.delete('/:id', deleteTrip);

export default router;