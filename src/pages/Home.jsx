import { useEffect, useState } from "react";
import axios from "axios";
import StationList from "../components/StationList"; // Import StationList component

const Home = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:10000/api/stations") // Fetch radio stations from backend
      .then((res) => setStations(res.data))
      .catch((err) => console.error("Error fetching stations:", err));
  }, []);

  return (
    <div>
      <h1>Welcome to Radio Streaming App</h1>
      <StationList stations={stations} /> {/* Pass stations as props */}
    </div>
  );
};

export default Home;