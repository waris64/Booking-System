import { prisma } from "../lib/prismaClient.js";

// Create the trip
export const createTrip = async (tripData) =>{
    return await prisma.trip.create({
        data:tripData,
    })
};


// Get all the availble trips
export const getAllTrips = async() =>{
    return await prisma.trip.findMany();
}

// Get one trip by id 
export const getTripById = async(id)=>{
return await prisma.trip.findUnique({
    where: {id:parseInt(id)},
    include:{
        bookings:true,
    }
})
}

// Update the trip

export const updateTrip = async (id,updates) =>{
    return await prisma.trip.update({
        where:{id:parseInt(id)},
        data:updates
    });
}

//Delete the trip 

export const deleteTrip = async (id) =>{
  return await prisma.trip.delete({
    where:{id:parseInt(id)},
  })
}