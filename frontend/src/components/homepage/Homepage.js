import { Link } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>EcoRides 🚗</h1>
        <nav className="homepage-nav">
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/register" className="nav-btn">Register</Link>
        </nav>
      </header>

      <main className="homepage-main">
        <div className="intro-text">
          <h2>Welcome to EcoRides</h2>
          <p>
            EcoRides is your go-to carpool application 🌱  
            Share your ride as a driver or find affordable rides as a passenger.  
            Save money, reduce carbon footprint, and travel smart.
          </p>
          <Link to="/rides" className="explore-btn">Explore Rides</Link>
        </div>

        <div className="intro-image">
          <img src="https://images.unsplash.com/photo-1609132620304-5e5c76fcb973?auto=format&fit=crop&w=800&q=80" alt="Carpool illustration" />
        </div>
      </main>

      <footer className="homepage-footer">
        <p>© 2025 EcoRides - Share the road, share the planet.</p>
      </footer>
    </div>
  );
}

export default Homepage;
