import { json, redirect } from "react-router-dom";
import { setAuthToken } from "../utils/auth";

const url = "http://localhost:8080";
const headers = {
  "Content-Type": "application/json",
};
const method = "POST";

const handleResponse = async (response) => {
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  setAuthToken(token);

  return redirect("/");
};

export const signup = async (authData) => {
  const response = await fetch(`${url}/signup`, {
    method,
    headers,
    body: JSON.stringify(authData),
  });

  return await handleResponse(response);
};

export const login = async (authData) => {
  const response = await fetch(`${url}/login`, {
    method,
    headers,
    body: JSON.stringify(authData),
  });

  return await handleResponse(response);
};
