"use client";

import React, { useEffect, useRef, useState } from "react";
import "./NewProductsBlock.scss";
import Card from "@/app/components/Card/Card";
import { Filter_Arrow } from "@/app/imgs/imgIndex/imgIndex";
import Image from "next/image";
import axios from "axios";
import { IProduct } from "@/app/types/interface";

interface Checkbox {
    name: string;
    isChecked: boolean;
}

interface SizeCheckbox extends Checkbox {
    min: number;
    max: number;
}

const NewProductsBlock: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filtered, setFiltered] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [mode, setMode] = useState<string>("все");

    const [types, setTypes] = useState<Checkbox[]>([]);
    const [colors, setColors] = useState<Checkbox[]>([]);
    const [sizes, setSizes] = useState<SizeCheckbox[]>([]);

    const [filtersOpen, setFiltersOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Загрузка
    useEffect(() => {
        (async () => {
            const prods = await axios
                .get<IProduct[]>("https://etalon-socks.ru/nest/api/product/products/", {
                    headers: {
                        Authorization: sessionStorage.getItem("userToken") || "",
                        email: sessionStorage.getItem("userEmail") || "",
                        login: sessionStorage.getItem("userLogin") || "",
                    },
                })
                .then((r) => r.data);
            setProducts(prods);
            setFiltered(prods);

            const cats = await axios
                .get<{ name: string }[]>("https://etalon-socks.ru/nest/api/category/categories/", {
                    headers: {
                        Authorization: sessionStorage.getItem("userToken") || "",
                        email: sessionStorage.getItem("userEmail") || "",
                        login: sessionStorage.getItem("userLogin") || "",
                    },
                })
                .then((r) => r.data);
            setCategories(["все", ...cats.map((c) => c.name)]);

            const cols = await axios
                .get<{ name: string }[]>("https://etalon-socks.ru/nest/api/color/colors/", {
                    headers: {
                        Authorization: sessionStorage.getItem("userToken") || "",
                        email: sessionStorage.getItem("userEmail") || "",
                        login: sessionStorage.getItem("userLogin") || "",
                    },
                })
                .then((r) => r.data);
            setColors(cols.map((c) => ({ name: c.name, isChecked: false })));

            const tps = await axios
                .get<{ name: string }[]>("https://etalon-socks.ru/nest/api/typesocks/typesocks/", {
                    headers: {
                        Authorization: sessionStorage.getItem("userToken") || "",
                        email: sessionStorage.getItem("userEmail") || "",
                        login: sessionStorage.getItem("userLogin") || "",
                    },
                })
                .then((r) => r.data);
            setTypes(tps.map((t) => ({ name: t.name, isChecked: false })));

            setSizes([
                { name: "35-40", isChecked: false, min: 35, max: 40 },
                { name: "41-43", isChecked: false, min: 41, max: 43 },
                { name: "44-46", isChecked: false, min: 44, max: 46 },
                { name: "46-48", isChecked: false, min: 46, max: 48 },
            ]);
        })();
    }, []);

    // Закрываем дропдаун кликом вне
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                filtersOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setFiltersOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [filtersOpen]);

    // Применить фильтры
    const applyFilters = () => {
        let res = products;

        if (mode !== "все") {
            res = res.filter((p) => p.category.name === mode);
        }
        const selTypes = types.filter((t) => t.isChecked).map((t) => t.name);
        if (selTypes.length) res = res.filter((p) => selTypes.includes(p.typesocks.name));

        const selCols = colors.filter((c) => c.isChecked).map((c) => c.name);
        if (selCols.length) res = res.filter((p) => selCols.includes(p.colorsocks.name));

        const selSizes = sizes.filter((s) => s.isChecked);
        if (selSizes.length)
            res = res.filter((p) =>
                selSizes.some((sz) => p.min >= sz.min && p.max <= sz.max)
            );

        setFiltered(res);
        setFiltersOpen(false);
    };

    return (
        <div className="NewProductsBlock">
            <div className="header">
                <div className="filters-wrapper" ref={dropdownRef}>
                    <button
                        className="filter-button"
                        onClick={() => setFiltersOpen((v) => !v)}
                    >
                        Фильтры <Image src={Filter_Arrow} alt="" />
                    </button>
                    {filtersOpen && (
                        <div className="filter-dropdown">
                            <div className="filter-section">
                                <h4>Тип товара</h4>
                                {types.map((t, i) => (
                                    <label key={i}>
                                        <input
                                            type="checkbox"
                                            checked={t.isChecked}
                                            onChange={() =>
                                                setTypes((arr) =>
                                                    arr.map((x, j) =>
                                                        j === i ? { ...x, isChecked: !x.isChecked } : x
                                                    )
                                                )
                                            }
                                        />
                                        {t.name}
                                    </label>
                                ))}
                            </div>
                            <div className="filter-section">
                                <h4>Цвет</h4>
                                {colors.map((c, i) => (
                                    <label key={i}>
                                        <input
                                            type="checkbox"
                                            checked={c.isChecked}
                                            onChange={() =>
                                                setColors((arr) =>
                                                    arr.map((x, j) =>
                                                        j === i ? { ...x, isChecked: !x.isChecked } : x
                                                    )
                                                )
                                            }
                                        />
                                        {c.name}
                                    </label>
                                ))}
                            </div>
                            <div className="filter-section">
                                <h4>Размер</h4>
                                {sizes.map((s, i) => (
                                    <label key={i}>
                                        <input
                                            type="checkbox"
                                            checked={s.isChecked}
                                            onChange={() =>
                                                setSizes((arr) =>
                                                    arr.map((x, j) =>
                                                        j === i ? { ...x, isChecked: !x.isChecked } : x
                                                    )
                                                )
                                            }
                                        />
                                        {s.name}
                                    </label>
                                ))}
                            </div>
                            <button className="apply-btn" onClick={applyFilters}>
                                Применить
                            </button>
                        </div>
                    )}
                </div>

                <div className="categories">
                    {categories.map((cat) => (
                        <div
                            key={cat}
                            className={`cat-btn ${mode === cat ? "active" : ""}`}
                            onClick={() => setMode(cat)}
                        >
                            {cat}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid">
                {filtered.map((p) => (
                    <Card
                        key={p.id}
                        id={p.id}
                        title={p.title}
                        article={p.article}
                        priceDef={p.priceDef}
                        ImgUrls={p.ImgUrls}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewProductsBlock;
