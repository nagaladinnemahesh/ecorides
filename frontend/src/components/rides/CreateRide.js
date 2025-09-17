import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

function CreateRide() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [price, setPrice] = useState("");
//   const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/rides/create",
        { origin, destination, date, seatsAvailable, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Ride created successfully!");
      navigate("/rides");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create ride");
    }
  };

  return (
    <div className="create-ride-container">
      <h2>Create a New Ride</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Seats Available"
          value={seatsAvailable}
          onChange={(e) => setSeatsAvailable(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Create Ride</button>
      </form>
    </div>
  );
}

export default CreateRide;
