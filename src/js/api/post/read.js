import { API_SOCIAL_POSTS } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**Gets singular post from api */
export async function readPost(id) {
    const getPostUrl = `${API_SOCIAL_POSTS}/${id}`

    if(!id) {
        throw new error ("get requires post ID")
    }

    const response = await authFetch(getPostUrl, {
        method: "get",
    });

    return await response.json();
}

/** Gets all posts from api */
export async function readPosts(limit = 12, page = 1, tag) {
    const getPostsUrl = API_SOCIAL_POSTS;

    const response = await authFetch(getPostsUrl);

    const posts = await response.json();

    return posts.data
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}

//readPosts().then(console.log);

//readPost(2441).then(console.log);