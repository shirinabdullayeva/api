async function getPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=60");
    const posts = await res.json();
    renderPosts(posts);
}

async function renderPosts(posts) {
    const container = document.getElementById("albumGrid");
    container.innerHTML = "";

    posts.forEach(post => {
        const card = `
      <div class="rounded-xl overflow-hidden shadow-sm bg-white">
          <img src="https://picsum.photos/500?random=${post.id}" 
               class="w-full h-[250px] object-cover"/>
      </div>
    `;
        container.innerHTML += card;
    });
}

getPosts();