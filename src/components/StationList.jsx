import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";
import RadioPlayer from "./RadioPlayer";

const fallbackStations = [
  { id: 1, name: "AIR FM Gold", url: "https://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8" },
  { id: 2, name: "AIR Rainbow", url: "https://air.pc.cdn.bitgravity.com/air/live/pbaudio002/playlist.m3u8" }
];

const StationList = () => {
  const [stations, setStations] = useState([]);
  const [currentStream, setCurrentStream] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch radio stations from the backend API
    axios.get("http://localhost:5000/api/stations")
      .then(res => setStations(res.data.length ? res.data : fallbackStations)) // Use API data or fallback
      .catch(err => {
        console.error("Error fetching stations:", err);
        setStations(fallbackStations); // Use fallback if API fails
      });

    // Fetch favorite stations if user is logged in
    const fetchFavorites = async () => {
      if (auth.currentUser) {
        try {
          const res = await axios.get(`http://localhost:5000/api/favorites/${auth.currentUser.uid}`);
          setFavorites(res.data);
        } catch (err) {
          console.log("Error fetching favorites:", err);
        }
      }
    };

    fetchFavorites();
  }, []);

  const addToFavorites = async (station) => {
    if (!auth.currentUser) {
      alert("Please log in to save favorites.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/favorites", {
        userId: auth.currentUser.uid,
        stationName: station.name,
        stationUrl: station.url
      });
      setFavorites([...favorites, station]); // Update favorites state
      alert("Added to favorites");
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  return (
    <div>
      <h2>Radio Stations</h2>
      {stations.length === 0 ? (
        <p>Loading stations...</p>
      ) : (
        stations.map((station) => (
          <div key={station._id || station.id}>
            <button onClick={() => setCurrentStream(station.streamUrl || station.url)}>
              {station.name}
            </button>
            <button onClick={() => addToFavorites(station)}>
              {favorites.some(fav => fav.stationUrl === (station.streamUrl || station.url)) ? "❤️ Saved" : "🤍 Save"}
            </button>
          </div>
        ))
      )}
      {currentStream && <RadioPlayer streamUrl={currentStream} />}
    </div>
  );
};

export default StationList;