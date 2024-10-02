//import { authGuard } from "../../utilities/authGuard";
import { readPosts } from "../../api/post/read.js";

//authGuard();

function renderPosts(id, title, body, media, tags, container, maxLength = 250) {
    const blogPostBlockElement = document.createElement("div");
    blogPostBlockElement.classList.add("post-container");

    const cardContainerElement = document.createElement("div");
    cardContainerElement.classList.add("card-container");

    const verticalCardElement = document.createElement("a");
    verticalCardElement.classList.add("vertical-card");
    verticalCardElement.href = "./post/index.html?id=" + id;

    const articleElement = document.createElement("article");

    // Create media element (image) if media is available
    const mediaElement = document.createElement("img");
    if (media) {
        mediaElement.src = media;
        mediaElement.classList.add("post-img");
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

    container.appendChild(cardContainerElement);
}

export async function createPostsDisplay() {
    const posts = await readPosts();

    const latestPosts = posts.slice(0,12);

    const container = document.querySelector(".card-container")

    latestPosts.forEach(post => {
        if (post.media) {
            const title = post.title;
            const id = post.id;
            const body = post.body;
            const media = post.media ? post.media : null;
            const tags = post.tags.length > 0 ? post.tags : ["No tags"];

            renderPosts(id, title, body, media, tags, container, 200 )
        }
    });

}

createPostsDisplay()