import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Імпорт CSS для стилів

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Реєстрація успішна");
        navigate("/login");
      } else {
        alert("Помилка: " + (data?.errors?.[0]?.msg || "Невідома"));
      }
    } catch (err) {
      alert("Сервер недоступний");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Реєстрація</h2>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="input-field"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
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
        <button onClick={handleRegister} className="button">
          Зареєструватись
        </button>
        <button onClick={() => navigate("/login")} className="link-button">
          Увійти
        </button>
      </div>
    </div>
  );
}

export default Register;
