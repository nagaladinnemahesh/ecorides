import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/login/Login.js';
import Register from './components/register/Register.js';
import Rides from './components/rides/Rides.js';
import CreateRide from "./components/rides/CreateRide.js";
import Homepage  from "./components/homepage/Homepage.js";

// import Bookings from './pages/Bookings';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/rides/create" element={<CreateRide />}/>
      </Routes>
    </Router>
  )
}

export default App;