import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist, { accessPlaylist } from "./components/Playlist/Playlist";
import { startAuth, authorize } from "./components/accessToken/accessToken";
// import { fetchTrack } from "./components/accessTrack/accessTrack";
import { fetchProfile, userID } from "./components/accessProfile/accessProfile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [searchResults, setSearchResults] = useState([]);
  const [tracklist, setTracklist] = useState([]);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const handleAuth = async () => {
      await authorize();
      const expiresAt = localStorage.getItem("expires_at");
      const newToken = localStorage.getItem("access_token");
      setToken(newToken);

      if (newToken) {
        await fetchProfile(newToken);
        const newUserID = localStorage.getItem("userID");
        setUserID(newUserID);
      }
      if (expiresAt < Date.now()) {
        localStorage.clear()
      } 
    };
    handleAuth();
  }, []);

  const handleSearch = (tracks) => {
    setSearchResults(tracks);
  };

  const addTrack = (track) => {
    setTracklist((prev) => {
      if (prev.some((t) => t.id === track.id)) return prev;
      return [...prev, track];
    });
  };

  const removeTrack = (track) => {
    setTracklist((prev) => {
      return prev.filter((t) => {
        return t.id !== track.id;
      });
    });
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="App-label">Jammming</h1>
        <button className="App-login" onClick={startAuth}>
          Log in
        </button>
      </div>
      <header className="App-content">
        <SearchBar token={token} userID={userID} onSearch={handleSearch} />
        <div className="mainContent">
          <SearchResults
            tracks={searchResults}
            onAdd={addTrack}
            isRemoval={false}
          />
          <Playlist
            token={token}
            userID={userID}
            tracks={tracklist}
            setTracklist={setTracklist}
            onRemove={removeTrack}
            isRemoval={true}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
