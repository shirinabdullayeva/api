
const grid = document.getElementById("albumGrid");
const albumCountEl = document.getElementById("albumCount");

async function loadAlbums() {
    try {
      
        const res = await fetch("https://jsonplaceholder.typicode.com/albums");
        const albums = await res.json();

       
        const displayAlbums = albums.slice(0, 20);

        const albumsWithPhotos = await Promise.all(
            displayAlbums.map(async (album) => {
                const photosRes = await fetch(
                    `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`
                );
                const photos = await photosRes.json();
                return {
                    ...album,
                    photosCount: photos.length,
                    photos: photos.slice(0, 4).map(p => p.url) 
                };
            })
        );

     
        albumCountEl.textContent = `${albumsWithPhotos.length} albums`;

     
        albumsWithPhotos.forEach((album) => {
            const card = document.createElement("div");
            card.className ="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden";

          
            const photosHTML = album.photos.map(
                url => `<div class="bg-gray-100 flex items-center justify-center overflow-hidden">
                           <img src="https://picsum.photos/500?random=${album.id}" 
               class="h-[200px] mb-4 w-full object-cover rounded-lg"</img>
                        </div>`
            ).join("");

            card.innerHTML = `
    <div class="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src="https://picsum.photos/500?random=${album.id}" 
             alt="${album.title}" 
             class="w-full h-full object-cover rounded-lg" />
    </div>

    <div class="p-5">
        <h3 class="text-sm font-medium">${album.title}</h3>
    </div>

    <div class="flex items-center justify-between px-5 pb-4">
        <div class="flex items-center gap-2 text-gray-500">
            <svg width="16" height="16" fill="none" stroke="#888">
                <rect x="2" y="2" width="12" height="12"/>
            </svg>
            <span class="text-sm">${album.photosCount} photos</span>
        </div>

        <button class="text-purple-600 hover:text-purple-700">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 5l6 5-6 5"></path>
            </svg>
        </button>
    </div>
              
            `;

            grid.appendChild(card);
        });
    } catch (err) {
        console.error("Failed to load albums:", err);
        grid.textContent = "Failed to load albums.";
    }
}

loadAlbums();



