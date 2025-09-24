// File: /root/etalon/src/app/Authorization/ui/Authorization.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../style.scss";
import { User } from "@/app/imgs/imgIndex/imgIndex";
import Image from "next/image";
import { UserLocal } from "@/app/types/types";

interface AuthorizationProps {
  onLoginSuccess: () => void;
}

const Authorization: React.FC<AuthorizationProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const router = useRouter();

  const LoginUserForm = async () => {
    try {
      const res = await axios.post(
          "https://etalon-socks.ru/nest/api/auth/login",
          {
            email,
            login,
            password,
          }
      );

      const token = res.data.acessToken;
      const user: UserLocal = {
        userEmail: email,
        userLogin: login,
        userToken: token,
      };

      // сохраняем в sessionStorage
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userLogin", login);
      sessionStorage.setItem("userToken", `Bearer ${token}`);
      sessionStorage.setItem("user", JSON.stringify(user));

      onLoginSuccess();
      router.push("/");
    } catch (e) {
      alert("Неудачная авторизация! Попробуйте еще раз");
    }
  };

  return (
      <>
        {/* Кнопка открытия */}
        <Image
            src={User}
            alt="Войти"
            width={60}
            height={60}
            onClick={() => setIsAuthOpen(true)}
            style={{ cursor: "pointer" }}
        />

        {/* Затемнённый фон */}
        <div
            className={`authorization__background ${
                isAuthOpen ? "authorization__background--active" : ""
            }`}
            onClick={() => setIsAuthOpen(false)}
        />

        {/* Модалка */}
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

          <form className="authorization__form" onSubmit={(e) => e.preventDefault()}>
            <label className="authorization__form__label">Почта</label>
            <input
                className="authorization__form__input"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label className="authorization__form__label">Логин</label>
            <input
                className="authorization__form__input"
                type="text"
                placeholder="Логин"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />

            <label className="authorization__form__label">Пароль</label>
            <input
                className="authorization__form__input"
                type="password"
                placeholder="Пароль"
                required
                value={password}
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

export default Authorization;
