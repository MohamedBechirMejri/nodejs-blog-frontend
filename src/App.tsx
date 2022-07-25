import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Article from "./Components/Article";
import NotFound from "./Components/NotFound";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/articles/:id" element={<Article />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
