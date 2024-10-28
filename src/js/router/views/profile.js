//import { authGuard } from "../../utilities/authGuard";
import { readPosts, readPostsByUser } from "../../api/post/read.js";
import { deletePost } from "../../api/post/delete.js";

//authGuard();

/**
 * Renders a blog post card element in the specified container.
 *
 * This function creates a card layout for a blog post, including title, body, media, tags, 
 * and action buttons (edit and delete). It also handles the click events for editing and deleting the post.
 *
 * @param {number} id - The unique identifier for the blog post.
 * @param {string} title - The title of the blog post.
 * @param {string} body - The body content of the blog post.
 * @param {Object|null} media - An object containing media details, including a URL. Can be null if no media is available.
 * @param {Array<string>} tags - An array of tags associated with the blog post.
 * @param {HTMLElement} container - The DOM element where the blog post card will be appended.
 * @param {number} [maxLength=250] - The maximum length of the body content to display. If exceeded, the body will be truncated.
 *
 * @example
 * const postContainer = document.querySelector("#post-container");
 * renderPosts(1, "My First Post", "This is the content of my first post.", 
 *              { url: "image.jpg" }, ["tag1", "tag2"], postContainer);
 */
function renderPosts(id, title, body, media, tags, container, maxLength = 250) {

    const blogPostBlockElement = document.createElement("div");
    blogPostBlockElement.classList.add("post-container");
    blogPostBlockElement.id = `post-${id}`;

    const cardContainerElement = document.createElement("div");
    cardContainerElement.classList.add("card-container");

    const verticalCardElement = document.createElement("a");
    verticalCardElement.classList.add("vertical-card");
    verticalCardElement.href = "../post/index.html?id=" + id;

    const articleElement = document.createElement("article");

    const mediaElement = document.createElement("img");
    if (media && media.url) {
        mediaElement.src = media.url;
        mediaElement.classList.add("post-img");

        mediaElement.alt = "Post media";
    }

    const cardContentElement = document.createElement("div");
    cardContentElement.classList.add("v-card-content");

    const titleElement = document.createElement("h4");
    titleElement.textContent = title;
    titleElement.classList.add("card-title");

    // Create and define the body element
    const bodyElement = document.createElement("p");
    bodyElement.textContent = body.length > maxLength ? body.slice(0, maxLength) + "..." : body;
    bodyElement.classList.add("post-body");

    const tagContainerElement = document.createElement("div");
    tagContainerElement.classList.add("tag-marker");

    const tagsElement = document.createElement("p");
    tagsElement.textContent = tags.join(", ");

    //Edit and Delete Buttons:

    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("button-container");
    buttonContainer.style.display = "none";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", async (event) => {
        event.preventDefault();
        window.location.href = `../post/edit/index.html?id=${id}`;
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();

        // Remove the post from the DOM immediately
        blogPostBlockElement.remove(); 
    
        try {
            await deletePost(id);
            console.log(`Deleted post with id ${id}`);
    
            alert('Post deleted successfully!'); // Alert for successful deletion
        } catch (error) {
            console.error("Was not able to delete post", error);
    
            container.appendChild(blogPostBlockElement); // Restore the element to the DOM
    
            // Show error alert
            alert('Failed to delete post. Please try again.'); // Alert for failed deletion
        }
    });

    
    // Append all elements to the DOM
    blogPostBlockElement.appendChild(cardContainerElement);
    cardContainerElement.appendChild(verticalCardElement);
    verticalCardElement.appendChild(articleElement);
    if (media) {
        articleElement.appendChild(mediaElement);
    }
    articleElement.append(cardContentElement);
    cardContentElement.appendChild(titleElement);
    cardContentElement.appendChild(bodyElement);
    cardContentElement.appendChild(tagContainerElement);
    tagContainerElement.appendChild(tagsElement);

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);

    cardContentElement.appendChild(buttonContainer);


    container.appendChild(cardContainerElement);

    const updateProfileButton = document.querySelector(".updateprofile-btn");

    if (updateProfileButton) {
        updateProfileButton.addEventListener("click", (event) => {
            event.preventDefault();
    
            if(buttonContainer.style.display === "none") {
                buttonContainer.style.display = "flex";
            } 
        });
    }
}

/**
 * Creates and displays the latest 12 blog posts in the specified container.
 *
 * This function fetches all available posts, filters to get the latest 12, 
 * and renders them in the designated container. Each post includes its title, body, 
 * media, and tags. Posts without media are ignored.
 *
 * @async
 * @function createPostsDisplay
 * @returns {Promise<void>} A promise that resolves when the posts have been rendered.
 *
 * @example
 * // Call this function to display the latest blog posts.
 * createPostsDisplay();
 */
export async function createPostsDisplay() {
    const posts = await readPosts();

    const latestPosts = posts.slice(0,12);

    const container = document.querySelector(".card-container")
    const buttonContainer = document.querySelector(".button-container")

    latestPosts.forEach(post => {
        if (post.media) {
            const title = post.title;
            const id = post.id;
            const body = post.body;
            const media = post.media ? post.media : null;
            const tags = post.tags.length > 0 ? post.tags : ["No tags"];

            renderPosts(id, title, body, media, tags, container,buttonContainer, 200 )
        }
    });

}

/**
 * Fetches and displays all posts created by the currently logged-in user.
 *
 * This function retrieves the posts associated with the current user's profile
 * and renders each post in the designated container. If a post has media, it will
 * be included in the rendered output. If a post does not have any tags, it will 
 * display "No tags".
 *
 * @async
 * @function createPostsDisplayUser
 * @returns {Promise<Array>} A promise that resolves to an array of the user's posts.
 *
 * @example
 * // Call this function to display the user's posts.
 * createPostsDisplayUser().then(posts => {
 *     console.log("User's posts displayed:", posts);
 * });
 */
export async function createPostsDisplayUser() {
    const posts = await readPostsByUser();


    const container = document.querySelector(".card-container");


    posts.forEach(post => {
        const title = post.title;
            const id = post.id;
            const body = post.body;
            const media = post.media ? post.media : null;
            const tags = post.tags.length > 0 ? post.tags : ["No tags"];

            renderPosts(id, title, body, media, tags, container, 200);
    });

    console.log(posts);

    return posts;
}

createPostsDisplayUser();