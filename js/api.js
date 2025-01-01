const API_BASE_URL = "https://api.themoviedb.org/3";
const BEARER_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzIyNmYyYmRmYzdkNDViOGZkNmU0YjYzOGZlNDc5YyIsIm5iZiI6MTczNDQyNzQ0NC43NjEsInN1YiI6IjY3NjE0MzM0NDQ0NzZiNWI2MGI0Zjk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANbTmsJLCDtY2vhAHIKRIEvs-vfjdITDQ2lNH06sAgU";
const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${BEARER_KEY}`,
  },
};

// Fetching content from the API and error handling
async function fetchContent(endpoint) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error("No results found");
    }
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

// Fetching search results from the API and error handling
async function searchContent(query, type) {
  const url = `${API_BASE_URL}/search/${type}?query=${query}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error("No results found, try another search term.");
    }
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

// Fetching content from the API and error handling
async function fetchMovie(movieId) {
  const url = `${API_BASE_URL}/movie/${movieId}`;

  try {
    const response = await fetch(url, FETCH_OPTIONS);
    const data = await response.json();
    if (!data) {
      throw new Error("No results found");
    }
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

export { fetchContent, searchContent, fetchMovie };
