// backend server configuration

import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from './routes/userRoutes.js';
const app = express();

// connect mongodb atls
dotenv.config();
connectDB()

//Middleware setup

app.use(cors());
app.use(express.json());

//routes

app.get("/", (req, res) => {
    res.send("EcoRides backend is Running successfully!!")
})

app.use("/api/auth", authRoutes)
app.use("/api/rides", rideRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/users", userRoutes)

//server listening

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})