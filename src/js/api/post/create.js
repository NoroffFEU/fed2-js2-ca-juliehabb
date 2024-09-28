import { API_SOCIAL_POSTS } from "../constants.js"
import { authFetch } from "../authFetch.js";
import { API_AUTH_KEY } from "../constants.js";
import { save } from "../auth/key.js";


// get an api key from api
//1. insert url
//2. return key

// get an API key from the API
export async function createKey() {
    const createKeyURL = API_AUTH_KEY;
    
    const response = await authFetch(createKeyURL, {
        method: "POST", 
        body: JSON.stringify({}) // Send empty data if no data is needed
    });

    const apiKey = await response.json();
    console.log(apiKey);

    save("apiKey", apiKey.data.key);
}

createKey();

export async function createPost({ title, body, tags, media }) {
    const createPostUrl = API_SOCIAL_POSTS;
    
    const response = await authFetch (createPostUrl, {

        method: "post",
        body: JSON.stringify({
            title,
            body,
            tags,
            media
        }),
    });

    const post =  await response.json();

    console.log(post);

}


createPost ({
    title: "test post",
    body: "random text"
});

console.log(post);

