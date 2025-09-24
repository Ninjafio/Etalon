import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { UserLocal } from "@/app/types/types";

export const RegisterUserPage = () => {
  // const [user,userToken]=useUnit([$user,$userToken]);
  const [email, setEmail] = React.useState<string>("");
  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirm, setConfPassword] = React.useState<string>("");

  let navigate = useNavigate();
  const RegisterUserForm = async () => {
    if (password !== passwordConfirm) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      if (
        email !== null &&
        login !== null &&
        password !== null &&
        passwordConfirm !== null
      ) {
        const resRegistration = await axios.post(
          "https://etalon-socks.ru/nest/api/auth/reg/",
          {
            email: email,
            login: login,
            password: password,
          }
        );

        const resLogin = await axios.post(
          "https://etalon-socks.ru/nest/api/auth/login",
          {
            email: email,
            login: login,
            password: password,
          }
        );
        var user: UserLocal={
          userEmail:email,
          userLogin:login,
          userToken:resLogin.data.acessToken
        }
        sessionStorage.setItem("user", JSON.stringify(user));

        // localStorage.setItem("userToken", resLogin.data.acessToken);
        // localStorage.setItem("userEmail", email);
        // localStorage.setItem("userLogin", login);
        return navigate("/");
      } else {
        alert("Заполните все поля!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="registrationPage">
      <form className="registrationPage__form">
        <h1 className="registrationPage__form__title">
          Регистрация пользователя
        </h1>
        <label className="registrationPage__form__label" htmlFor="product-name">
          Почта:
        </label>
        <input
          className="registrationPage__form__input"
          placeholder="Email"
          type="text"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          className="registrationPage__form__label"
          htmlFor="product-description"
        >
          Логин:
        </label>
        <input
          className="registrationPage__form__input"
          placeholder="Логин"
          type="text"
          name="login"
          required
          onChange={(e) => setLogin(e.target.value)}
        />
        <label
          className="registrationPage__form__label"
          htmlFor="product-price"
        >
          Пароль:
        </label>
        <input
          className="registrationPage__form__input"
          placeholder="Пароль"
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label
          className="registrationPage__form__label"
          htmlFor="product-price"
        >
          Подтвердите пароль:
        </label>
        <input
          className="registrationPage__form__input"
          placeholder="Подтвердите пароль"
          type="password"
          name="confirmPassword"
          required
          onChange={(e) => setConfPassword(e.target.value)}
        />
        <button
          className="registrationPage__form__subBtn"
          type="button"
          onClick={() => {
            RegisterUserForm();
          }}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
