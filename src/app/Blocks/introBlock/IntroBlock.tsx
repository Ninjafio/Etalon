"use client";

import React, { useEffect, useState } from "react";
import { Logo, Search, User } from "@/app/imgs/imgIndex/imgIndex";
import Image from "next/image";
import { IHeader } from "@/app/types/interface";
import Link from "next/link";
import "./IntroBlock.scss";
import { BasketBlock } from "../BasketBlock/ui";
import { Authorization } from "@/app/Authorization";
import { OrderList } from "../OrderList";

export const IntroBlock = ({
  imgChild,
  txtChild,
  txtChildAdditional,
}: IHeader) => {
  const MenuItemAnimationVariant = {
    animate: { width: 30 },
  };

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("userLogin")) {
      setIsLogged(true);
      setUserLogin(localStorage.getItem("userLogin"));
    }
  }, []);

  /**
   * Прокидываем в <Authorization /> для плавного обновления страницы в случае успешной авторизации.
   */
  const handleLogin = () => {
    setIsLogged(true);
    setUserLogin(localStorage.getItem("userLogin"));
  };

  return (
    <div className="HeaderBlock">
      <div className="HeaderBlock_container">
        <div className="HeaderBlock_header">
          <Link href="/">
            <div className="HeaderBlock_header_logo">
              <Image src={Logo} alt="" />
            </div>
          </Link>
          <div className="HeaderBlock_header_navigation">
            <div className="HeaderBlock_header_navigation_catalogue">
              <Link href="/cataloguePage">
                <div className="HeaderBlock_header_navigation_catalogue_txt">
                  <p>Каталог</p>
                </div>
              </Link>
            </div>
            <div className="HeaderBlock_header_navigation_img">
              {isLogged ? (
                <OrderList />
              ) : (
                <Authorization onLoginSuccess={handleLogin} />
              )}
            </div>

            <div className="HeaderBlock_header_navigation_img">
              <BasketBlock />
            </div>
            <div className="HeaderBlock_header_navigation_img">
              <Image src={Search} alt="" />
            </div>
          </div>
        </div>
        <div className="HeaderBlock_main">
          <div className="HeaderBlock_main_txt">
            {txtChild}
            <div className="HeaderBlock_main_txt_additional">
              {txtChildAdditional}
            </div>
          </div>

          <button>
            <a href="#NewProductsBlock">Посмотреть товары</a>
          </button>
        </div>
      </div>
    </div>
  );
};
