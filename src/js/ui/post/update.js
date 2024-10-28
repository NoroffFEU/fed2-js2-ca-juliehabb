import { updatePost } from "../../api/post/update.js";

/**
 * Handles the update of an existing blog post.
 *
 * This function is triggered on the submission of the post update form.
 * It retrieves the form data, constructs an update object, and sends it to 
 * the API to update the specified post. If the update is successful, it 
 * alerts the user and logs the updated post object. In case of an error, 
 * it logs the error message and alerts the user about the failure.
 *
 * @async
 * @function onUpdatePost
 * @param {Event} event - The event object representing the form submission.
 * @returns {Promise<void>} A promise that resolves when the update process is complete.
 *
 * @example
 * // Assuming there is a form with the name "editPost"
 * document.querySelector('form[name="editPost"]').addEventListener('submit', onUpdatePost);
 */
export async function onUpdatePost(event) {

    event.preventDefault();

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

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
        const post = await updatePost(id, { title, body, tags, media});
        console.log(post);

        alert("post updated successfully!");

    } catch (error) {
        console.error("Error updating post:", error)
        alert("failed to update post. Please try again.");
    }
}
