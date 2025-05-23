import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../services/Api';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch {
        setError('Failed to fetch cast.');
      }
    };
    getCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>No cast info available.</p>;

  return (
    <ul>
      {cast.map(({ id, name, profile_path, character }) => (
        <li key={id}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://via.placeholder.com/100x150?text=No+Image'
            }
            alt={name}
            width="100"
          />
          <p>
            <b>{name}</b> as {character}
          </p>
        </li>
      ))}
    </ul>
  );
}
