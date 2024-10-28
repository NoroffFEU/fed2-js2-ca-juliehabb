import { readPost } from "../../api/post/read.js";
import { onUpdatePost } from "../../ui/post/update.js";
//import { authGuard } from "../../utilities/authGuard";

//authGuard();

/**
 * Initializes the edit form with the content of the specified blog post.
 * 
 * This function retrieves a post based on the ID from the URL, populates 
 * the form fields with the current post data, and sets up an event listener 
 * for form submission to handle post updates.
 * 
 * @async
 * @function editFormPostContent
 * @returns {Promise<void>} A promise that resolves when the form is populated with post content.
 *
 * @throws {Error} Throws an error if the post cannot be retrieved.
 * 
 * @example
 * // Example usage:
 * editFormPostContent()
 *   .then(() => {
 *     console.log('Form populated with post content.');
 *   })
 *   .catch(error => {
 *     console.error('Error populating form:', error);
 *   });
 */
export async function editFormPostContent () {
    const form = document.querySelector('form[name="editPost"]');

    const url = new URL (location.href);
    const id = url.searchParams.get("id");

    if (form) {
        const response = await readPost(id);
        const post = response.data;

        form.title.value = post.title;
        form.body.value = post.body;
        form.tags.value = post.tags.join(", ");
        form.media.value = post.media;

        form.addEventListener("submit", onUpdatePost)
    }

}

editFormPostContent();
