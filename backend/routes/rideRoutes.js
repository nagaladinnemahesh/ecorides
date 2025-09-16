const express = require("express");
const {protect, authorizeRoles} = require("../middleware/authMiddleware");

const router = express.Router();

// Rider only - create ride

router.post("/create", protect, authorizeRoles("rider"), (req, res) => {
    res.json({message: `Ride created successfully by ${req.user.name}`})
});

// shared view: view all rides, any logged in user can view

router.get("/", protect, (req, res) => {
    res.json({message: " Showing available Rides(dummy)"})
});

module.exports = router;