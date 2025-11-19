
const params = new URLSearchParams(window.location.search);
const userId = params.get("id") || 1;

async function loadUser() {
    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(r => r.json());

    document.getElementById("userInfo").innerHTML = `
    <div class="flex gap-5 shadow-xl rounded-xl  border-2 border-[white] p-5">
      <div class="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold">
        ${user.name[0]}
      </div>

      <div>
        <h1 class="text-2xl font-bold">${user.name}</h1>
        <p class="text-gray-500">@${user.username}</p>

        <div class="flex gap-5 mt-2 text-gray-700">
          <span>10 posts</span>
          <span>10 albums</span>
          <span>20 tasks</span>
        </div>

        <div class="flex gap-3 mt-4">
          <button class="px-5 py-1 bg-purple-600 text-white rounded-lg">Follow</button>
          <button class="px-5 py-1 border rounded-lg">Message</button>
        </div>

        <div class="mt-3">
          <p class="text-gray-600">${user.email}</p>
          <p class="text-gray-600">${user.phone}</p>
          <p class="text-gray-600">${user.website}</p>

          <p class="text-gray-500 mt-2 italic">
            "Multi-layered client-server neural-net"
          </p>
        </div>
      </div>
    </div>
  `;
}

async function loadPosts() {
    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(r => r.json());

    const container = document.getElementById("posts");

    container.innerHTML = posts.map(p => `
    <div class="bg-white rounded-xl shadow p-2">
      <img src="https://picsum.photos/300?random=${p.id}" class="rounded-lg">
      <div class="p-2">
        <p class="text-xs text-gray-500 mt-1">${p.title}</p>
      </div>
    </div>
  `).join("");
}

async function loadAlbums() {
    const albums = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then(r => r.json());

    const container = document.getElementById("albums");

    container.innerHTML = albums.map(a => `
    <div class="bg-white shadow rounded-xl p-2">
      <img src="https://picsum.photos/300?random=${a.id}" class="rounded-md">
      <p class="text-sm font-semibold mt-2">${a.title}</p>
    </div>
  `).join("");
}

async function loadTasks() {
    const todos = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        .then(r => r.json());

    const container = document.getElementById("tasks");

    container.innerHTML = todos.map(t => `
    <div class="bg-white shadow p-3 rounded-xl flex items-center gap-3">
      <input type="checkbox" ${t.completed ? "checked" : ""}>
      <span>${t.title}</span>
    </div>
  `).join("");
}


document.querySelectorAll(".tab").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".tab").forEach(b => b.classList.remove("text-purple-600", "border-b-2", "border-purple-600"));
        btn.classList.add("text-purple-600", "border-b-2", "border-purple-600");

        document.querySelectorAll("#posts,#albums,#tasks").forEach(box => box.classList.add("hidden"));
        document.getElementById(btn.dataset.target).classList.remove("hidden");
    };
});

// LOAD
loadUser();
loadPosts();
loadAlbums();
loadTasks();