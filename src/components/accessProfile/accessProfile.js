export async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const res = await result.json();
  localStorage.setItem("userID", res.id);
  localStorage.setItem('display_name', res.display_name)

  return res;
}

export function logout() {
  localStorage.clear()
  window.location.reload()
}