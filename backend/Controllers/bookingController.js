import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
} from "../services/bookingServices.js";

// create bookings
export const handleCreateBooking = async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// request bookings
export const handleGetAllBookings = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
};

// Get booking by id
export const handleBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
};

// updating the booking status 

export const handleUpdateBookingStatus = async (req,res) =>{
 try {
    const {id} = req.params;
    const {status} = req.body;
    const updated = await updateBookingStatus(id,status);
    res.json(updated);
 } catch (error) {
    res.status(500).json({error:error.message})
 }
};

// cancel booking 
export const handleCancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const cancelled = await cancelBooking(id);
        res.status(200).json({ message: "Booking cancelled", booking: cancelled });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}