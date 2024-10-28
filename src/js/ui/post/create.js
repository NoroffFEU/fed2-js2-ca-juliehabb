import { createPost } from "../../api/post/create.js";

/**
 * Handles the creation of a new blog post.
 *
 * This function is triggered on the submission of the post creation form.
 * It retrieves the form data, constructs a post object, and sends it to the 
 * API to create a new post. If the post creation is successful, it returns 
 * the created post object. In case of an error, it logs the error message 
 * to the console.
 *
 * @async
 * @function onCreatePost
 * @param {Event} event - The event object representing the form submission.
 * @returns {Promise<Object|null>} A promise that resolves to the created post object, or null if an error occurred.
 *
 * @example
 * // Assuming there is a form with the name "createPost"
 * document.querySelector('form[name="createPost"]').addEventListener('submit', onCreatePost);
 */
export async function onCreatePost(event) {
    event.preventDefault();

    //get form data
    const form = event.target;
    const title = form.title.value;
    const body = form.body.value;
    const tags = form.tags.value.split(",").map(tag => tag.trim());
    const mediaUrl = form.media.value;

    const media = {
        url: mediaUrl
    };

    try {
        const post = await createPost({ title, body, tags, media});
        return post;
    } catch (error) {
        console.error("Error creating post:", error)
    }
}