"use client";

import React, { useState } from "react";
import "./EmptyBasket.scss";
import Image from "next/image";
import { BasketI, CloseIcon } from "@/app/imgs/imgIndex/imgIndex";
import { useCartStore } from "@/app/store/cartStore";

const EmptyBasket = () => {
  return (
    <div className={"emptyBasket"}>
      <div className="emptyBasket__elements">
        <div className="emptyBasket__elements__txt">
          Сформируйте заказ и оставьте контактные данные. Мы свяжемся с вами в
          ближайшее время.{" "}
        </div>
        <button className="emptyBasket__elements__btn">Оформить заявку</button>
      </div>
    </div>
  );
};

export default EmptyBasket;
