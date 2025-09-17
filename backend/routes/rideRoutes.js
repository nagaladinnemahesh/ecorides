import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { getAvailableRides } from "../controllers/rideController.js";
import Ride from "../models/Ride.js";

const router = express.Router();

router.post("/create", protect, authorizeRoles("rider"), async (req, res) => {
    const { origin, destination, date, seatsAvailable, price } = req.body;

    try {
        const ride = await Ride.create({
            driver: req.user._id,
            origin,
            destination,
            date,
            seatsAvailable,
            price,
        });

        res.status(201).json({ message: `Ride created successfully by ${req.user.name}`, ride });
    } catch (error) {
        res.status(500).json({ message: "Ride creation failed", error: error.message });
    }
});

router.get("/", protect, getAvailableRides);

export default router;
