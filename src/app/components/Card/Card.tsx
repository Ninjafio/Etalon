"use client";

import React from "react";
import { useCartStore } from "@/app/store/cartStore";
import "./Card.scss";
import Image from "next/image";
import { CardBasket } from "@/app/imgs/imgIndex/imgIndex";
import { iCard } from "@/app/types/interface";

const Card: React.FC<iCard> = ({ id, title, article, priceDef, ImgUrls }) => {
    const addProduct = useCartStore((s) => s.addProduct);
    const imageUrl = `https://etalon-socks.ru/nest/${ImgUrls}`;

    const handleAdd = () => {
        addProduct({ id, title, article, priceDef, countProduct: 1, ImgUrls });
    };

    return (
        <div className="Card_container">
            <img
                src={imageUrl}
                alt={title}
                className="Card_container_img"
            />
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
                        src={CardBasket}
                        alt="Добавить в корзину"
                        className="Card_container_main_bottom_left_price_btn"
                        onClick={handleAdd}
                    />
                </div>
            </div>
        </div>
    );
};

export default Card;
