import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddSubreddit = () => {
  const [subredditInput, setSubredditInput] = useState(""); // State for input value
  const [subreddits, setSubreddits] = useState([]); // Initial state for existing subreddits

  // Handler for adding a new subreddit
  const handleAddSubreddit = async (e) => {
    e.preventDefault();
    if (subredditInput.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/fetch-posts",
          {
            subreddit: subredditInput.trim(), // Replace with the subreddit you want to fetch
          },
          {
            withCredentials: true, // Include credentials (cookies) in the request
          }
        );
        console.log(response);
        if (response.data.status == "success") {
          setSubreddits([...subreddits, subredditInput.trim()]);
          setSubredditInput("");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert(error.response.data.message);
      }
    }
  };

  // Handler for deleting a subreddit
  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(
        "http://localhost:4000/api/delete-posts",
        {
          data: { subreddit: subreddits[index] },

          withCredentials: true, // Include credentials (cookies) in the request
        }
      );
      console.log(response.data.message);
      const updatedSubreddits = subreddits.filter((_, i) => i !== index);
      setSubreddits(updatedSubreddits);
    } catch (error) {
      console.error(
        "Error deleting posts:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  useEffect(() => {
    const fetchSubreddits = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/fetch-subreddits",

        {
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );
      console.log(response);
      if (response.data.status == "success") {
        console.log("fetched");
        setSubreddits(response.data.subreddits);

        console.log(subreddits.length);
      }
    };
    fetchSubreddits();
  }, []);

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Subreddit</h1>

      {/* Form to add subreddit */}
      <form onSubmit={handleAddSubreddit} className="mb-8">
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Add a Subreddit:
        </label>
        <input
          type="text"
          value={subredditInput}
          onChange={(e) => setSubredditInput(e.target.value)}
          placeholder="Enter subreddit name"
          className="px-3 py-2 border border-gray-300 rounded-lg w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Subreddit
        </button>
      </form>

      {subreddits.length > 0 && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                S.No
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                Subreddit Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subreddits.map((subreddit, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {subreddit}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <Link
                    to={`/posts/${subreddit}`}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                  >
                    View
                  </Link>
                  <button
                    onClick={async () => await handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddSubreddit;
