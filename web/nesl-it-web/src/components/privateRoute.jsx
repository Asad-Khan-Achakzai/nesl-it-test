// Import necessary modules from React and React Router
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

/**
 * PrivateRoute component
 * Restricts access to routes based on the presence of an auth token.
 *
 * @param {ReactNode} children - The component(s) to render if authenticated.
 * @returns {JSX.Element} - The protected component(s) or a redirect to the login page.
 */
export default function PrivateRoute({ children }) {
  // Access the token from AuthContext
  const { token } = useContext(AuthContext);

  // If token exists, render the protected content; otherwise, redirect to "/"
  return token ? children : <Navigate to="/" />;
}
