import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/Api';
import MovieList from '../components/MovieList/MovieList';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.elements.query.value.trim();

    if (value === '') {
      setSearchParams({});
    } else {
      setSearchParams({ query: value });
    }

    form.reset();
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
      } catch {
        setError('Something went wrong. Try again later.');
        setMovies([]);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
