import { API_SOCIAL_POSTS } from "../constants.js";
import { API_SOCIAL_PROFILES} from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Retrieves a singular post from the API using the specified post ID.
 * 
 * @async
 * @function readPost
 * @param {string} id - The ID of the post to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the post object.
 * 
 * @throws {Error} Throws an error if the post ID is not provided.
 * 
 * @example
 * // Example usage:
 * readPost('12345')
 *   .then(post => {
 *     console.log('Post details:', post);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching post:', error);
 *   });
 */
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

/**
 * Retrieves all posts from the API with optional pagination.
 * 
 * @async
 * @function readPosts
 * @param {number} [limit=12] - The maximum number of posts to retrieve.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - An optional tag to filter the posts.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of post objects.
 * 
 * @example
 * // Example usage:
 * readPosts(10, 2)
 *   .then(posts => {
 *     console.log('Posts:', posts);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching posts:', error);
 *   });
 */
export async function readPosts(limit = 12, page = 1, tag) {
    const getPostsUrl = API_SOCIAL_POSTS;

    const response = await authFetch(getPostsUrl);

    const posts = await response.json();

    return posts.data
}

/**
 * Retrieves posts created by a specific user from the API.
 * If the username is not provided, it retrieves it from localStorage.
 * 
 * @async
 * @function readPostsByUser
 * @param {string} [username] - The username of the user whose posts are to be retrieved.
 * @param {number} [limit=12] - The maximum number of posts to retrieve.
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [tag] - An optional tag to filter the posts.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of post objects created by the specified user.
 * 
 * @throws {Error} Throws an error if the username is not found in localStorage.
 * 
 * @example
 * // Example usage:
 * readPostsByUser('john_doe')
 *   .then(posts => {
 *     console.log('User posts:', posts);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching user posts:', error);
 *   });
 */
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
    // If username is not provided, retrieve it from localStorage
    const profile = JSON.parse(localStorage.getItem("profile"));
    username = profile?.data?.name; 

    // Check if username exists
    if (!username) {
        throw new Error("Username not found in localStorage");
    }
    const getPostsUrl = `${API_SOCIAL_PROFILES}/${username}/posts?limit=${limit}&page=${page}`;

    const response = await authFetch(getPostsUrl);

    const posts = await response.json();

    return posts.data;
}