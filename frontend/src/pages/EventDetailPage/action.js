import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";

const url = "http://localhost:8080/events";

const action = async ({ params }) => {
  const { eventId } = params;
  const token = getAuthToken();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${url}/${eventId}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete the event." }, { status: 500 });
  } else {
    return redirect("/events");
  }
};

export default action;
