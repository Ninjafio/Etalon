"use client";
import React, { useEffect, useState } from "react";
import "./NewProductsBlock.scss";
import Card from "@/app/components/Card/Card";
import { ArrowBack, ArrowUp, Filter_Arrow } from "@/app/imgs/imgIndex/imgIndex";
import Image from "next/image";
import { cardsInfo } from "./constants";
import { CardModel } from "@/app/components/Card/model/index";
import axios from "axios";
import { IProduct } from "@/app/types/interface";

const NewProductsBlock = () => {
  const [mode, setMode] = useState<string>("all");
  const [filter, setFilter] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);

  const [filtersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    new CardModel();
  });

  const ChooseColor = () => {
    setFilter("color");
  };

  const ChooseSize = () => {
    setFilter("size");
  };

  const ChooseType = () => {
    setFilter("type");
  };
  const [products, setProducts] = useState<IProduct[]>([])
    const getProducts = async () => {
      const data: IProduct[] = await axios.get("http://localhost:4000/api/product/products/", {
        headers: {
          Authorization: localStorage.getItem('userToken') || "",
          email: localStorage.getItem('userEmail') || "",
          login: localStorage.getItem('userLogin') || "",
        }
      }).then(res => res.data)
      console.log(data)
      setProducts(data)
    }
    React.useEffect(() => {

      getProducts()
    }, []);

  return (
    <div className="NewProductsBlock" id="NewProductsBlock">
      <div className="NewProductsBlock_header">
        <div className="NewProductsBlock_header_left">
          <div
            className={`NewProductsBlock_header_left_filters ${
              filtersOpen ? " clicked" : ""
            }`}
          >
            <button onClick={() => setIsFiltersOpen(!filtersOpen)}>
              фильтры
              {filtersOpen ? (
                <Image src={ArrowUp} alt=""></Image>
              ) : (
                <Image src={ArrowBack} alt=""></Image>
              )}
            </button>
            <div
              className={`NewProductsBlock_header_left_filters_filters ${
                filtersOpen ? "" : "off"
              }`}
            >
              <div className="NewProductsBlock_header_left_filters_filters_container">
                <div className="NewProductsBlock_header_left_filters_filters_top">
                  Фильтры
                  <p className="NewProductsBlock_header_left_filters_filters_top_additional">
                    Сбросить все
                  </p>
                </div>
                <div
                  className="NewProductsBlock_header_left_filters_filters_type"
                  onClick={() => ChooseType()}
                >
                  тип товара
                  <Image src={Filter_Arrow} alt=""></Image>
                </div>
                <div
                  className="NewProductsBlock_header_left_filters_filters_color"
                  onClick={() => ChooseColor()}
                >
                  цвет
                  <Image src={Filter_Arrow} alt=""></Image>
                </div>

                <div
                  className="NewProductsBlock_header_left_filters_filters_size"
                  onClick={() => ChooseSize()}
                >
                  размер
                  <Image src={Filter_Arrow} alt=""></Image>
                </div>
                <div className="NewProductsBlock_header_left_filters_filters_btn">
                  <button>применить</button>
                </div>
              </div>
            </div>

            <div
              className={`NewProductsBlock_header_left_filters_filters_additional_type ${
                filtersOpen && filter === "type" ? "" : "off"
              }`}
            >
              <div className="NewProductsBlock_header_left_filters_filters_additional_type_container">
                <div className="NewProductsBlock_header_left_filters_filters_additional_type_top">
                  <div className="NewProductsBlock_header_left_filters_filters_additional_type_top_left">
                    <Image
                      src={ArrowBack}
                      alt=""
                      onClick={() => setFilter("")}
                    />
                    Тип товара
                  </div>
                  <p className="NewProductsBlock_header_left_filters_filters_additional_type_top_additional">
                    Сбросить все
                  </p>
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_type_el">
                  <label form="socks">Носки</label>
                  <input type="checkbox" id="socks" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_type_el">
                  <label form="golfs">Гольфы</label>
                  <input type="checkbox" id="golfs" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_type_el">
                  <label form="thigs">Чулки</label>
                  <input type="checkbox" id="thighs" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_type_btn">
                  <button>применить</button>
                </div>
              </div>
            </div>

            <div
              className={`NewProductsBlock_header_left_filters_filters_additional_size ${
                filtersOpen && filter === "size" ? "" : "off"
              }`}
            >
              <div className="NewProductsBlock_header_left_filters_filters_additional_size_container">
                <div className="NewProductsBlock_header_left_filters_filters_additional_size_top">
                  <div className="NewProductsBlock_header_left_filters_filters_additional_type_top_left">
                    <Image
                      src={ArrowBack}
                      alt=""
                      onClick={() => setFilter("")}
                    ></Image>
                    Размер
                  </div>
                  <p className="NewProductsBlock_header_left_filters_filters_additional_size_top_additional">
                    Сбросить все
                  </p>
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_size_el">
                  <label form="35-40">35-40</label>
                  <input type="checkbox" id="35-40" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_size_el">
                  <label form="41-43">41-43</label>
                  <input type="checkbox" id="41-43" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_size_el">
                  <label form="44-46">44-46</label>
                  <input type="checkbox" id="45-46" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_size_el">
                  <label form="46-48">41-43</label>
                  <input type="checkbox" id="46-48" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_size_btn">
                  <button>применить</button>
                </div>
              </div>
            </div>

            <div
              className={`NewProductsBlock_header_left_filters_filters_additional_color ${
                filtersOpen && filter === "color" ? "" : "off"
              }`}
            >
              <div className="NewProductsBlock_header_left_filters_filters_additional_color_container">
                <div className="NewProductsBlock_header_left_filters_filters_additional_color_top">
                  <div className="NewProductsBlock_header_left_filters_filters_additional_type_top_left">
                    <Image
                      src={ArrowBack}
                      alt=""
                      onClick={() => setFilter("")}
                    ></Image>
                    Цвет
                  </div>
                  <p className="NewProductsBlock_header_left_filters_filters_additional_color_top_additional">
                    Сбросить все
                  </p>
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form="black">Черный</label>
                  <input type="checkbox" id="black" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form="white">Белый</label>
                  <input type="checkbox" id="white" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form="grey">Серый</label>
                  <input type="checkbox" id="grey" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form="blue">Синий</label>
                  <input type="checkbox" id="blue" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form="green">Зеленый</label>
                  <input type="checkbox" id="green" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form="yarkiy">Яркий</label>
                  <input type="checkbox" id="yarkiy" />
                </div>

                <div className="NewProductsBlock_header_left_filters_filters_additional_color_el">
                  <label form="symbols">С узором</label>
                  <input type="checkbox" id="symbols" />
                </div>

                <button
                  className="NewProductsBlock_header_left_filters_filters_additional_color_btn"
                  onClick={() => console.log(filtersOpen)}
                >
                  применить
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="NewProductsBlock_header_right">
          <div
            className={`NewProductsBlock_header_right_filterBtn ${
              mode === "all" ? "active" : ""
            }`}
            onClick={() => setMode("all")}
          >
            все
          </div>
          <div
            className={`NewProductsBlock_header_right_filterBtn ${
              mode === "male" ? "active" : ""
            }`}
            onClick={() => setMode("male")}
          >
            женские
          </div>
          <div
            className={`NewProductsBlock_header_right_filterBtn ${
              mode === "female" ? "active" : ""
            }`}
            onClick={() => setMode("female")}
          >
            мужские
          </div>
          <div
            className={`NewProductsBlock_header_right_filterBtn ${
              mode === "child" ? "active" : ""
            }`}
            onClick={() => setMode("child")}
          >
            детские
          </div>
        </div>
      </div>

      <div className="NewProductsBlock_container">
        {!showMore ? (
          <div className={`NewProductsBlock_container `}>
            <div
              className={`NewProductsBlock_container_background ${
                filtersOpen ? "background_active" : ""
              }`}
            ></div>
            {products.map(
              (item, key) =>
                key <= 7 && (
                  <Card
                    key={key}
                    id={item.id}
                    article={item.article}
                    title={item.title}
                    priceDef={item.priceDef}
                    ImgUrls={item.ImgUrls}
                  />
                )
            )}
          </div>
        ) : (
          <div className={`NewProductsBlock_container `}>
            <div
              className={`NewProductsBlock_container_background ${
                filtersOpen ? "background_active" : ""
              }`}
            ></div>
            {products.map((item, key) => {
              return  (
                <Card
                  key={key}
                  id={item.id}
                  article={item.article}
                  title={item.title}
                  priceDef={item.priceDef}
                  ImgUrls={item.ImgUrls}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="NewProductsBlock_buttonBlock">
        <div
          onClick={() => setShowMore(true)}
          className={
            showMore ? "NewProductsBlock_btn_off" : "NewProductsBlock_btn"
          }
        >
          Показать еще
        </div>
      </div>
    </div>
  );
};

export default NewProductsBlock;
