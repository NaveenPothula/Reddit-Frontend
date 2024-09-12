import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const FetchPostsBySubreddit = () => {
  const { subreddit } = useParams(); // Get subreddit from URL params
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch posts by subreddit
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/get-posts/${subreddit}`,
        {
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );
      console.log(response.data);
      setPosts(response.data); // Set the posts data
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message); // Handle error
    } finally {
      setLoading(false); // Stop loading once request is complete
    }
  };

  // UseEffect to trigger the fetch when the component mounts
  useEffect(() => {
    fetchPosts();
  }, [subreddit]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error fetching posts: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Posts from {subreddit}
      </h1>
      {posts.length === 0 ? (
        <div>No posts available.</div>
      ) : (
        <ul className="space-y-4">
          {posts.map((post, index) => (
            <li key={index} className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>Author: {post.author}</p>
              <p>Score: {post.score}</p>
              <p>Comments: {post.numComments}</p>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Post
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchPostsBySubreddit;
