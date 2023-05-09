import { login, signup } from "../../services";

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode === "signup") {
    return await signup(authData);
  }

  return await login(authData);
}
