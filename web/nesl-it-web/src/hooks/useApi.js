import { useEffect, useState } from 'react';

// Simple in-memory cache to avoid refetching the same data
const cache = {};

/**
 * Custom hook to fetch API data with caching.
 *
 * @param {string} resource - The URL of the API resource to fetch.
 * @param {object} options - Optional fetch configuration (e.g., headers, method).
 * @returns {object} An object containing the response data, loading status, and error (if any).
 */
export default function useApi(resource, options = {}) {
  // State variables for storing API response, loading status, and error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create a unique cache key based on the request params
  const cacheKey = JSON.stringify({ resource, options });
  useEffect(() => {
    // If data exists in cache, use it directly
    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      setLoading(false);
      return;
    }

    // Fetch data from the API if not cached
    setLoading(true);
    fetch(resource, options)
      .then((res) => res.json())
      .then((json) => {
        // Cache the fetched response
        cache[cacheKey] = json;
        setData(json);
      })
      .catch(setError) // Handle errors
      .finally(() => setLoading(false)); // Set loading to false in all cases
  }, [cacheKey]); // Effect re-runs only if cacheKey changes

  // Return the current data, loading state, and error
  return { data, loading, error };
}
