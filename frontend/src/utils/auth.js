import { redirect } from "react-router-dom";

const TOKEN_KEY = "token";
const EXPIRATION_KEY = "expiration";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem(EXPIRATION_KEY);
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function setAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);

  localStorage.setItem(EXPIRATION_KEY, expiration.toISOString());
}

export function removeAuthToken() {
  localStorage.clear(TOKEN_KEY);
  localStorage.clear(EXPIRATION_KEY);
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
