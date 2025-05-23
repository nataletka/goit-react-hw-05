import { useState } from 'react';
import { searchMovies } from '../services/Api';
import MovieList from '../components/MovieList/MovieList';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movies = await searchMovies(query);
    setResults(movies);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={results} />
    </div>
  );
}
