const favoritesContainer = document.getElementById("favorites-container");
document.getElementById("navbar-toggle").addEventListener("click", function() {
    const navbarLinks = document.getElementById("navbar-links");
    navbarLinks.classList.toggle("hidden");
});
// Fetch favorites from localStorage on load
document.addEventListener("DOMContentLoaded", displayFavorites);
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesContainer.innerHTML = ""; // Clear the container
    favorites.forEach((movie)=>{
        const movieCard = `
            <div class="bg-white rounded shadow-md p-4">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full">
                <h3 class="text-xl font-bold mt-2">${movie.title}</h3>
                <p>${movie.release_date}</p>
                <textarea id="note-${movie.id}" placeholder="Add notes..." class="border p-2 w-full"></textarea>
                <button onclick="saveNotes(${movie.id})" class="bg-[#6DC8C8] text-white p-2 mt-2">Save Notes</button>
                <button onclick="removeFromFavorites(${movie.id})" class="bg-red-500 text-white p-2 mt-2">Remove from Favorites</button>
            </div>
        `;
        favoritesContainer.innerHTML += movieCard;
    });
}
// Save notes to localStorage
function saveNotes(movieId) {
    const note = document.getElementById(`note-${movieId}`).value;
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites = favorites.map((movie)=>{
        if (movie.id === movieId) movie.note = note; // Add note to the movie object
        return movie;
    });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Note saved!");
}
function removeFromFavorites(movieId) {
    // Get the favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Filter out the movie to be removed
    favorites = favorites.filter((movie)=>movie.id !== movieId);
    // Update the localStorage with the updated favorites list
    localStorage.setItem("favorites", JSON.stringify(favorites));
    // Re-render the favorites list or remove the movie card from the DOM
    renderFavorites(); // Assuming you have a function to re-render the favorites list
}
function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesContainer.innerHTML = ""; // Clear the current list
    favorites.forEach((movie)=>{
        const movieCard = `
            <div class="bg-white rounded shadow-md p-4">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full">
                <h3 class="text-xl font-bold mt-2">${movie.title}</h3>
                <p>${movie.release_date}</p>
                <textarea id="note-${movie.id}" placeholder="Add notes..." class="border p-2 w-full"></textarea>
                <button onclick="saveNotes(${movie.id})" class="bg-[#6DC8C8] text-white p-2 mt-2">Save Notes</button>
                <button onclick="removeFromFavorites(${movie.id})" class="bg-red-500 text-white p-2 mt-2">Remove from Favorites</button>
            </div>
        `;
        favoritesContainer.innerHTML += movieCard;
    });
}

//# sourceMappingURL=journal.3baf8fdf.js.map
