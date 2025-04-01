import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Example component
import Home from "./pages/Home"; // Example Page
import Login from "./pages/Login"; // Example Page

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{ background: darkMode ? "#222" : "#fff", color: darkMode ? "#fff" : "#000", height: "100vh" }}>
      <Router>
        <Navbar />
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;