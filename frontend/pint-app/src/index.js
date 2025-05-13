import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Потрібен Router
import App from "./App"; // Імпорт компоненту App

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    {" "}
    {/* Обгортаємо App в Router */}
    <App />
  </Router>,
);
