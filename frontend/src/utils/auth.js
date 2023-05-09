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
