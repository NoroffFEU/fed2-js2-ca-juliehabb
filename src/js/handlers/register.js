import { register } from "../api/auth/register.js";

export function setRegisterFormListener () {
    const form = document.querySelector("form[name='register']");


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const profile = Object.fromEntries(formData.entries());

    //send to API
    register(profile);
})
}

setRegisterFormListener();




