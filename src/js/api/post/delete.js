import { API_SOCIAL_POSTS } from "../constants.js";
import { authFetch } from "../authFetch.js";

export async function deletePost(id) {

    const deletePostUrl = `${API_SOCIAL_POSTS}/${id}`

    if(!id) {
        throw new error ("delete requires post ID")
    }

    const response = await authFetch(deletePostUrl, {
        method: "delete",
    });

    return await response.json();

}

deletePost(2122);


