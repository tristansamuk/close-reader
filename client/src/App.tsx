import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import axios from "axios";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" />
        <Route path="/author/:name" />
        <Route path="/poems" />
        <Route path="/poems/:title" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
