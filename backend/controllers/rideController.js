import Ride from "../models/Ride.js";

// Get available rides
export const getAvailableRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate("driver", "name email")  // Driver's basic info
      .sort({ date: 1 });

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to load rides", error: error.message });
  }
};
