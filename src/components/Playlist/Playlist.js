import React, { useState } from "react";
import styles from "./Playlist.module.css";
import Tracklist from "../Tracklist/Tracklist";
import { fetchProfile } from "../accessProfile/accessProfile";

export async function accessPlaylist(token, userID, playlistName, trackUris) {
  const res = await fetch(
    `https://api.spotify.com/v1/users/${userID}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlistName || "New Playlist",
        description: "Created with Jammming",
        public: false,
      }),
    }
  );

  const playlist = await res.json();
  await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: trackUris,
    }),
  });
  return playlist;
}

function Playlist({
  token,
  userID,
  tracks,
  setTracklist,
  onRemove,
  isRemoval,
}) {
  const [playlistName, setPlaylistName] = useState("");

  const savePlaylist = async () => {
    if (!token) {
      alert("Please log in");
      return;
    }
    const trackUris = tracks.map((track) => track.uri);
    await accessPlaylist(token, userID, playlistName, trackUris);

    setPlaylistName("");
    setTracklist([]);
  };

  return (
    <>
      <div className={styles.playlist}>
        <input
          className={styles.playlistTitleInput}
          placeholder="Edit playlist name..."
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        ></input>
        <Tracklist tracks={tracks} onRemove={onRemove} isRemoval={isRemoval} />
        <button className={styles.saveButton} onClick={savePlaylist}>
          Save
        </button>
      </div>
    </>
  );
}

export default Playlist;
