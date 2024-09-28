import { load } from "./auth/key.js";
import { API_KEY } from "./constants.js";

// get an api key from api
//1. insert url
//2. return key

export async function getHeaders() {
    const token = await load("token");
    const apiKey = await load("apiKey");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Bearer token for authentication
        "X-Noroff-API-Key": apiKey
    };
}

// Behaves exactly like normal fetch, but includes headers (content type, authorization)
export async function authFetch(url, options) {
    const headers = await getHeaders();

    return fetch(url, {
        ...options,
        headers: {
            ...headers,  // Merge with any additional headers
            ...(options.headers || {}) // Ensure custom headers are included if passed
        }
    });
}


