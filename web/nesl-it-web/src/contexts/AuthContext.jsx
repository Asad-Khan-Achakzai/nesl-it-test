// Import the createContext function from React
import { createContext } from 'react';

/**
 * AuthContext
 * Provides a centralized context for authentication data (e.g., token).
 * Default value is `null` until set by a provider.
 */
export const AuthContext = createContext(null);
