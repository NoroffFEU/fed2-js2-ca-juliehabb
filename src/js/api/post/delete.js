import { API_SOCIAL_POSTS } from "../constants.js";
import { authFetch } from "../authFetch.js";

/**
 * Deletes a post from the social API by its ID.
 * 
 * @async
 * @function deletePost
 * @param {string} id - The ID of the post to be deleted.
 * @returns {Promise<Object|undefined>} A promise that resolves to the response data if the post is deleted, or undefined if the deletion is successful with no content.
 * 
 * @throws {Error} Throws an error if the post ID is not provided.
 * 
 * @example
 * // Example usage:
 * deletePost('12345')
 *   .then(response => {
 *     console.log('Post deleted:', response);
 *   })
 *   .catch(error => {
 *     console.error('Error deleting post:', error);
 *   });
 */
export async function deletePost(id) {

    const deletePostUrl = `${API_SOCIAL_POSTS}/${id}`

    if(!id) {
        throw new error ("delete requires post ID")
    }

    const response = await authFetch(deletePostUrl, {
        method: "DELETE",
    });

    if (response.status === 204) {
        return;
    }

    const responseData = await response.json();
    return responseData;

}


