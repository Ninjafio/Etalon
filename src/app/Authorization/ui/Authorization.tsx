"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../style.scss";
import { User } from "@/app/imgs/imgIndex/imgIndex";
import Image from "next/image";

interface AuthorizationProps {
  onLoginSuccess: () => void;
}

export const Authorization: React.FC<AuthorizationProps> = ({
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const router = useRouter();

  const LoginUserForm = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email: email,
        login: login,
        password: password,
      });

      localStorage.setItem("userToken", res.data.acessToken);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userLogin", login);

      onLoginSuccess(); // Вызываем функцию обновления состояния
      router.push("/");
    } catch (e) {
      alert("Неудачная авторизация! Попробуйте еще раз");
    }
  };

  return (
    <>
      {/* Кнопка открытия модального окна */}
      <Image src={User} alt="" onClick={() => setIsAuthOpen(true)} />

      {/* Затемненный фон */}
      <div
        className={`authorization__background ${
          isAuthOpen ? "authorization__background--active" : ""
        }`}
        onClick={() => setIsAuthOpen(false)}
      ></div>

      {/* Само модальное окно */}
      <div
        className={`authorization__modal ${
          isAuthOpen ? "authorization__modal--active" : ""
        }`}
      >
        <div className="authorization__close">
          <button
            className="authorization__close-btn"
            onClick={() => setIsAuthOpen(false)}
          >
            ✖
          </button>
        </div>
        <h1 className="authorization__title">Авторизация</h1>
        <form className="authorization__form">
          <label className="authorization__form__label">Почта</label>
          <input
            className="authorization__form__input"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="authorization__form__label">Логин</label>
          <input
            className="authorization__form__input"
            type="text"
            placeholder="Логин"
            required
            onChange={(e) => setLogin(e.target.value)}
          />

          <label className="authorization__form__label">Пароль</label>
          <input
            className="authorization__form__input"
            type="password"
            placeholder="Пароль"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="authorization__form__controls">
            <button
              type="button"
              className="authorization__form__controls__subBtn"
              onClick={LoginUserForm}
            >
              Войти
            </button>
            <a
              href="/RegistrationPage"
              className="authorization__form__controls__subBtn"
            >
              Зарегистрироваться
            </a>
          </div>
        </form>
      </div>
    </>
  );
};
