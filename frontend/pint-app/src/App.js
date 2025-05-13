import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./register/Register";
import Login from "./login/Login";
import Home from "./pages/Home"; // Додай імпорт Home

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} /> {/* Новий маршрут */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
