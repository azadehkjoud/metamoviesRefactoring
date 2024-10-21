// Import necessary dependencies
const apiKey = "146c2867b133120789aa9d2e0de77730";
const moviesContainer = document.getElementById("movies-container");
const toggleButton = document.getElementById("navbar-toggle");
const navbarLinks = document.getElementById("navbar-links");
let allMoviesData = [];
// Navbar toggle
document.getElementById("navbar-toggle").addEventListener("click", function() {
    const navbarLinks = document.getElementById("navbar-links");
    navbarLinks.classList.toggle("hidden");
    console.log("Navbar toggled.");
});
// Search movie event listener
document.querySelector("#search-movie").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("Search initiated with input:", document.querySelector("#search-movie").value);
        searchMovies(allMoviesData);
    }
});
// Fetch popular movies on load
document.addEventListener("DOMContentLoaded", fetchPopularMovies);
async function fetchPopularMovies() {
    console.log("Fetching popular movies...");
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const data = await response.json();
        console.log("Popular movies fetched successfully:", data);
        allMoviesData = data.results;
        displayMovies(allMoviesData);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}
function displayMovies(movies) {
    console.log("Displaying movies:", movies);
    moviesContainer.innerHTML = ""; // Clear previous movies
    movies.forEach((movie)=>{
        const movieCard = `
      <div class="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-auto object-cover rounded-t-lg">
        <div class="mt-4">
          <h3 class="text-lg md:text-xl font-bold">${movie.title}</h3>
          <p class="text-gray-500 text-sm md:text-base">${movie.release_date}</p>
          <button onclick="addToFavorites(${movie.id})" class="bg-[#6DC8C8] hover:bg-[#5ababa] text-white py-2 px-4 mt-4 block w-full text-center rounded-md">Add to Favorites</button>
        </div>
      </div>
    `;
        moviesContainer.innerHTML += movieCard;
    });
}
// Used async/await instead of .then/catch
async function addToFavorites(movieId) {
    console.log("Adding movie to favorites with ID:", movieId);
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movie = await response.json();
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        // Check if the movie is already in the favorites
        const movieExists = favorites.some((favMovie)=>favMovie.id === movie.id);
        if (!movieExists) {
            favorites.push(movie); // Add the movie if it doesn't already exist
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert(`${movie.title} added to favorites!`);
            console.log(`${movie.title} added to favorites!`);
        } else {
            alert(`${movie.title} is already in your favorites!`);
            console.log(`${movie.title} is already in your favorites.`);
        }
    } catch (error) {
        console.error("Error fetching movie:", error);
    }
}
// Search movies function
function searchMovies(movies) {
    const input = document.querySelector("#search-movie").value.toLowerCase();
    console.log("Searching for movies starting with:", input);
    // Filter movies where titles start with the search input
    const filteredMovies = movies.filter((movie)=>movie.title.toLowerCase().startsWith(input));
    // If movies are found, display them; otherwise, show an alert
    if (filteredMovies.length > 0) {
        displayMovies(filteredMovies);
        // Scroll to the movies section after displaying the search results
        document.getElementById("movies-container").scrollIntoView({
            behavior: "smooth"
        });
        console.log("Filtered movies displayed.");
    } else {
        // Show an alert if no movies are found
        alert(`No movies found starting with "${input}".`);
        console.log(`No movies found starting with "${input}".`);
    }
}

//# sourceMappingURL=index.c4775257.js.map
