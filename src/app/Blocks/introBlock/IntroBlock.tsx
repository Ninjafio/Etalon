"use client";

import React, { useEffect, useState } from "react";
import { Logo, Search } from "@/app/imgs/imgIndex/imgIndex";
import Image from "next/image";
import Link from "next/link";
import "./IntroBlock.scss";

import { BasketBlock } from "../BasketBlock/ui";
import Authorization from "@/app/Authorization";
import { OrderList } from "../OrderList";
import Account from "@/app/components/Account/Account";

import { IHeader } from "@/app/types/interface";

const IntroBlock: React.FC<IHeader> = ({
  imgChild,
  txtChild,
  txtChildAdditional,
}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const login = sessionStorage.getItem("userLogin");
    if (login) {
      setIsLogged(true);
    }
  }, []);

  const handleLogin = () => {
    const login = sessionStorage.getItem("userLogin");
    setIsLogged(!!login);
  };

  return (
    <div className="HeaderBlock_container">
      <div className="HeaderBlock_header">
        <Link href="/">
          <div className="HeaderBlock_header_logo">
            <Image src={Logo} alt="Эталон" />
          </div>
        </Link>

        <button
          className="btn-navbar-toggler"
          onClick={() => setNavOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon${navOpen ? " open" : ""}`} />
        </button>

        <div
          className={`HeaderBlock_header_navigation${navOpen ? " open" : ""}`}
        >
          <div className="HeaderBlock_header_navigation_catalogue">
            <Link href="/cataloguePage">
              <p>Каталог</p>
            </Link>
          </div>

          <div className="HeaderBlock_header_navigation_img">
            <OrderList />
          </div>

          <div className="HeaderBlock_header_navigation_img">
            {isLogged ? (
              <Account />
            ) : (
              <Authorization onLoginSuccess={handleLogin} />
            )}
          </div>

          <div className="HeaderBlock_header_navigation_img">
            <BasketBlock />
          </div>

          {/* <div className="HeaderBlock_header_navigation_img">
            <Image src={Search} alt="Поиск" />
          </div> */}
        </div>
      </div>

      <div
        className="HeaderBlock_main"
        style={{
          backgroundImage: `url(${
            typeof imgChild === "string" ? imgChild : imgChild.src
          })`,
        }}
      >
        <div className="HeaderBlock_main_txt">
          <h1>{txtChild}</h1>
          <div className="HeaderBlock_main_txt_additional">
            {txtChildAdditional}
          </div>
        </div>
        <button className="HeaderBlock_main_btn">
          <Link href="/cataloguePage">Посмотреть товары</Link>
        </button>
      </div>
    </div>
  );
};

export default IntroBlock;
