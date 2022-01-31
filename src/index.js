import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ImageView from "./routes/imageView.js";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="ImageView" element={<ImageView />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
