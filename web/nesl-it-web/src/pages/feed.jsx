import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useApi from '../hooks/useApi';

/**
 * Feed component
 * Displays a paginated list of posts with infinite scroll.
 */
export default function Feed() {
  // Get auth token from context
  const { token } = useContext(AuthContext);

  // Local state to manage posts and pagination
  const [posts, setPosts] = useState([]);         // All fetched posts
  const [page, setPage] = useState(-1);           // Current page index
  const [loading, setLoading] = useState(false);  // Local loading state (separate from useApi)
  const [hasMore, setHasMore] = useState(true);   // Flag to check if more posts are available
  const [url, setUrl] = useState(null);           // URL to fetch (trigger useApi)

  // Custom hook to fetch data and manage cache
  const { data, loading: apiLoading, error } = useApi(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  /**
   * Triggered when more posts are to be fetched (e.g., on scroll)
   * Sets the next URL, which triggers the useApi hook
   */
  const fetchMore = () => {
    if (loading || !hasMore) return; // Prevent duplicate fetches
    setLoading(true);
    setUrl(`http://localhost:3000/feed?page=${page + 1}&limit=10`);
  };

  // Fetch initial page on component mount
  useEffect(() => {
    fetchMore();
  }, []);

  /**
   * Runs when `data` changes from useApi.
   * Appends new posts to the existing list, updates state accordingly.
   */
  useEffect(() => {
    if (data) {
      if (data.length === 0) {
        setHasMore(false); // No more posts left to fetch
      } else {
        setPosts((prev) => [...prev, ...data]); // Append new posts
        setPage((prev) => prev + 1);            // Increment page
      }
      setLoading(false); // Reset local loading
    }
  }, [data]);

  /**
   * Sets up scroll listener for infinite scroll.
   * Calls fetchMore when user scrolls near bottom.
   */
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      // If user has scrolled near the bottom and more posts exist
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
        fetchMore();
      }
    };

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // Render the list of posts and loading states
  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}
        >
          <h4>{post.author}</h4>
          <p>{post.content}</p>
        </div>
      ))}

      {(loading || apiLoading) && <p>Loading more posts...</p>}
      {!hasMore && <p>No more posts to load.</p>}
    </div>
  );
}
