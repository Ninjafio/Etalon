"use client";

import React, { useState } from "react";
import { CartDrawer } from "@/app/components/CartDrawer/CartDrawer";
import Image from "next/image";
import { BasketI } from "@/app/imgs/imgIndex/imgIndex";
import { useCartStore } from "@/app/store/cartStore";
import "../style.scss";

export const BasketBlock: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const products = useCartStore((s) => s.products);
    const totalCount = products.reduce((sum, p) => sum + p.countProduct, 0);

    return (
        <div className="basket-block-wrapper">
            <div className="BasketIconWrapper" onClick={() => setIsOpen(true)}>
                <Image
                    src={BasketI}
                    alt="Корзина"
                    width={56}
                    height={56}
                    className="BasketIcon"
                    priority={true}     /* ускоряем загрузку иконки */
                />
                {totalCount > 0 && (
                    <span className="basket-counter">{totalCount}</span>
                )}
            </div>
            <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};
