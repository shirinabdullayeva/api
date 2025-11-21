









async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  renderPosts(posts);
}

async function getCommentCount(postId) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  const comments = await res.json();
  return comments.length;
}

async function renderPosts(posts) {
  const container = document.getElementById("feed");

  for (let post of posts) {
    const commentCount = await getCommentCount(post.id);
    const likes = Math.floor(Math.random() * 500);

    const card = `
      <div id="post-${post.id}" class="post-card border rounded-xl p-4 shadow-sm bg-white">

        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">L</div>
          <div>
            <h3 class="font-semibold">Leanne Graham</h3>
            <p class="text-gray-500">@Bret</p>
          </div>
        </div>

        <a href="./page/user.html">
          <img src="https://picsum.photos/500?random=${post.id}" 
               class="h-[200px] mb-4 w-full object-cover rounded-lg"/>
        </a>

        <div class="flex items-center justify-between px-1 mt-2">
          <div class="flex items-center gap-4 text-gray-700">

        
            <button class="like-btn flex items-center gap-1">
              <svg height="24" width="24" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2"
                   class="like-icon cursor-pointer">
                <path d="M12 21.35l-1.45-1.32C5 15.36 2 12.28 2 8.5
                 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1
                 C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5
                 c0 3.78-3 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>

            <button class="comment-btn" data-id="${post.id}">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   fill="none" stroke="currentColor" stroke-width="2"
                   class="h-6 w-6 text-gray-900">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8
                 8.5 8.5 0 0 1-7.6 4.7A8.38 8.38 0 0 1 
                 6.7 18L3 19l1-3.5a8.38 8.38 0 0 1-.9-3.8
                 8.5 8.5 0 1 1 17 0z"/>
              </svg>
            </button>

        
            <button class="share-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   fill="none" stroke="currentColor" stroke-width="2"
                   class="h-6 w-6 text-gray-900">
                   <circle cx="18" cy="5" r="3"></circle>
                   <circle cx="6" cy="12" r="3"></circle>
                   <circle cx="18" cy="19" r="3"></circle>
              </svg>
            </button>

          </div>

          <!-- SAVE BTN -->
          <button class="save-btn">
            <svg viewBox="0 0 24 24" height="24" width="24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 class="save-icon cursor-pointer">
              <polygon points="20 21 12 16 4 21 4 3 20 3 20 21"></polygon>
            </svg>
          </button>

        </div>

        <p class="text-gray-700 mb-4">${post.body}</p>

        <div class="flex justify-between text-gray-600">
          <span class="like-counter">${likes} likes</span>
          <span>${commentCount} comments</span>
        </div>

      </div>
    `;

    container.innerHTML += card;
  }
}

getPosts();




document.addEventListener("click", (e) => {


  const likeBtn = e.target.closest(".like-btn");
  if (likeBtn) {
    const svg = likeBtn.querySelector("svg");
    const post = likeBtn.closest(".post-card");
    const counter = post.querySelector(".like-counter");
    let likes = parseInt(counter.textContent);

    if (!svg.classList.contains("active")) {
      svg.classList.add("active");
      svg.setAttribute("fill", "red");
      svg.setAttribute("stroke", "red");
      counter.textContent = likes + 1 + " likes";
    } else {
      svg.classList.remove("active");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      counter.textContent = likes - 1 + " likes";
    }
  }


  const saveBtn = e.target.closest(".save-btn");
  if (saveBtn) {
    const svg = saveBtn.querySelector("svg");
    svg.classList.toggle("saved");
    svg.setAttribute("fill", svg.classList.contains("saved") ? "black" : "none");
  }

  // SHARE BTN
  const shareBtn = e.target.closest(".share-btn");
  if (shareBtn) {
    navigator.share
      ? navigator.share({ title: "Post", url: window.location.href })
      : alert("Share not supported");
  }

});





const commentModal = document.getElementById("commentModal");
const modalComments = document.getElementById("modalComments");
const closeModal = document.getElementById("closeModal");
const newCommentText = document.getElementById("newCommentText");
const sendComment = document.getElementById("sendComment");

let currentPostId = null;



document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".comment-btn");
  if (!btn) return;

  currentPostId = btn.dataset.id;
  commentModal.classList.remove("hidden");

  modalComments.innerHTML = "<p class='text-gray-500'>Loading comments...</p>";

  const comments = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${currentPostId}`
  ).then(res => res.json());

  modalComments.innerHTML = comments.map(c => `
    <div class="p-3 bg-gray-100 rounded-lg mb-2">
      <p class="font-semibold">${c.email}</p>
      <p>${c.body}</p>
    </div>
  `).join("");
});



closeModal.addEventListener("click", () => {
  commentModal.classList.add("hidden");
});
commentModal.addEventListener("click", (e) => {
  if (e.target === commentModal) commentModal.classList.add("hidden");
});



sendComment.addEventListener("click", () => {
  const text = newCommentText.value.trim();
  if (!text) return;

  modalComments.innerHTML += `
    <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-2">
      <p class="font-semibold">You</p>
      <p>${text}</p>
    </div>
  `;

  newCommentText.value = "";
});











;







