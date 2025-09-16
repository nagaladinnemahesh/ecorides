const express = require("express");
const {registerUser, loginUser} = require("../controllers/authController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

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


module.exports = router;
