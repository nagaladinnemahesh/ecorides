import express from "express";
import {protect, authorizeRoles} from "../middleware/authMiddleware.js";

const router = express.Router();

// passenger only - book ride

router.post("/book", protect, authorizeRoles("passenger"), (req, res) => {
    res.json({message: `Ride booked successfully by ${req.user.name}`})
});

export default router;