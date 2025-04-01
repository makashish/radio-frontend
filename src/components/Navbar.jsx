import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>Home</Link>
      <Link to="/favorites" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>Favorites</Link>
    </nav>
  );
};

export default Navbar;