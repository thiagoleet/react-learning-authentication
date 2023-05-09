import { redirect } from "react-router-dom";

const STORE_KEY = "token";

export function getAuthToken() {
  const token = localStorage.getItem(STORE_KEY);

  return token;
}

export function setAuthToken(token) {
  localStorage.setItem(STORE_KEY, token);
}

export function removeAuthToken() {
  localStorage.clear(STORE_KEY);
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
