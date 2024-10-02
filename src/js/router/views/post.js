import { readPost } from "../../api/post/read.js";

alert("Single Post Page");

/**Adds blog post elements to page */

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

export async function createPostDisplay() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const post = await readPost(id);

    const container = document.querySelector(".post-container")

    const title = post.title;
    const body = post.body;
    const media = post.media ? post.media : null;
    const tags = post.tags.length > 0 ? post.tags : ["No tags"];

    renderPost(id, title, body, media, tags, container, 200 )
}

createPostDisplay()