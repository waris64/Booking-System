import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
} from "../services/bookingServices.js";

// create bookings
export const handleCreateBooking = async () => {
  try {
    const booking = await createBooking(req.boy);
    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// request bookings
export const handleGetAllBookings = async () => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json({ bookings });
  } catch {
    res.status(500).json({ error: error.message });
  } 
};

// Get booking by id
export const handleBookingById = async (req,res) =>{
    try{
        const {id} = req.params;
        const booking = await getBookingById(id);
        res.status(200).json(booking)
    }catch{
       res.status(500).json({error:error.message})
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
export const handleCancelBooking = async () =>{
    try {
        const {id}  = req.params;
        const cancelBooking = await cancelBooking(id);
        res.status(200).json({cancel})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}