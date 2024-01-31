import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage";
import SingleAuthorPage from "./pages/SingleAuthorPage/SingleAuthorPage";
import CollectionsPage from "./pages/CollectionsPage/CollectionsPage";
import SingleCollectionPage from "./pages/SingleCollectionPage/SingleCollectionPage";
import PoemsPage from "./pages/PoemsPage/PoemsPage";
import SinglePoemPage from "./pages/SinglePoemPage/SinglePoemPage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  // Change to process.env
  // const baseUrl = "http://localhost:8080";
  const apiURL = "https://poetrydb.org/";

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/authors/:name" element={<SingleAuthorPage />} />
        <Route path="/collections/" element={<CollectionsPage />} />
        <Route path="/collections/:title" element={<SingleCollectionPage />} />
        <Route path="/poems" element={<PoemsPage />} />
        <Route
          path="/poems/:title"
          element={<SinglePoemPage apiUrl={apiURL} />}
        />
        <Route path="/search" element={<SearchPage />} />
        {/* Search Results page needed? */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
