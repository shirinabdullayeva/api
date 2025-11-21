const params = new URLSearchParams(window.location.search);
const userId = params.get("id") || 1;


async function loadUser() {
  const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(r => r.json());

  document.getElementById("userInfo").innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      <div class="flex-1">
          <h1 class="text-2xl font-semibold text-gray-800">${user.name}</h1>
          <p class="text-gray-500 mb-4">@${user.username}</p>

          <div class="flex flex-wrap gap-4 text-sm text-gray-600">
              <span><strong>${user.posts}</strong> posts</span>
              <span><strong>${user.albums}</strong> albums</span>
              <span><strong>${user.tasks}</strong> tasks</span>
          </div>

          <div class="flex gap-3 mt-3">
              <button class="bg-gray-800 text-white px-4 py-2 rounded-lg">Follow</button>
              <button class="border px-4 py-2 rounded-lg">Message</button>
          </div>
      </div>

    </div>

    <hr class="my-6">

    <div class="space-y-3 text-sm text-gray-600">
        <p class="flex items-center">📩 <span class="ml-3">${user.email}</span></p>
        <p class="flex items-center">📞 <span class="ml-3">${user.phone}</span></p>
        <p class="flex items-center">🌐 <span class="ml-3">${user.website}</span></p>
        <p class="flex items-center">📍 <span class="ml-3">${user.address.street}, ${user.address.city}</span></p>
        <p class="flex items-center">🏢 <span class="ml-3">${user.company.name}</span></p>
    </div>

    <blockquote class="mt-6 border-l-4 border-purple-600 pl-4 italic">
        "${user.company.catchPhrase}"
    </blockquote>
  `;
}

async function loadPosts() {
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(r => r.json());

  document.getElementById("posts").innerHTML = posts.map(p => `
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

  document.getElementById("albums").innerHTML = albums.map(a => `
    <div class="bg-white shadow rounded-xl p-2">
        <img src="https://picsum.photos/300?random=${a.id}" class="rounded-md">
        <p class="text-sm font-semibold mt-2">${a.title}</p>
    </div>
  `).join("");
}


async function loadTasks() {
  const todos = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    .then(r => r.json());

  document.getElementById("tasks").innerHTML = todos.map(t => `
    <div class="bg-white shadow p-3 rounded-xl flex items-center gap-3">
        <input type="checkbox" ${t.completed ? "checked" : ""}>
        <span>${t.title}</span>
    </div>
  `).join("");
}


document.querySelectorAll(".tab").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(b =>
      b.classList.remove("text-purple-600", "border-b-2", "border-purple-600")
    );

    btn.classList.add("text-purple-600", "border-b-2", "border-purple-600");

    document.querySelectorAll("#posts,#albums,#tasks").forEach(box =>
      box.classList.add("hidden")
    );

    document.getElementById(btn.dataset.target).classList.remove("hidden");
  };
});


loadUser();
loadPosts();
loadAlbums();
loadTasks();
