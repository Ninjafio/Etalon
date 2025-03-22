"use client";

import { Basket } from "@/app/components/basket/Basket";
import { BasketI, CloseIcon } from "@/app/imgs/imgIndex/imgIndex";
import { useCartStore } from "@/app/store/cartStore";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../style.scss";
import EmptyBasket from "@/app/components/EmptyBasket/EmptyBasket";

export const BasketBlock = () => {
  const [isShown, setIsShown] = useState(false);
  const products = useCartStore((state) => state.products);

  return (
    <div>
      <Image
        src={BasketI}
        alt="Корзина"
        onClick={() => setIsShown(true)}
        className="BasketIcon"
      />

      {isShown && (
        <div className="BasketOverlay" onClick={() => setIsShown(false)}></div>
      )}

      <div className={`BasketModal ${isShown ? "active" : ""}`}>
        <div className="BasketHeader">
          <h2 className="BasketHeader__title">
            {products.length > 0 ? "Корзина" : "Корзина пуста"}
          </h2>
          <Image
            src={CloseIcon}
            alt="Закрыть"
            onClick={() => setIsShown(false)}
            className="CloseIcon"
          />
        </div>

        {products.length > 0 ? <Basket /> : <EmptyBasket />}
      </div>
    </div>
  );
};
