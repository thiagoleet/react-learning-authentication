import { json, redirect } from "react-router-dom";

const url = "http://localhost:8080";
const headers = {
  "Content-Type": "application/json",
};
const method = "POST";

const handleResponse = (response) => {
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  // soon: manage token
  return redirect("/");
};

export const signup = async (authData) => {
  const response = await fetch(`${url}/signup`, {
    method,
    headers,
    body: JSON.stringify(authData),
  });

  return handleResponse(response);
};

export const login = async (authData) => {
  const response = await fetch(`${url}/login`, {
    method,
    headers,
    body: JSON.stringify(authData),
  });

  return handleResponse(response);
};
