"use client";

import React, { useState } from "react";
import { User, Basket2 } from "@/app/imgs/imgIndex/imgIndex";
import Image from "next/image";
import "./Registration.scss";
import axios from "axios";
import { UserLocal } from "@/app/types/interface";

const Registration = () => {
  const [isRegShown, setIsRegShown] = useState(false);
  const [isEntShown, setIsEntShown] = useState(false);
  const [user, setUser] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const RegUser=async () =>{
    const resRegistration = await axios.post("https://localhost:4000/api/auth/reg/",
      {
        email:email,
        login:login,
        password: password
      }
    )
    await LoginUser()
  }
  const LoginUser=async () =>{

    const resLogin = await axios.post("https://localhost:4000/api/auth/login",
      {
        email:email,
        login:login,
        password: password
      }
    )
    
    SaveUser(resLogin.data.acessToken)
  }
  const SaveUser=async (acessToken:string) =>{
    var user: UserLocal={
      userEmail:email,
      userLogin:login,
      userToken:acessToken
    }
    localStorage.setItem("user", JSON.stringify(user));
  }
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

          {isRegShown === isEntShown && (
            <div className="def_form">
              <div className="space-y-2">
                <div className="mt-1">
                  <input
                    id="reg_name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="input_"
                    placeholder="ФИО"
                    onChange={(e)=>setLogin(e.target.value)} 
                  />
                </div>

                <div>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="input_"
                      placeholder="Электронная почта"
                      onChange={(e)=>setEmail(e.target.value)} 
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <input
                      id="tel"
                      name="tel"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="input_"
                      placeholder="+7"
                      onChange={(e)=>setPhone(e.target.value)} 
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      required
                      autoComplete="name"
                      className="input_"
                      placeholder="Оптовый / розничный покупатель"
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-1">
                    <input
                      type="password"
                      required
                      className="input_"
                      onChange={(e)=>setPassword(e.target.value)} 
                    />
                  </div>
                </div>

                <div className="but_cont">
                  <button type="submit" className="button" onClick={RegUser}>
                    Зарегистрироваться
                  </button>
                </div>

                <div>
                  <p className="or">
                    Уже есть аккаунт?
                    <span
                      onClick={Enter}
                      style={{ cursor: "pointer", color: "brown" }}
                    >
                      (Войти)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {isRegShown && (
            <div className="def_form">
              <div className="space-y-2">
                <div className="mt-1">
                  <input
                    id="reg_name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="input_"
                    placeholder="ФИО"
                    onChange={(e)=>setLogin(e.target.value)} 
                  />
                </div>

                <div>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="input_"
                      placeholder="Электронная почта"
                      onChange={(e)=>setEmail(e.target.value)} 
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <input
                      id="tel"
                      name="tel"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="input_"
                      placeholder="+7"
                      onChange={(e)=>setPhone(e.target.value)} 
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      required
                      autoComplete="name"
                      className="input_"
                      placeholder="Оптовый / розничный покупатель"
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-1">
                    <input
                      type="password"
                      required
                      className="input_"
                      onChange={(e)=>setPassword(e.target.value)} 
                    />
                  </div>
                </div>

                <div className="but_cont">
                  <button type="submit" className="button" onClick={RegUser}>
                    Зарегистрироваться
                  </button>
                </div>

                <div>
                  <p className="or">
                    Уже есть аккаунт?
                    <span
                      onClick={Enter}
                      style={{ cursor: "pointer", color: "brown" }}
                    >
                      (Войти)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {isEntShown && (
            <div className="def_form">
              <div className="space-y-2">
                <div className="mt-1">
                  <input
                    id="ent_name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="input_"
                    placeholder="ФИО"
                    onChange={(e)=>setLogin(e.target.value)} 
                  />
                </div>

                <div>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="input_"
                      placeholder="Электронная почта"
                      onChange={(e)=>setEmail(e.target.value)} 
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <input
                      id="tel"
                      name="tel"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="input_"
                      placeholder="+7"
                      onChange={(e)=>setPhone(e.target.value)} 
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-1">
                    <input
                      type="password"
                      required
                      className="input_"
                      onChange={(e)=>setPassword(e.target.value)} 
                    />
                  </div>
                </div>

                <div className="but_cont">
                  <button type="submit" className="button" onClick={LoginUser}>
                    Войти
                  </button>
                </div>

                <div>
                  <p className="or">
                    Еще нет аккаунта?
                    <span
                      onClick={Register}
                      style={{ cursor: "pointer", color: "brown" }}
                    >
                      (Зарегистрироваться)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
