// Import necessary dependencies

const favoritesContainer = document.getElementById("favorites-container");

document.getElementById("navbar-toggle").addEventListener("click", function () {
  const navbarLinks = document.getElementById("navbar-links");
  navbarLinks.classList.toggle("hidden");
});

// Fetch favorites from localStorage on load
document.addEventListener("DOMContentLoaded", displayFavorites);

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesContainer.innerHTML = ""; // Clear the container
  
    favorites.forEach((movie) => {
      const movieCard = `
              <div class="bg-white rounded shadow-md p-4">
                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full">
                  <h3 class="text-xl font-bold mt-2">${movie.title}</h3>
                  <p>${movie.release_date}</p>
                  <textarea id="note-${movie.id}" placeholder="Add notes..." class="border p-2 w-full">${movie.note || ''}</textarea>
                  <button class="save-notes bg-[#6DC8C8] text-white p-2 mt-2" data-movie-id="${movie.id}">Save Notes</button>
                  <button class="remove-from-favorites bg-red-500 text-white p-2 mt-2" data-movie-id="${movie.id}">Remove from Favorites</button>
              </div>
          `;
      favoritesContainer.innerHTML += movieCard;
    });
  
    // Attach event listeners to Remove buttons
    const removeFromFavoritesButtons = document.querySelectorAll(".remove-from-favorites");
    removeFromFavoritesButtons.forEach(button => {
      button.addEventListener("click", function() {
        const movieId = this.getAttribute("data-movie-id");
        removeFromFavorites(movieId);
      });
    });
  
    // Attach event listeners to Save Notes buttons
    const saveNotesButtons = document.querySelectorAll(".save-notes");
    saveNotesButtons.forEach(button => {
      button.addEventListener("click", function() {
        const movieId = this.getAttribute("data-movie-id");
        saveNotes(movieId);
      });
    });
  }
  

// Save notes to localStorage
function saveNotes(movieId) {
    const note = document.getElementById(`note-${movieId}`).value;
    console.log("Saving note for movie ID:", movieId, "Note:", note);
  
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    // Update the note for the specific movie
    favorites = favorites.map(movie => {
      if (movie.id == movieId) {
        movie.note = note; // Add or update the note
      }
      return movie;
    });
  
    // Save the updated favorites list to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  
    alert("Note saved!");
  }
  

// Made a little bit shorter
function removeFromFavorites(movieId) {
    console.log("Removing movie with ID:", movieId);
    // Retrieve and update favorites in one step
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(movie => movie.id != movieId);
  
    // Update the localStorage with the updated favorites list
    localStorage.setItem('favorites', JSON.stringify(favorites));
  
    // Re-render the favorites list
    displayFavorites();
  }
  



function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesContainer.innerHTML = ""; // Clear the current list

  favorites.forEach((movie) => {
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
