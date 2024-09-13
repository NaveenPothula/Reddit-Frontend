import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./Components/Home";
import AddSubreddit from "./Components/AddSubreddit";
import LoginPage from "./Components/Login";
import FetchPostsBySubreddit from "./Components/SubredditPosts";
import ProtectedRoute from "./utils/ProtectedRoute";
import Document from "./Components/Document";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<PostList />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/document" element={<Document />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/add-subreddit" element={<AddSubreddit />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/posts/:subreddit" element={<FetchPostsBySubreddit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
