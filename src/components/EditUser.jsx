import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Button } from "./ui/button";

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams(); // Получаем ID пользователя из маршрута
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rol: "",
    tel: "",
  });

  // Функция для обновления полей формы
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Функция для сохранения изменений
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, formData);
      navigate("/users"); // Возврат к списку пользователей
    } catch (error) {
      console.error("Ошибка обновления данных:", error);
    }
  };

  return (
    <div className="edit-user-form">
      <h1>Редактировать пользователя</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Имя:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rol">Роль:</label>
          <input
            id="rol"
            name="rol"
            type="text"
            value={formData.rol}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tel">Телефон:</label>
          <input
            id="tel"
            name="tel"
            type="tel"
            value={formData.tel}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Сохранить</Button>
      </form>
    </div>
  );
}

export default EditUser;
