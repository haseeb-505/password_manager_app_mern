import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import AddPasswords from "./components/AddPasswords.jsx";

function App() {
  return (
    // Wrap the app with Router
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-password" element={<AddPasswords />} />
      </Routes>
    </Router>
  );
}

export default App;
