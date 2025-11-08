import { prisma } from "../lib/prismaClient.js";

export const createTrip = async (req, res) => {
  try {
    const {
      title,
      price,
      duration,
      startDate,
      endDate,
      location,
      availableSeats,
    } = req.body;
    const trip = await prisma.trip.create({
      data: {
        title,
        price,
        duration,
        startDate,
        endDate,
        location,
        availableSeats,
      },
    });
    res.status(200).json(trip);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// call all the trips

export const allTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany();
    res.status(200).json({ trips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Trip
export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await prisma.trip.findUnique({
      where: { id: parseInt(id) },
    });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete the trip
export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.trip.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Trip Deleted successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
