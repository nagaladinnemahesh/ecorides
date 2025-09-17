<<<<<<< Updated upstream
const express = require("express");
const {protect, authorizeRoles} = require("../middleware/authMiddleware");
=======
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { getAvailableRides } from "../controllers/rideController.js";
>>>>>>> Stashed changes

const router = express.Router();

// Rider only - create ride
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

<<<<<<< Updated upstream
module.exports = router;
=======
// Shared view: View all available rides (real data)
router.get("/", protect, getAvailableRides);

export default router;
>>>>>>> Stashed changes
