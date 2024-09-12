import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./Components/Home";
import AddSubreddit from "./Components/AddSubreddit";
import LoginPage from "./Components/Login";
import FetchPostsBySubreddit from "./Components/SubredditPosts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-subreddit" element={<AddSubreddit />} />
        <Route path="/posts/:subreddit" element={<FetchPostsBySubreddit />} />
      </Routes>
    </Router>
  );
}

export default App;
