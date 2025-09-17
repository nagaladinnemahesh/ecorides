import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.js";
import "./rides.css";

function Rides() {
  const [rides, setRides] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/rides", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("api rides response:", res.data);

        if (Array.isArray(res.data)) {
          setRides(res.data);
          setMessage("");
        } else if (Array.isArray(res.data.rides)) {
          setRides(res.data.rides);
          setMessage("");
        } else {
          setRides([]);
          setMessage(res.data.message || "No rides available");
        }
      } catch (err) {
        console.error(
          "Error fetching rides: ",
          err.response?.data || err.message
        );
        setMessage("Failed to fetch rides.");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  if (loading) return <p className="loading">Loading rides...</p>;

  return (
    <div className="rides-container">
      <header className="rides-header">
        <h1>EcoRides 🚗</h1>
        <div className="user-info">
          <span>
            Hi, {user?.name} ({user?.role})
          </span>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/homepage";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {user?.role === "rider" && (
        <button
          className="create-btn"
          onClick={() => (window.location.href = "/rides/create")}
        >
          + Create Ride
        </button>
      )}

      {message && <p className="rides-message">{message}</p>}

      <div className="rides-grid">
        {rides.length > 0 &&
          rides.map((ride) => (
            <div key={ride._id} className="ride-card">
              <h3>
                {ride.origin} → {ride.destination}
              </h3>
              <p>
                <strong>Date:</strong>{" "}
                {ride.date ? new Date(ride.date).toLocaleString() : "Not set"}
              </p>
              <p>
                <strong>Seats:</strong> {ride.availableSeats}
              </p>
              <p>
                <em>Posted by: {ride.rider?.name || "Unknown"}</em>
              </p>
              {user?.role === "passenger" && (
                <button className="book-btn">Book Ride</button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Rides;
