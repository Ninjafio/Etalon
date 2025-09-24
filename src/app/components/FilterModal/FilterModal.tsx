"use client";

import React, { useState } from "react";
import "./FilterModal.scss";

export type FilterSelections = {
    types: Set<string>;
    colors: Set<string>;
    sizes: Set<string>;
};

type FilterModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onApply: (sel: FilterSelections) => void;
    options: {
        types: string[];
        colors: string[];
        sizes: string[];
    };
};

export const FilterModal = ({
                                isOpen,
                                onClose,
                                onApply,
                                options,
                            }: FilterModalProps) => {
    const [step, setStep] = useState<"menu" | "types" | "colors" | "sizes">(
        "menu"
    );
    const [sel, setSel] = useState<FilterSelections>({
        types: new Set(),
        colors: new Set(),
        sizes: new Set(),
    });

    const toggle = (group: keyof FilterSelections, value: string) => {
        const copy = new Set(sel[group]);
        copy.has(value) ? copy.delete(value) : copy.add(value);
        setSel({ ...sel, [group]: copy });
    };

    const resetAll = () =>
        setSel({ types: new Set(), colors: new Set(), sizes: new Set() });

    if (!isOpen) return null;

    return (
        <div className="filter-modal">
            {step === "menu" && (
                <div className="filter-menu">
                    <h3 className="filter-menu__title">Фильтры</h3>
                    <ul className="filter-menu__list">
                        <li onClick={() => setStep("types")}>Тип товара</li>
                        <li onClick={() => setStep("colors")}>Цвет</li>
                        <li onClick={() => setStep("sizes")}>Размер</li>
                    </ul>
                    <button className="filter-menu__reset" onClick={resetAll}>
                        Сбросить всё
                    </button>
                    <button className="filter-menu__apply" onClick={() => onApply(sel)}>
                        Применить
                    </button>
                    <button className="filter-menu__close" onClick={onClose}>
                        ×
                    </button>
                </div>
            )}

            {(step === "types" || step === "colors" || step === "sizes") && (
                <div className="filter-panel">
                    <header className="filter-panel__header">
                        <button
                            className="filter-panel__back"
                            onClick={() => setStep("menu")}
                        >
                            ←
                        </button>
                        <h4 className="filter-panel__title">
                            {step === "types"
                                ? "Тип товара"
                                : step === "colors"
                                    ? "Цвет"
                                    : "Размер"}
                        </h4>
                        <button className="filter-panel__reset" onClick={resetAll}>
                            Сбросить
                        </button>
                    </header>
                    <ul className="filter-panel__list">
                        {options[step].map((opt) => (
                            <li key={opt}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={sel[step].has(opt)}
                                        onChange={() => toggle(step, opt)}
                                    />
                                    {opt}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="filter-panel__apply"
                        onClick={() => onApply(sel)}
                    >
                        Применить
                    </button>
                </div>
            )}
        </div>
    );
};
