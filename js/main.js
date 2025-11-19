
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  renderPosts(posts);
}
async function getCommentCount(postId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  const comments = await res.json();
  return comments.length;
}
async function renderPosts(posts) {
  const container = document.getElementById("feed");

  for (let post of posts) {
    const commentCount = await getCommentCount(post.id); 
    const likes = Math.floor(Math.random() * 500); 

    const card = `
  
      <div class="border rounded-xl p-4 shadow-sm bg-white">
       
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
            L
          </div>
          <div>
            <h3 class="font-semibold">Leanne Graham</h3>
            <p class="text-gray-500">@Bret</p>
          </div>
        </div>


 <a href="./page/user.html">
        <img src="https://picsum.photos/500?random=${post.id}" class="h-[200px] mb-4  w-full  object-cover rounded-lg"/>

</a>
       
            <div class="flex items-center justify-between px-1 mt-2">

                <div class="flex items-center gap-4 text-gray-700">

                    
                    <button class="like-btn">
                        <svg height="24" width="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2"
                             class="like-icon cursor-pointer">
                             <path d="M16.792 3.904A4.989 4.989 0 0 1 21 8.278c0 3.07-2.652 
                                      4.856-5.197 7.222C13.03 18.42 12 19.5 12 19.5s-1.03-1.08-3.803-3.999C5.652 
                                      13.134 3 11.348 3 8.278a4.989 4.989 0 0 1 4.208-4.374A4.21 4.21 0 0 1 12 
                                      5.248a4.21 4.21 0 0 1 4.792-1.344Z"></path>
                        </svg>
                    </button>

                  
                    <button class="comment-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle h-6 w-6 text-gray-900" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg>
                    </button>

                  
                    <button class="share-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2 lucide-share-2 h-6 w-6 text-gray-900" aria-hidden="true"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
                    </button>

                </div>

              
                <button class="save-btn">
                    <svg viewBox="0 0 24 24" height="24" width="24" fill="none"
                         stroke="currentColor" stroke-width="2"
                         class="save-icon cursor-pointer">
                        <polygon points="20 21 12 16 4 21 4 3 20 3 20 21"></polygon>
                    </svg>
                </button>

            </div>


        <p class="text-gray-700 mb-8">${post.body}</p>

      
        <div class="flex justify-between text-gray-600">
          <span>${likes} likes</span>
          <span>${commentCount} comments</span>
        </div>
      </div>
    `;

    container.innerHTML += card;
  }
}
getPosts();

document.addEventListener("click", (e) => {


  if (e.target.closest(".like-btn")) {
    const icon = e.target.closest(".like-btn").querySelector("svg");

    if (!icon.classList.contains("active")) {
      icon.classList.add("active");
      icon.setAttribute("fill", "red");
      icon.setAttribute("stroke", "red");
    } else {
      icon.classList.remove("active");
      icon.setAttribute("fill", "none");
      icon.setAttribute("stroke", "currentColor");
    }
  }


  if (e.target.closest(".save-btn")) {
    const icon = e.target.closest(".save-btn").querySelector("svg");

    if (!icon.classList.contains("saved")) {
      icon.classList.add("saved");
      icon.setAttribute("fill", "black");
    } else {
      icon.classList.remove("saved");
      icon.setAttribute("fill", "none");
    }
  }
});

loadPosts();




document.addEventListener("DOMContentLoaded", () => {


  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const icon = btn.querySelector("i");

      const container = btn.closest(".post-card");
      const likeCounter = container.querySelector(".like-count");

      let count = Number(likeCounter.textContent);

      if (icon.classList.contains("fa-regular")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid", "text-red-500");
        likeCounter.textContent = count + 1;
      } else {
        icon.classList.remove("fa-solid", "text-red-500");
        icon.classList.add("fa-regular");
        likeCounter.textContent = count - 1;
      }
    });
  });


  document.querySelectorAll(".save-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const icon = btn.querySelector("i");

      icon.classList.toggle("fa-regular");
      icon.classList.toggle("fa-solid");
    });
  });


  document.querySelectorAll(".comment-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Comments opened...");

    });
  });


  document.querySelectorAll(".share-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Shared");
      navigator.share?.({
        title: "Post",
        url: window.location.href
      });
    });
  });

});


document.addEventListener("click", async (e) => {

  const cbtn = e.target.closest(".comment-btn");
  if (cbtn) {
    const postId = cbtn.dataset.id;
    const commentBox = document.querySelector(`#post-${postId} .comments`);

    if (commentBox.classList.contains("hidden")) {

      const comments = await (await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)).json();

      let html = "";
      comments.forEach(c => {
        html += `
                    <div class="p-3 mb-2 bg-gray-100 rounded-lg">
                        <p class="font-semibold">${c.email}</p>
                        <p>${c.body}</p>
                    </div>
                `;
      });

      commentBox.innerHTML = html;
      commentBox.classList.remove("hidden");

    } else {
      commentBox.classList.add("hidden");
    }
  }
});

loadPosts();






