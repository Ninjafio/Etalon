"use client";
import React, { useEffect, useState } from "react";
import "./Card.scss";
import Image from "next/image";
import { CardBasket, SockImg } from "@/app/imgs/imgIndex/imgIndex";

import { article } from "framer-motion/client";
import { iCard } from "@/app/types/interface";
import { CardModel } from "./model";

const Card = ({ id, title, article, priceDef,ImgUrls }: iCard) => {
  const cartData = JSON.stringify({ id, title, article, priceDef });

  /**


   * Используется атрибут "data-js-cart-button" для взаимодействия через modalManager.
   * При клике на кнопку с атрибутом "data-js-cart-button" будет открываться модальное окно
   */
  const url='http://localhost:4000/'+ImgUrls;
  return (
    <div className="Card_container" data-js-card-id={id} key={id}>
      <img src={'http://localhost:4000/'+ImgUrls} alt=""/>
      <div className="Card_container_main">
        <div className="Card_container_main_name">{title}</div>
        <div className="Card_container_main_bottom">
          <div className="Card_container_main_bottom_left">
            <div className="Card_container_main_bottom_left_id">
              Арт {article}
            </div>
            <div className="Card_container_main_bottom_left_price">
              {priceDef} ₽
            </div>
          </div>

          <Image
            data-js-cart-button={cartData}
            className="Card_container_main_bottom_left_price_btn"
            src={CardBasket}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
