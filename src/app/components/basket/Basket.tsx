"use client";

import { useCartStore } from "@/app/store/cartStore";
import React, { useEffect, useState } from "react";
import "./Basket.scss"; // Подключаем стили
import { TrashIcon } from "../TrashIcon";
import Image from "next/image";
import trashImg from "../../imgs/trashImg.svg";
import { SockImg } from "@/app/imgs/imgIndex/imgIndex";
import { BasketModel } from "./model";
import { ICartRecord, IOrder, IProduct } from "@/app/types/interface";
import { UserLocal } from "@/app/types/types";
import axios from "axios";

export const Basket = () => {
  const {
    products,
    orders,
    updateQuantity,
    removeProduct,
    clearCart,
    addOrder,
  } = useCartStore();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [countProduct, setQuantity] = useState<number>(0);

  const [userLoc, setUser] = useState<UserLocal>();
  
  const handleDecreaseQuantity = (product: any) => {
    if (product.countProduct === 0) {
      removeProduct(product.id);
    }

    console.log("Кол-во до прибавления:", product.countProduct);
    updateQuantity(product.id, product.countProduct - 1);
    console.log("Кол-во до прибавления:", product.countProduct);
  };

  const handleIncreaseQuantity = (product: any) => {
    console.log("Кол-во до прибавления:", product.countProduct);
    if (product.countProduct === 100) return;
    updateQuantity(product.id, product.countProduct++);
    console.log("Кол-во до прибавления:", product.countProduct);
  };

  const handleChangeProductQuantity = (productId: any, callBack: Function) => {
    callBack();

    products.map((product) => {
      if (product.id === productId) {
        updateQuantity(productId, countProduct);
      }
      console.log("Кол-во до прибавления:", product.countProduct);
    });
    console.log("Кол-во до прибавления:", products);
  };

  useEffect(() => { 


    /*проверяем авторизован пользователь или нет */
    const userStr = localStorage.getItem("user") || ""

    if (userStr != "") {
      let user: UserLocal = JSON.parse(userStr)
      if (user.userToken != "") {
        setUser(user)
      }
    }


    var totalSum = 0;
    products.map((product) => {
      const a = product.priceDef * product.countProduct;
      totalSum += a;
      console.log(a)
      console.log(product)
    });
    console.log(totalSum)

    setTotalPrice(totalSum);
  }, [products]);

  const sendToOrders = async (products: string): Promise<void> => {
    console.log(products);
    const totalProducts: ICartRecord[] = [];

    JSON.parse(products).map((product: ICartRecord) => {
      const newProduct: ICartRecord = {
        id: product.id,
        title: product.title,
        article: product.article,
        priceDef: product.priceDef,
        countProduct: product.countProduct
      };

      totalProducts.push(newProduct);
    });
    const order: IOrder = {
      Record: totalProducts,
      TotalCost: totalPrice,
    };
    // const existingOrder = state.orders.find((o) => o.id === order.id);
    // TODO: в стор добавлять заявку
    if (userLoc != null && order != null) {
      
      console.log(order);
      console.log(userLoc);

      addOrder(order);
      clearCart();
      console.log(orders);
      console.log(order)
      console.log({
        Authorization: userLoc.userToken,
        email: userLoc.userEmail,
        login: userLoc.userLogin
      })
      //сохраняем в бд заказ пользователя из корзины
      await axios.post("http://localhost:4000/api/story/create", {
        Record: order.Record,
        TotalCost: order.TotalCost
      },
        {
          headers: {
            Authorization: userLoc.userToken,
            email: userLoc.userEmail,
            login: userLoc.userLogin
          }
        }
      )
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
        {products.map((product: ICartRecord) => (
          <div key={product.id} className="basket__items__item">
            <div className="basket__items__item__leftSide">
              <div className="basket__items__item__leftSide__imgContainer">
                <Image
                  className="basket__items__item__leftSide__imgContainer__img"
                  src={SockImg}
                  alt="Изображение товара"
                />
              </div>

              <div className="basket__items__item__leftSide__controls">
                <button
                  className={`basket__items__item__leftSide__controls__quantity ${product.countProduct < 1 &&
                    "basket__items__item__leftSide__controls__quantity--disabled"
                    }`}
                  onClick={() => handleDecreaseQuantity(product)}
                  disabled={product.countProduct < 1}
                >
                  -
                </button>
                <input
                  name="quantity"
                  onChange={(e) =>
                    handleChangeProductQuantity(product.id, () =>
                      setQuantity(Number(e.target.value))
                    )
                  }
                  value={product.countProduct}
                  type="range"
                />
                <p style={{ color: "#000" }}>{product.countProduct}</p>
                <button
                  className="basket__items__item__leftSide__controls__quantity"
                  onClick={() => handleIncreaseQuantity(product)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="basket__items__item__rightSide">
              <div className="basket__items__item__rightSide__info">
                <p className="basket__items__item__rightSide__info__name basket__items__item__rightSide__text">
                  {product.title}
                </p>
                <p className="basket__items__item__rightSide__info__name basket__items__item__rightSide__text">
                  {product.article}
                </p>
              </div>
              <div className="basket__items__item__rightSide__bottom">
                <p className="basket__items__item__rightSide__bottom__price basket__items__item__rightSide__text">
                  {product.priceDef} руб.
                </p>
                <button
                  className="basket__items__item__rightSide__bottom__remove"
                  onClick={(e) => {
                    e.preventDefault();
                    removeProduct(product.id);
                  }}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="basket__totalPrice">Итого: {totalPrice} руб.</p>
      {/* создавать заказы могут только авторизованные пользователи*/}
      {userLoc != null &&(
      <button
        onClick={() => sendToOrders(JSON.stringify(products))}
        data-js-order-button={JSON.stringify(products)}
        className="basket__orderBtn"
      >
        Оформить
      </button>)}
    </div>
  );
};
