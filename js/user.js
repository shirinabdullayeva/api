async function loadUsers() {
    const users = await fetch("https://jsonplaceholder.typicode.com/users")
        .then(r => r.json());

    const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
        .then(r => r.json());

    const albums = await fetch("https://jsonplaceholder.typicode.com/albums")
        .then(r => r.json());

    const todos = await fetch("https://jsonplaceholder.typicode.com/todos")
        .then(r => r.json());

    const box = document.getElementById("usersPage");

    box.innerHTML = users.map(u => {
        const postCount = posts.filter(p => p.userId === u.id).length;
        const albumCount = albums.filter(a => a.userId === u.id).length;
        const todoCount = todos.filter(t => t.userId === u.id).length;

        return `
        <div class="p-6 rounded-xl shadow bg-white border">
            
            <!-- Avatar -->
            <div class="w-20 h-20 bg-purple-500 text-white text-3xl font-bold mx-auto rounded-full 
                        flex items-center justify-center">
                ${u.name[0].toUpperCase()}
            </div>

            <!-- Name -->
            <h2 class="text-center mt-4 text-xl font-bold">${u.name}</h2>
            <p class="text-center text-gray-500">@${u.username}</p>

            <!-- Stats -->
            <div class="grid grid-cols-3 bg-gray-100 rounded-lg p-4 mt-4 text-center">
                <div>
                    <p class="font-bold">${postCount}</p>
                    <p class="text-sm text-gray-500">Posts</p>
                </div>
                <div>
                    <p class="font-bold">${albumCount}</p>
                    <p class="text-sm text-gray-500">Albums</p>
                </div>
                <div>
                    <p class="font-bold">${todoCount}</p>
                    <p class="text-sm text-gray-500">Tasks</p>
                </div>
            </div>

            <!-- Contact info -->
            <div class="mt-5 space-y-2 text-gray-700">
                <p>📧 ${u.email}</p>
                <p>📞 ${u.phone}</p>
                <p>🌐 ${u.website}</p>
                <p>🏠 ${u.address.city}</p>
                <p>🏢 ${u.company.name}</p>
            </div>

            <p class="italic border-l-4 border-purple-500 pl-3 mt-4 text-sm text-gray-600">
                "${u.company.catchPhrase}"
            </p>
           <a href="./comment.html?userId=${u.id}">
            <button class="w-full bg-black text-white py-2 rounded-lg mt-5 hover:bg-gray-800">
                View Profile
            </button>
            </a>

        </div>
        `;
    }).join("");
}

loadUsers();




