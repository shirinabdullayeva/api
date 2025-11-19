
const todosBtn = document.getElementById("todosBtn");


async function loadTodos() {

    todosBtn.classList.add("border-b-2", "border-purple-600", "text-purple-600");
    postsBtn.classList.remove("border-b-2", "border-purple-600", "text-purple-600");
    albumsBtn.classList.remove("border-b-2", "border-purple-600", "text-purple-600");

    const todos = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
        .then(res => res.json());

    dataBox.innerHTML = todos.map(todo => `
    <div class="p-4 bg-white rounded shadow flex items-center gap-3">
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
            <span>${todo.title}</span>
    </div>
    `).join("");
}