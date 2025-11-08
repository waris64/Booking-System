import { prisma } from "../lib/prismaClient.js";

export const createBooking = async (bookingData) => {
  const { userId, tripId, numberOfPeople } = bookingData;

  // Get the trip details
  const trip = prisma.trip.findUnique({
    where: { id: tripId },
  });

  // check the enough seats are avaiable or not?
  if (trip.availableSeats < numberOfPeople) {
    throw new Error("Not enough seats are available");
  }

  //Calculating the total price
  const totalPrice = trip.price * numberOfPeople;

  //Creating the booking entry
  const booking = prisma.booking.create({
    data: {
      userId,
      tripId,
      numberOfPeople,
      totalPrice,
    },
  });

  //Update the trip remaining seats
  await prisma.trip.update({
    where: { id: tripId },
    data: {
      availableSeats: trip.availableSeats - numberOfPeople,
    },
  });
  return booking;
};

// Get all the bookings (admin view)

export const getAllBookings = () => {
  prisma.booking.findMany({
    include: { Trip: true },
  });
};

//Get the booking by id (for user admin)

export const getBookingById = (id) => {
  return prisma.booking.findUnique({
    where: { id: parseInt(id) },
    include: { Trip: true },
  });
};

// updating the status

export const updateBookingStatus = (id, status) => {
  return prisma.booking.update({
    where: { id: parseInt(id) },
    data: { status },
  });
};

// Cancel the booking
export const cancelBooking = async (id) => {
  return prisma.booking.findUnique({
    id: parseInt(id),
  });
  if (!booking) throw new Error("No booking exist");

  //Restoring the seats

  data: {
    availableSeats: {
      increment: booking.numberOfPeople;
    }
  }
};

// Delete the booking
return await prisma.booking.delete({
  where: { id: parseInt(id) },
});
