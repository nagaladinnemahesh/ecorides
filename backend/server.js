// backend server configuration

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// connect mongodb atls

connectDB()

//Middleware setup

app.use(cors());
app.use(express.json());

//routes

app.get("/", (req, res) => {
    res.send("EcoRides backend is Running successfully!!")
})

//server listening

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})