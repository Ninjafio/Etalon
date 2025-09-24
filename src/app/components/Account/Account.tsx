"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "@/app/imgs/imgIndex/imgIndex";
import "./Account.scss";

const Account: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState<string>("");

    // При монтировании тянем логин из sessionStorage
    useEffect(() => {
        const login = sessionStorage.getItem("userLogin");
        setUserName(login || "");
    }, []);

    const handleLogout = () => {
        // Чистим все токены/данные
        sessionStorage.removeItem("userLogin");
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("userToken");
        // Перезагружаем страницу, чтобы инициировать повторный рендер без авторизации
        window.location.reload();
    };

    return (
        <div className="account-wrapper">
            <Image
                src={User}
                alt="Аккаунт"
                width={40}
                height={40}
                className="account-icon"
                onClick={() => setIsOpen(true)}
            />

            {isOpen && (
                <div
                    className="account-backdrop"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {isOpen && (
                <div className="account-modal">
                    <button
                        className="account-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                    <div className="account-header">Ваш профиль</div>
                    <div className="account-info">
                        Вы вошли как:<br/>
                        <strong>{userName}</strong>
                    </div>
                    <button
                        className="account-logout"
                        onClick={handleLogout}
                    >
                        Выйти
                    </button>
                </div>
            )}
        </div>
    );
};

export default Account;
