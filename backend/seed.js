// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Ride from "./models/Ride.js";
import Booking from "./models/Booking.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error(err));

const seedData = async () => {
  try {
    // Clear old data
    await User.deleteMany();
    await Ride.deleteMany();
    await Booking.deleteMany();

    // Insert Users
    const users = await User.insertMany([
      {
        name: "Rajesh",
        email: "rajesh@example.com",
        password: "hashed",
        role: "rider",
      },
      {
        name: "Anita",
        email: "anita@example.com",
        password: "hashed",
        role: "rider",
      },
      {
        name: "Suresh",
        email: "suresh@example.com",
        password: "hashed",
        role: "rider",
      },
      {
        name: "Priya",
        email: "priya@example.com",
        password: "hashed",
        role: "passenger",
      },
      {
        name: "Vikram",
        email: "vikram@example.com",
        password: "hashed",
        role: "passenger",
      },
    ]);

    // Insert Rides (fixed fields: driver, seatsAvailable, price)
    const rides = await Ride.insertMany([
      {
        origin: "Hyderabad",
        destination: "Bangalore",
        date: new Date("2025-09-20T10:00:00Z"),
        seatsAvailable: 3,
        price: 500,
        driver: users[0]._id,
      },
      {
        origin: "Chennai",
        destination: "Pondicherry",
        date: new Date("2025-09-21T14:30:00Z"),
        seatsAvailable: 2,
        price: 300,
        driver: users[1]._id,
      },
      {
        origin: "Delhi",
        destination: "Agra",
        date: new Date("2025-09-22T09:00:00Z"),
        seatsAvailable: 4,
        price: 700,
        driver: users[2]._id,
      },
    ]);

    // Insert Bookings (fixed ride → not rideId)
    await Booking.insertMany([
      {
        ride: rides[0]._id,
        passenger: users[3]._id,
        seatsBooked: 1,
        status: "confirmed",
      },
      {
        ride: rides[1]._id,
        passenger: users[4]._id,
        seatsBooked: 2,
        status: "pending",
      },
    ]);

    console.log("Seeding successful!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedData();
