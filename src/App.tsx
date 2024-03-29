import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import PoetsPage from "./pages/PoetsPage/PoetsPage";
import SinglePoetPage from "./pages/SinglePoetPage/SinglePoetPage";
import PoemsPage from "./pages/PoemsPage/PoemsPage";
import SinglePoemPage from "./pages/SinglePoemPage/SinglePoemPage";
import Footer from "./components/Footer/Footer";

function App() {
  const poetryApiUrl: string = import.meta.env.VITE_SERVER_URL;
  const clientUrl: string = import.meta.env.VITE_CLIENT_URL;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/poets"
          element={
            <PoetsPage poetryApiUrl={poetryApiUrl} clientUrl={clientUrl} />
          }
        />
        <Route
          path="/poets/:name"
          element={
            <SinglePoetPage poetryApiUrl={poetryApiUrl} clientUrl={clientUrl} />
          }
        />
        <Route
          path="/poems"
          element={
            <PoemsPage poetryApiUrl={poetryApiUrl} clientUrl={clientUrl} />
          }
        />
        <Route
          path="/poems/:title"
          element={
            <SinglePoemPage poetryApiUrl={poetryApiUrl} clientUrl={clientUrl} />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
