import { authFetch } from "../authFetch.js";
import { API_SOCIAL_POSTS } from "../constants.js";

export async function updatePost(id, { title, body, tags, media }) {


    const updatePostUrl = `${API_SOCIAL_POSTS}/${id}`

    if(!id) {
        throw new error ("update requires post ID")
    }

    const response = await authFetch(updatePostUrl, {
        method: "put",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            body,
            tags,
            media,
        }),
    });

    const updatedPost =  await response.json();

    console.log(updatedPost);
}

updatePost(2122, {
    title: "updated example title",
    body: "example updated",
})

