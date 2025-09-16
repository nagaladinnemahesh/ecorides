const express = require("express");
const {protect, authorizeRoles} = require("../middleware/authMiddleware");

const router = express.Router();

// passenger only - book ride

router.post("/book", protect, authorizeRoles("passenger"), (req, res) => {
    res.json({message: `Ride booked successfully by ${req.user.name}`})
});

module.exports = router;