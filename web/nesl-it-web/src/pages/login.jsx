import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import useApi from '../hooks/useApi';

/**
 * Login component
 * Allows a user to input their ID and log in.
 * On successful login, sets the auth token and redirects to /feed.
 */
export default function Login() {
  const { setToken } = useContext(AuthContext); // Access setToken from context
  const [id, setId] = useState('');             // State to store user input (user ID)
  const [shouldFetch, setShouldFetch] = useState(false); // Flag to trigger API call
  const navigate = useNavigate();               // React Router navigation

  // useApi hook handles the login request when shouldFetch is true
  const { data, loading, error } = useApi(
    shouldFetch ? 'http://localhost:3000/login' : null, // Only trigger when needed
    shouldFetch
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }), // Send user ID as payload
        }
      : {}
  );

  /**
   * Handle response from login API.
   * If token is received, store it in context and navigate to /feed.
   */
  useEffect(() => {
    if (data && data.token) {
      setToken(data.token);
      navigate('/feed');
    }
  }, [data]);

  /**
   * Submit handler for login form.
   * Triggers the useApi hook to send login request.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setShouldFetch(true);
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="User ID"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
