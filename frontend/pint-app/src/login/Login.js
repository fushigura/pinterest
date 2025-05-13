import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Стилі зберігаються

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("username", form.username);

        alert("Вхід успішний. Токен: " + data.token);
        navigate("/home"); // ✅ Переходимо на головну
      } else {
        alert("Помилка входу");
      }
    } catch (err) {
      alert("Сервер недоступний");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Вхід</h2>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="input-field"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="input-field"
        />

        <button onClick={handleLogin} className="green-button">
          Увійти
        </button>

        <button onClick={() => navigate("/")} className="gray-button">
          Зареєструватись
        </button>
      </div>
    </div>
  );
}

export default Login;
