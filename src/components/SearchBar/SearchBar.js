import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { fetchTrack } from "../accessTrack/accessTrack";

function SearchBar({ token, userID, onSearch }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (search) => {
    if (!search) {
      alert("Enter a song name");
      return;
    }

    if (!token || !userID) {
      alert("Please log in");
      return;
    }

    try {
      const results = await fetchTrack(token, search);

      const tracks = results.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
      onSearch(tracks);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          value={search}
          type="text"
          onChange={handleChange}
          placeholder="Enter song name..."
        ></input>
        <button className={styles.button} onClick={() => handleSubmit(search)}>
          Search
        </button>
      </div>
    </>
  );
}

export default SearchBar;
