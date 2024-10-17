// Import necessary dependencies
import { getMovies } from './api'; // to import API 
import './styles.css'; // TailwindCSS styles

const apiKey = "146c2867b133120789aa9d2e0de77730";
const moviesContainer = document.getElementById("movies-container");
const toggleButton = document.getElementById('navbar-toggle');
const navbarLinks = document.getElementById('navbar-links');
let allMoviesData = [];


document.getElementById('navbar-toggle').addEventListener('click', function () {
  const navbarLinks = document.getElementById('navbar-links');
  navbarLinks.classList.toggle('hidden');
});


document.querySelector("#search-movie")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchMovies(allMoviesData);
    }
  });

// Fetch popular movies on load
document.addEventListener("DOMContentLoaded", fetchPopularMovies);

function fetchPopularMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        allMoviesData = data.results; 
        displayMovies(allMoviesData); 
      })
      .catch((error) => console.log("Error fetching movies:", error));
  }

  function displayMovies(movies) {
    moviesContainer.innerHTML = ""; // Clear previous movies
    
    movies.forEach((movie) => {
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
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const movie = await response.json();
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the movie is already in the favorites
    const movieExists = favorites.some(favMovie => favMovie.id === movie.id);

    if (!movieExists) {
        favorites.push(movie); // Add the movie if it doesn't already exist
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movie.title} added to favorites!`);
    } else {
        alert(`${movie.title} is already in your favorites!`);
    }
  } catch (error) {
    console.error('Error fetching movie:', error);
  }
}

    function searchMovies(movies) {
      const input = document.querySelector("#search-movie").value.toLowerCase();
      const allMovies = movies.map((movie) => movie.title.toLowerCase());
    
      const modal = document.getElementById("search-modal"); 
      const modalResults = document.getElementById("search-results"); 
      const closeModal = document.querySelector(".close-modal");
    
      modalResults.innerHTML = ""; 
    
      let found = false; 
      for (let i = 0; i < allMovies.length; i++) {
        if (allMovies[i].includes(input)) {
          const listItem = document.createElement("li");
          listItem.textContent = movies[i].title; 
          modalResults.appendChild(listItem); 
          found = true;
        }
      }
    
      if (!found) {
        const listItem = document.createElement("li");
        listItem.textContent = "This movie was not found";
        modalResults.appendChild(listItem);
      }
    
      modal.classList.remove("hidden");
    
      closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.add("hidden");
        }
      });
    }
