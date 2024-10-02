import { API_AUTH_REGISTER } from "../constants.js"

export async function register({
  name,
  email,
  password,
  bio,
  banner,
  avatar,
}) {

  const registerURL = API_AUTH_REGISTER;

  const response = await fetch(registerURL, {
    method: 'POST', // Specify the method
    headers: {
      'Content-Type': 'application/json', // Set the content type
    },
    body: JSON.stringify({
      name,
      email,
      password,
      bio, 
      banner,
      avatar,
    }),
  });

  const result = await response.json();
  
  if (response.ok) {
    alert("You have been registered.");
  } else {
    alert("Registration failed: " + result.message);
  }

  console.log(result);
  
  return result;
}