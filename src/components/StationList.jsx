import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import RadioPlayer from "./RadioPlayer";

const StationList = () => {
  const [stations, setStations] = useState([]);
  const [currentStream, setCurrentStream] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get("https://radio-backend.onrender.com/api/stations")
      .then(res => setStations(res.data))
      .catch(err => console.error("Error fetching stations:", err));
  }, []);

  const addToFavorites = (station) => {
    if (!auth.currentUser) {
      alert("Please log in to save favorites.");
      return;
    }

    axios.post("https://radio-backend.onrender.com/api/favorites", {
      userId: auth.currentUser.uid,
      stationName: station.name,
      stationUrl: station.url
    }).then(() => alert("Added to favorites"))
      .catch(err => console.error("Error adding favorite:", err));
  };

  return (
    <div>
      <h2>Radio Stations</h2>
      {stations.map(station => (
        <div key={station._id}>
          <button onClick={() => setCurrentStream(station.url)}>{station.name}</button>
          <button onClick={() => addToFavorites(station)}>❤️ Save</button>
        </div>
      ))}
      {currentStream && <RadioPlayer streamUrl={currentStream} />}
    </div>
  );
};

export default StationList;