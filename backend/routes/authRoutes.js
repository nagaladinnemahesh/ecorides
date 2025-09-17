import express from "express";
import {registerUser, loginUser} from "../controllers/authController.js";
const router = express.Router();
import {protect} from "../middleware/authMiddleware.js";

// Public Routes

router.post("/register", registerUser);
router.post("/login", loginUser);

// trail for protected route

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user,
    })
})

export default router;
