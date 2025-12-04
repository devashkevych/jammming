import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist, { accessPlaylist } from "./components/Playlist/Playlist";
import { startAuth, authorize } from "./components/accessToken/accessToken";
import { fetchProfile, logout } from "./components/accessProfile/accessProfile";

function App() {
  const [token, setToken] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [tracklist, setTracklist] = useState([]);
  const [userID, setUserID] = useState("");
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    const handleAuth = async () => {
      await authorize();
      const expiresRaw = localStorage.getItem("expires_at");
      const expiresAt = expiresRaw ? Number(expiresRaw) : null;
      if (expiresAt && expiresAt < Date.now()) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('expires_at')
          localStorage.removeItem('userID')
          localStorage.removeItem('display_name')
          localStorage.removeItem('search')
      } 
      const newToken = localStorage.getItem("access_token");
      setToken(newToken);

      if (newToken) {
        await fetchProfile(newToken);
        const newUserID = localStorage.getItem("userID");
        const newDisplayName = localStorage.getItem('display_name')
        setUserID(newUserID);
        setDisplayName(newDisplayName)
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
        {!userID ? (
          <button className="App-login" onClick={startAuth}>
            Log in
          </button>
        ) : (
          <div className="App-loggedin">
            <h4 className="App-name">{displayName}</h4>
            <button className="App-logout" onClick={logout}>
              Log out
            </button>
          </div>
        )}
      </div>
      <header className="App-content">
        <div className="searchBar"><SearchBar token={token} userID={userID} onSearch={handleSearch} /></div>
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
