import { readPost } from "../../api/post/read.js";


/**
 * Adds blog post elements to the specified container in the DOM.
 *
 * @param {string} title - The title of the blog post.
 * @param {string} body - The body content of the blog post.
 * @param {string|null} media - The URL of the media (image) associated with the post, or null if not available.
 * @param {Array<string>} tags - An array of tags associated with the blog post.
 * @param {HTMLElement} container - The DOM element where the post elements will be appended.
 */
function renderPost(title, body, media, tags, container) {
    const blogPostBlockElement = document.createElement("div");
    blogPostBlockElement.classList.add("post-container");

    const articleElement = document.createElement("article");
   
    // Create media element (image) if media is available
    const mediaElement = document.createElement("img");
    if (media) {
        mediaElement.src = media;
        mediaElement.classList.add("post-img");
    }
    const textContentElement = document.createElement("div");
    textContentElement.classList.add("t-content");

    const titleElement = document.createElement("h1");
    titleElement.textContent = title;
    titleElement.classList.add("post-title");

    // Create and define the body element
    const bodyElement = document.createElement("p");
    bodyElement.textContent = body;
    bodyElement.classList.add("post-body");

    const tagContainerElement = document.createElement("div");
    tagContainerElement.classList.add("tag-marker");

    const tagsElement = document.createElement("p");
    tagsElement.textContent = tags.join(", ");
    
    blogPostBlockElement.appendChild(articleElement);
    if (media) {
        articleElement.appendChild(mediaElement);
    }
    articleElement.appendChild(textContentElement);
    textContentElement.appendChild(titleElement);
    textContentElement.appendChild(bodyElement);
    textContentElement.appendChild(tagContainerElement);
    tagContainerElement.appendChild(tagsElement);

    container.appendChild(blogPostBlockElement);
}

/**
 * Creates and displays a blog post by fetching its details from the API and rendering it to the page.
 *
 * @async
 * @function createPostDisplay
 * @returns {Promise<void>} A promise that resolves when the post has been displayed.
 *
 * @throws {Error} Throws an error if the post cannot be retrieved.
 *
 * @example
 * // Example usage:
 * createPostDisplay()
 *   .then(() => {
 *     console.log('Post displayed successfully.');
 *   })
 *   .catch(error => {
 *     console.error('Error displaying post:', error);
 *   });
 */
export async function createPostDisplay() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const postResponse = await readPost(id);
    const post = postResponse.data;

    const container = document.querySelector(".post-container");

    const title = post.title;
    const body = post.body;
    const media = post.media ? post.media.url : null;

    const tags = Array.isArray(post.tags) && post.tags.length > 0 ? post.tags : ["no tags"];

    renderPost(title, body, media, tags, container, id);
   
}

createPostDisplay()