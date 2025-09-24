// /root/etalon/src/app/components/basket/Basket.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import { TrashIcon } from "../TrashIcon";
import axios from "axios";
import { ICartRecord, IOrder } from "@/app/types/interface";
import { UserLocal } from "@/app/types/types";
import "./Basket.scss";

export const Basket = () => {
  const {
    products,
    updateQuantity,
    removeProduct,
    clearCart,
    addOrder,
  } = useCartStore();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [userLoc, setUser] = useState<UserLocal | null>(null);

  useEffect(() => {
    // Вытягиваем юзера из sessionStorage
    const userStr = sessionStorage.getItem("user") || "";
    if (userStr) {
      const user: UserLocal = JSON.parse(userStr);
      if (user.userToken) setUser(user);
    }

    // Считаем итог
    const sum = products.reduce(
        (acc, p) => acc + p.priceDef * p.countProduct,
        0
    );
    setTotalPrice(sum);
  }, [products]);

  const handleDecreaseQuantity = (product: ICartRecord) => {
    if (product.countProduct <= 1) {
      removeProduct(product.id);
    } else {
      updateQuantity(product.id, product.countProduct - 1);
    }
  };

  const handleIncreaseQuantity = (product: ICartRecord) => {
    updateQuantity(product.id, product.countProduct + 1);
  };

  const sendToOrders = async () => {
    // собираем массив ICartRecord с ImgUrls
    const totalProducts: ICartRecord[] = products.map((p) => ({
      id: p.id,
      title: p.title,
      article: p.article,
      priceDef: p.priceDef,
      countProduct: p.countProduct,
      ImgUrls: p.ImgUrls,      // ← теперь обязательно
    }));

    const order: IOrder = {
      Record: totalProducts,
      TotalCost: totalPrice,
    };

    if (userLoc) {
      addOrder(order);
      clearCart();

      // отправляем в БД
      await axios.post(
          "https://etalon-socks.ru/nest/api/story/create",
          {
            Record: order.Record,
            TotalCost: order.TotalCost,
          },
          {
            headers: {
              Authorization: userLoc.userToken,
              email: userLoc.userEmail,
              login: userLoc.userLogin,
            },
          }
      );
    }
  };

  return (
      <div className="basket">
        {products.length > 0 && (
            <button className="basket__buttonClear" onClick={clearCart}>
              Очистить корзину
            </button>
        )}

        <div className="basket__items">
          {products.map((product) => (
              <div key={product.id} className="basket__items__item">
                <div className="basket__items__item__leftSide">
                  <div className="basket__items__item__leftSide__imgContainer">
                    <img
                        src={`https://etalon-socks.ru/nest/${product.ImgUrls}`}
                        alt={product.title}
                        className="basket__items__item__leftSide__imgContainer__img"
                    />
                  </div>

                  <div className="basket__items__item__leftSide__controls">
                    <button
                        onClick={() => handleDecreaseQuantity(product)}
                        className="basket__items__item__leftSide__controls__quantity"
                    >
                      −
                    </button>
                    <p>{product.countProduct}</p>
                    <button
                        onClick={() => handleIncreaseQuantity(product)}
                        className="basket__items__item__leftSide__controls__quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="basket__items__item__rightSide">
                  <div className="basket__items__item__rightSide__info">
                    <p className="basket__items__item__rightSide__text">
                      {product.title}
                    </p>
                    <p className="basket__items__item__rightSide__text">
                      {product.article}
                    </p>
                  </div>
                  <div className="basket__items__item__rightSide__bottom">
                    <p className="basket__items__item__rightSide__text">
                      {product.priceDef} руб.
                    </p>
                    <button
                        className="basket__items__item__rightSide__bottom__remove"
                        onClick={() => removeProduct(product.id)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
          ))}
        </div>

        <p className="basket__totalPrice">Итого: {totalPrice} руб.</p>

        {userLoc && (
            <button className="basket__orderBtn" onClick={sendToOrders}>
              Оформить
            </button>
        )}
      </div>
  );
};
