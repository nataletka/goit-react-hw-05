import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTY5MWNjZmNjZTdlOWI2ZmM1MWU1YzE2N2Q1OTlmYiIsIm5iZiI6MTc0NzU3MDYyMy4yMDQsInN1YiI6IjY4MjljZmJmNzUyNzQ4MjRjMmUyNDc3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._OcrULwtHC6UNkAQ0hl9xo6eTOe3Ucu32z_CN2mjwnI',
  },
};

// Trending Movies
export const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day?language=en-US`;
  return axios
    .get(url, options)
    .then((res) => res.data.results)
    .catch((err) => {
      console.error('Error fetching trending movies:', err);
      return [];
    });
};

// Search Movies
export const searchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(
    query,
  )}`;
  return axios
    .get(url, options)
    .then((res) => res.data.results)
    .catch((err) => {
      console.error('Error searching movies:', err);
      return [];
    });
};

// Movie Details
export const fetchMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}`;
  return axios
    .get(url, options)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Error fetching details for movie ${movieId}:`, err);
      return null;
    });
};

// Movie Cast
export const fetchMovieCast = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/credits`;
  return axios
    .get(url, options)
    .then((res) => res.data.cast)
    .catch((err) => {
      console.error(`Error fetching cast for movie ${movieId}:`, err);
      return [];
    });
};

// Movie Reviews
export const fetchMovieReviews = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/reviews`;
  return axios
    .get(url, options)
    .then((res) => res.data.results)
    .catch((err) => {
      console.error(`Error fetching reviews for movie ${movieId}:`, err);
      return [];
    });
};
