import { login} from "../api/auth/login.js";

export function setloginFormListener () {
    const form = document.querySelector("form[name='login']");


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const profile = Object.fromEntries(formData.entries());

    //send to API
    login(profile);
})
}

setloginFormListener();




