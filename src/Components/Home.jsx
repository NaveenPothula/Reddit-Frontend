import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]); // State for storing posts
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/posts", {
        withCredentials: true, // Include cookies in requests
      }); // Fetching posts from the backend
      setPosts(response.data); // Setting the posts data
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Error handling
      setLoading(false);
      alert(error.response.data.message); // Set loading to false even if there’s an error
    }
  };

  // useEffect hook to fetch posts when the component mounts
  useEffect(() => {
    fetchPosts(); // Call the fetch function on component mount
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>
      <Link
        to="add-subreddit"
        className="px-2 py-2 rounded bg-pink-500 text-white"
      >
        add subreddit
      </Link>

      {/* If no posts are found */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">by {post.author}</p>
                <p className="text-gray-600">
                  {post.selftext || "No content available."}
                </p>
                <p className="text-yellow-600">
                  {post.subreddit || "No content available."}
                </p>
                <div className="mt-4 flex items-center justify-between text-gray-600">
                  <span>Score: {post.score}</span>
                  <span>Comments: {post.numComments}</span>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-blue-500 hover:underline"
                >
                  View Post
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
