import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsList from "./features/posts/PostsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<PostsList />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
