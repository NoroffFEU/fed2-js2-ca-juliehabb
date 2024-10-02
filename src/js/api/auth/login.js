import { API_AUTH_LOGIN} from "../constants.js"
import * as storage from "../auth/key.js"

export async function login({
  email,
  password,
}) {

  const loginURL = API_AUTH_LOGIN;

  const response = await fetch(loginURL, {
    method: 'POST', // Specify the method
    headers: {
      'Content-Type': 'application/json', // Set the content type
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();

  storage.save("token", result.data.accessToken);
  storage.save("profile", result);
  
  if (response.ok) {
    alert("You have been logged in.");
  } else {
    alert("Login failed: " + result.message);
  }

  console.log(result);
  
  return result;
}