import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../services/Api';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError('Failed to fetch reviews.');
      }
    };
    getReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>No reviews available.</p>;

  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <p>
            <b>{author}</b>
          </p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
}
