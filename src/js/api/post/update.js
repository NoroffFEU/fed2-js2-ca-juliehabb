import { authFetch } from "../authFetch.js";
import { API_SOCIAL_POSTS } from "../constants.js";

/**
 * Updates an existing post in the API with new data.
 * 
 * @async
 * @function updatePost
 * @param {string} id - The ID of the post to update.
 * @param {Object} postDetails - The new details of the post.
 * @param {string} postDetails.title - The new title of the post.
 * @param {string} postDetails.body - The new body content of the post.
 * @param {Array<string>} postDetails.tags - An array of tags for the post.
 * @param {Array<string>} [postDetails.media] - An optional array of media URLs associated with the post.
 * @returns {Promise<Object>} A promise that resolves to the updated post object.
 * 
 * @throws {Error} Throws an error if the post ID is not provided.
 * 
 * @example
 * // Example usage:
 * updatePost('12345', {
 *   title: 'Updated Post Title',
 *   body: 'This is the updated body of the post.',
 *   tags: ['update', 'example'],
 *   media: ['https://example.com/image.jpg']
 * })
 * .then(updatedPost => {
 *   console.log('Post updated:', updatedPost);
 * })
 * .catch(error => {
 *   console.error('Error updating post:', error);
 * });
 */
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

    return updatedPost;
}
