import { redirect } from "react-router-dom";
import { removeAuthToken } from "../../utils/auth";

export function action() {
  removeAuthToken();

  return redirect("/");
}
