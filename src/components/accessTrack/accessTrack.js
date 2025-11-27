export async function fetchTrack(token, track) {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${track}&type=track`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const res = await result.json();
  return res;
}
