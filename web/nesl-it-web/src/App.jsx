import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Feed from './pages/feed';
import { AuthContext } from './contexts/AuthContext';
import PrivateRoute from './components/privateRoute';

/**
 * App component
 * Sets up routing and provides authentication context for the app.
 */
export default function App() {
  // Auth token state shared across the app
  const [token, setToken] = useState(null);

  return (
    // Provide the token and setter to all child components via context
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          {/* Public route: Login page */}
          <Route path="/" element={<Login />} />

          {/* Protected route: Feed page, accessible only with a valid token */}
          <Route
            path="/feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
