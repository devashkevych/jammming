import { useEffect, useState } from "react";

const clientId = "6a35cc5c249542dcb9a4095ccbcd0dab";
const redirectUri = window.location.origin;

export const startAuth = async () => {
  const generateRandomString = (len) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const vals = crypto.getRandomValues(new Uint8Array(len));
    return [...vals].map((v) => chars[v % chars.length]).join("");
  };

  const codeVerifier = generateRandomString(64);
  const sha256 = async (s) =>
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  const base64url = (buf) =>
    btoa(String.fromCharCode(...new Uint8Array(buf)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const codeChallenge = base64url(await sha256(codeVerifier));
  localStorage.setItem("code_verifier", codeVerifier);

  const auth = new URL("https://accounts.spotify.com/authorize");
  auth.search = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope:
      "playlist-modify-public playlist-modify-private playlist-read-private",

    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  }).toString();

  window.location.href = auth.toString();
};

export const authorize = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (!code) {
    return;
  }
  
  window.history.replaceState(null, "", window.location.pathname);
  
  const codeVerifier = localStorage.getItem("code_verifier");
  if (!codeVerifier) return;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  if (!res.ok) {
    console.error("Token exchange failed:", await res.text());
    return;
  }

  localStorage.removeItem('code_verifier')

  const data = await res.json();
  localStorage.setItem("access_token", data.access_token);
  if (data.refresh_token)
    localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem(
    "expires_at",
    String(Date.now() + data.expires_in * 1000)
  );
};
