import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <strong>404... Page not found...</strong>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
