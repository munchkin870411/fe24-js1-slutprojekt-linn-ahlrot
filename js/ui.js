/* This file provides utility functions to dynamically render movie and person data into HTML containers,
handle user input, and display error messages.*/

import { fetchMovie } from "./api.js";

function displayTopMovies(movies, container) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card", "movie-card");
    card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="card-content">
                <h3>${movie.title}</h3>
                <h5>Release Date:</h5> <p>${movie.release_date}</p>
            </div>
        `;
    card.addEventListener("click", async () => {
      const movieDetails = await fetchMovie(movie.id);
      getMovieDetails(movieDetails, container);
    });
    container.appendChild(card);
  });
}

function displaySearchMovies(movies, container) {
  container.innerHTML = "";
  container.classList = "";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card", "movie-card");
    card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="card-content">
                <h3>${movie.title}</h3>
                <h4>Release Date: </h4><p>${movie.release_date}</p>
                <h4>Description: </h4>${movie.overview}</p>
            </div>
        `;
    card.addEventListener("click", async () => {
      const movieDetails = await fetchMovie(movie.id);
      getMovieDetails(movieDetails, container);
    });
    container.appendChild(card);
  });
}

function displaySearchPersons(persons, container) {
  container.innerHTML = "";
  container.classList.add("person-layout");
  persons.forEach((person) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const knownContent = getKnownContent(person.known_for || []);
    card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${person.profile_path}" alt="${person.name}">
            <div class="card-content">
                <h3>${person.name}</h3>
                <p>Known for: ${person.known_for_department}</p>
                <div class="known-content-wrapper">
                  ${knownContent}
                </div>
            </div>
        `;
    container.appendChild(card);
  });
}

function displayErrorMessage(message, container) {
  container.innerHTML = `<div class="error">${message}</div>`;
}

function getRadioInputValue(name) {
  const radioInputs = document.getElementsByName(name);
  let type = "";

  _.each(radioInputs, (input) => {
    if (input.checked) {
      type = input.value;
    }
  });

  return type;
}

// Gets "known for" content for person search
function getKnownContent(contentArr) {
  const knownForContent = contentArr
    .map((content) => {
      return `
      <div class="known-content">
      <h4 class="media-type">${content.media_type}</h4>

        <img src="https://image.tmdb.org/t/p/w200/${
          content.poster_path
        }" alt="${content.title || content.name}">
        <p>${content.title || content.name}</p>
      </div>
    `;
    })
    .join("");
  return knownForContent;
}

function getMovieDetails(movie, container) {
  container.innerHTML = `
    <div class="movie-details">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
    movie.title
  }">
      <div class="details-content">
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>
        <p><strong>Genres:</strong> ${movie.genres
          .map((g) => g.name)
          .join(", ")}</p>
        <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
      </div>
    </div>
  `;
}

export {
  displayTopMovies,
  displaySearchMovies,
  displaySearchPersons,
  displayErrorMessage,
  getRadioInputValue,
};
