"use client";

import React, { useState } from "react";
import { User, Basket2 } from "@/app/imgs/imgIndex/imgIndex";
import Image from "next/image";
import "./Registration.scss";
import { useRouter } from "next/navigation";
import axios from "axios";

const Registration = () => {
  const [isRegShown, setIsRegShown] = useState(false);
  const [isEntShown, setIsEntShown] = useState(false);

  const handClose = (): void => {
    setIsRegShown(false);
    setIsEntShown(false);
  };

  const Enter = (): void => {
    setIsRegShown(false);
    setIsEntShown(true);
  };

  const Register = (): void => {
    setIsEntShown(false);
    setIsRegShown(true);
  };

  const [email, setEmail] = React.useState<string>("");
  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirm, setConfPassword] = React.useState<string>("");

  const router = useRouter();

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
        passwordConfirm !== null &&
        password.length > 5
      ) {
        const resRegistration = await axios.post(
          "http://localhost:4000/api/auth/reg/",
          {
            email: email,
            login: login,
            password: password,
          }
        );

        const resLogin = await axios.post(
          "http://localhost:4000/api/auth/login",
          {
            email: email,
            login: login,
            password: password,
          }
        );

        localStorage.setItem("userToken", resLogin.data.acessToken);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userLogin", login);
        router.push("/");
      } else {
        alert("Заполните все поля!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        className={
          isRegShown || isEntShown
            ? "reg_background_active"
            : "reg_background_unactive"
        }
      ></div>
      <Image src={User} alt="" onClick={() => setIsRegShown(true)} />

      <div
        className={`Reg ${isRegShown || isEntShown ? "active" : "unactive"}`}
      >
        <div className="Reg_elements">
          <div className="Reg_close">
            <Image src={Basket2} alt="" onClick={handClose} />
          </div>
          <div className="Reg_Title" onClick={handClose}>
            Добро пожаловать!
          </div>
          <div className="def_form">
            <form className="registrationPage__form">
              <h1 className="registrationPage__form__title">
                Регистрация пользователя
              </h1>
              <label
                className="registrationPage__form__label"
                htmlFor="product-name"
              >
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
                min={5}
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
        </div>
      </div>
    </div>
  );
};

export default Registration;