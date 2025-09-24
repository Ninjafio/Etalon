"use client";

import React, { useEffect, useState } from "react";
import "./CartDrawer.scss";
import { useCartStore } from "@/app/store/cartStore";
import Image from "next/image";
import axios from "axios";
import { ICartRecord, IOrder, IProduct } from "@/app/types/interface";
import { UserLocal } from "@/app/types/types";

type CartDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const {
        products: cartItems,
        removeProduct,
        updateQuantity,
        clearCart,
        addOrder,
    } = useCartStore();

    const [total, setTotal] = useState<number>(0);
    const [userLoc, setUserLoc] = useState<UserLocal | null>(null);
    const [allProducts, setAllProducts] = useState<IProduct[]>([]);

    // 1) Считаем сумму и получаем userLocal
    useEffect(() => {
        setTotal(
            cartItems.reduce((sum, p) => sum + p.priceDef * p.countProduct, 0)
        );
        const usr = sessionStorage.getItem("user");
        if (usr) {
            try {
                const obj: UserLocal = JSON.parse(usr);
                if (obj.userToken && obj.userEmail && obj.userLogin) {
                    setUserLoc(obj);
                }
            } catch {
                setUserLoc(null);
            }
        }
    }, [cartItems]);

    // 2) Подгружаем все продукты один раз для диапазона размеров
    useEffect(() => {
        axios
            .get<IProduct[]>("https://etalon-socks.ru/nest/api/product/products/", {
                headers: {
                    Authorization: sessionStorage.getItem("userToken") || "",
                    email: sessionStorage.getItem("userEmail") || "",
                    login: sessionStorage.getItem("userLogin") || "",
                },
            })
            .then((res) => setAllProducts(res.data))
            .catch(() => setAllProducts([]));
    }, []);

    const handleCheckout = async () => {
        if (!userLoc) {
            alert("Пожалуйста, авторизуйтесь перед оформлением заявки.");
            return;
        }

        const records: ICartRecord[] = cartItems.map((p) => ({
            id: p.id,
            title: p.title,
            article: p.article,
            priceDef: p.priceDef,
            countProduct: p.countProduct,
            ImgUrls: p.ImgUrls,
        }));

        const order: IOrder = {
            Record: records,
            TotalCost: total,
        };

        addOrder(order);
        clearCart();

        try {
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
            alert("Заявка успешно оформлена!");
            onClose();
        } catch {
            alert("Не удалось оформить заявку.");
        }
    };

    // Получаем диапазон размеров из allProducts по id
    const getSizes = (item: ICartRecord): number[] => {
        const prod = allProducts.find((p) => p.id === item.id);
        if (!prod) return [];
        const arr: number[] = [];
        for (let s = prod.min; s <= prod.max; s++) arr.push(s);
        return arr;
    };

    if (!isOpen) return null;

    return (
        <aside className="cart-drawer cart-drawer--open">
            <header className="cart-drawer__header">
                <h2 className="cart-drawer__title">Корзина</h2>
                <button
                    className="cart-drawer__close"
                    onClick={onClose}
                    aria-label="Закрыть корзину"
                >
                    ×
                </button>
            </header>

            <div className="cart-drawer__description">
                Сформируйте заказ и оставьте контактные данные.<br />
                Мы свяжемся с вами в ближайшее время.
            </div>

            {cartItems.length === 0 ? (
                <div className="cart-drawer__empty">
                    В вашей корзине нет товаров.
                </div>
            ) : (
                <div className="cart-drawer__items">
                    {cartItems.map((p) => (
                        <div key={p.id} className="cart-drawer__card">
                            <div className="cart-drawer__card-left">
                                <Image
                                    src={`https://etalon-socks.ru/nest/${p.ImgUrls}`}
                                    alt={p.title}
                                    width={120}
                                    height={120}
                                    unoptimized
                                />
                            </div>
                            <div className="cart-drawer__card-right">
                                <h3 className="cart-drawer__card-title">{p.title}</h3>
                                <div className="cart-drawer__card-article">
                                    Арт {p.article}
                                </div>
                                <div className="cart-drawer__card-sizes">
                                    Размеры:
                                    {getSizes(p).map((sz) => (
                                        <button key={sz} className="size-pill">
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                                <div className="cart-drawer__card-bottom">
                                    <div className="cart-drawer__card-price">
                                        {p.priceDef.toFixed(2)} ₽
                                    </div>
                                    <button
                                        className="cart-drawer__card-remove"
                                        onClick={() => removeProduct(p.id)}
                                        aria-label="Удалить товар"
                                    >
                                        🗑
                                    </button>
                                </div>
                                <div className="cart-drawer__card-qty">
                                    <button
                                        onClick={() =>
                                            updateQuantity(p.id, Math.max(1, p.countProduct - 1))
                                        }
                                    >
                                        −
                                    </button>
                                    <span>{p.countProduct}</span>
                                    <button
                                        onClick={() => updateQuantity(p.id, p.countProduct + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <footer className="cart-drawer__footer">
                <div className="cart-drawer__total">
                    Итого: {total.toFixed(2)} ₽
                </div>
                <button
                    className="cart-drawer__checkout"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                >
                    Оформить заявку
                </button>
            </footer>
        </aside>
    );
};
