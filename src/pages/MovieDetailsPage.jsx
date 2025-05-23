import { useEffect, useState, useRef, Suspense } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../services/Api';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError('Failed to load movie details');
      }
    };
    getMovie();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  const { title, overview, poster_path, genres, vote_average } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div>
      <Link to={backLinkRef.current}>🔙 Go back</Link>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <img src={posterUrl} alt={title} width="300" />
        <div>
          <h2>{title}</h2>
          <p>
            <b>User Score:</b> {Math.round(vote_average * 10)}%
          </p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>{genres.map((genre) => genre.name).join(', ')}</p>
        </div>
      </div>

      <hr />
      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLinkRef.current }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLinkRef.current }}>
            Reviews
          </Link>
        </li>
      </ul>
      <hr />

      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
