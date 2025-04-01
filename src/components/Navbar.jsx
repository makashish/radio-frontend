import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "blue" }}>
      <h1>Radio Streaming</h1>
      {auth.currentUser ? (
        <button onClick={()=> signOut(auth)}>Logout</button>
        )  :  (
            <p>Login to save favorites</p>
          
        )}
      <Link to="/" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>Home</Link>
      <Link to="/favorites" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>Favorites</Link>
    </nav>
  );
};

export default Navbar;