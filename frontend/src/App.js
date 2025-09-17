import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Rides from './components/rides/Rides';
// import Bookings from './pages/Bookings';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rides" element={<Rides />} />
      </Routes>
    </Router>
  )
}

export default App;