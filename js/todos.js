// const taskList = document.getElementById("taskList");
// const countText = document.getElementById("countText");
// const progressBar = document.getElementById("progressBar");

// const filterAll = document.getElementById("filterAll");
// const filterPending = document.getElementById("filterPending");
// const filterCompleted = document.getElementById("filterCompleted");

// let tasks = []; 

// async function loadTasks() {
//     try {
//         const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
//         tasks = await res.json();
//         renderTasks();
//     } catch (err) {
//         console.error("Failed to load tasks:", err);
//         taskList.textContent = "Failed to load tasks.";
//     }
// }

// function renderTasks(filter = "all") {
//     taskList.innerHTML = "";

//     let filtered = tasks;
//     if (filter === "pending") filtered = tasks.filter(t => !t.completed);
//     if (filter === "completed") filtered = tasks.filter(t => t.completed);

//     filtered.forEach((task) => {
//         const row = document.createElement("div");
//         row.className = "flex items-center justify-between mb-2";

//         row.innerHTML = `
//             <div class="flex items-center gap-3">
//                 <span class="w-4 h-4 rounded-full border ${task.completed ? 'border-green-600 bg-green-600' : ''} flex-shrink-0"></span>
//                 <span class="text-sm ${task.completed ? 'line-through text-gray-400' : ''}">
//                     ${task.title}
//                 </span>
//             </div>

//             <span class="text-xs px-3 py-1 rounded-full border ${task.completed ? 'bg-black text-white' : 'text-gray-500'}">
//                 ${task.completed ? "Done" : "To Do"}
//             </span>
//         `;

//         taskList.appendChild(row);
//     });

 
//     const completed = tasks.filter(t => t.completed).length;
//     const total = tasks.length;

//     countText.textContent = `${completed} of ${total} completed`;
//     progressBar.style.width = `${(completed / total) * 100}%`;

  
//     filterAll.className = filter === "all"
//         ? "px-4 py-1.5 rounded-full bg-black text-white text-sm"
//         : "px-4 py-1.5 rounded-full bg-gray-200 text-sm";

//     filterPending.className = filter === "pending"
//         ? "px-4 py-1.5 rounded-full bg-black text-white text-sm"
//         : "px-4 py-1.5 rounded-full bg-gray-200 text-sm";

//     filterCompleted.className = filter === "completed"
//         ? "px-4 py-1.5 rounded-full bg-black text-white text-sm"
//         : "px-4 py-1.5 rounded-full bg-gray-200 text-sm";
// }


// filterAll.onclick = () => renderTasks("all");
// filterPending.onclick = () => renderTasks("pending");
// filterCompleted.onclick = () => renderTasks("completed");


// loadTasks();

           


const taskList = document.getElementById("taskList");
const countText = document.getElementById("countText");
const progressBar = document.getElementById("progressBar");

const filterAll = document.getElementById("filterAll");
const filterPending = document.getElementById("filterPending");
const filterCompleted = document.getElementById("filterCompleted");

// URL dan userId olish
const params = new URLSearchParams(window.location.search);
const userId = params.get("id") || 1; // id bo‘lmasa default 1-user

let tasks = [];

async function loadTasks() {
    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
        );
        tasks = await res.json();
        renderTasks();
    } catch (err) {
        console.error("Failed to load tasks:", err);
        taskList.textContent = "Failed to load tasks.";
    }
}

function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    let filtered = tasks;
    if (filter === "pending") filtered = tasks.filter(t => !t.completed);
    if (filter === "completed") filtered = tasks.filter(t => t.completed);

    filtered.forEach((task) => {
        const row = document.createElement("div");
        row.className = "flex items-center justify-between mb-2";

        row.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="w-4 h-4 rounded-full border ${task.completed ? 'border-green-600 bg-green-600' : ''}"></span>
                <span class="text-sm ${task.completed ? 'line-through text-gray-400' : ''}">
                    ${task.title}
                </span>
            </div>

            <span class="text-xs px-3 py-1 rounded-full border ${task.completed ? 'bg-black text-white' : 'text-gray-500'}">
                ${task.completed ? "Done" : "To Do"}
            </span>
        `;

        taskList.appendChild(row);
    });

    // Header counts
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;

    countText.textContent = `${completed} of ${total} completed`;
    progressBar.style.width = `${(completed / total) * 100}%`;

    // Filter button styles
    filterAll.className = filter === "all"
        ? "px-4 py-1.5 rounded-full bg-black text-white text-sm"
        : "px-4 py-1.5 rounded-full bg-gray-200 text-sm";

    filterPending.className = filter === "pending"
        ? "px-4 py-1.5 rounded-full bg-black text-white text-sm"
        : "px-4 py-1.5 rounded-full bg-gray-200 text-sm";

    filterCompleted.className = filter === "completed"
        ? "px-4 py-1.5 rounded-full bg-black text-white text-sm"
        : "px-4 py-1.5 rounded-full bg-gray-200 text-sm";
}

// Filter events
filterAll.onclick = () => renderTasks("all");
filterPending.onclick = () => renderTasks("pending");
filterCompleted.onclick = () => renderTasks("completed");

// Load tasks
loadTasks();
