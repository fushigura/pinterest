import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Додали useNavigate для перенаправлення
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("find");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [find, setFind] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [username, setUsername] = useState(""); // Зміна для username
  const navigate = useNavigate();

  useEffect(() => {
    // Отримуємо username з localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Встановлюємо ім'я користувача
    } else {
      setUsername(""); // Якщо ім'я не знайдено, залишаємо порожнім
    }
  }, []);

  const handleUpload = async () => {
    if (!file || !title) {
      alert("Будь ласка, виберіть файл і введіть назву.");
      return;
    }

    const formData = new FormData();
    formData.append("img", file);
    formData.append("find", title);

    try {
      await axios.post("http://localhost:5000/download", formData);
      alert("Фото завантажено!");
      setFile(null);
      setTitle("");
    } catch (err) {
      console.error(err);
      alert("Не вдалось завантажити фото.");
    }
  };

  const handleFindImage = async () => {
    if (!find) {
      alert("Введіть назву для пошуку.");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/findimg?find=${find}`,
        { responseType: "arraybuffer" },
      );
      const blob = new Blob([res.data], {
        type: res.headers["content-type"],
      });
      setImageUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("Фото не знайдено.");
      setImageUrl(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(""); // Очищаємо ім'я користувача
    navigate("/"); // Переходимо на головну сторінку (без реєстрації)
  };

  const handleLoginOrRegister = (action) => {
    if (action === "login") {
      navigate("/login"); // Перехід на сторінку входу
    } else {
      navigate("/register"); // Перехід на сторінку реєстрації
    }
  };

  return (
    <div className="home-wrapper">
      <nav className="navbar">
        <div className="nav-left">
          <button
            onClick={() => setActiveTab("find")}
            className={activeTab === "find" ? "nav-item active" : "nav-item"}
          >
            Знайти фото
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={activeTab === "add" ? "nav-item active" : "nav-item"}
          >
            Додати фото
          </button>
        </div>
        <div className="nav-right">
          {username ? (
            <>
              <span className="username">{username}</span>
              <button onClick={handleLogout} className="nav-item">
                Вихід
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleLoginOrRegister("login")}
                className="nav-item"
              >
                Увійти
              </button>
              <button
                onClick={() => handleLoginOrRegister("register")}
                className="nav-item"
              >
                Зареєструватись
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="center-content">
        <div className="form-container">
          {activeTab === "add" ? (
            <>
              <h2>Додати фото</h2>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="input-file"
              />
              <input
                type="text"
                placeholder="Назва фото"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-text"
              />
              <button onClick={handleUpload} className="button">
                Завантажити фото
              </button>
            </>
          ) : (
            <>
              <h2>Знайти фото</h2>
              <input
                type="text"
                placeholder="Введіть назву для пошуку"
                value={find}
                onChange={(e) => setFind(e.target.value)}
                className="input-text"
              />
              <button onClick={handleFindImage} className="button">
                Знайти фото
              </button>

              {imageUrl && (
                <div className="image-preview">
                  <img src={imageUrl} alt="Знайдене фото" className="image" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
