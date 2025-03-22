"use client";
import React from "react";
import "./Location.scss";

const Location = () => {
  return (
    <>
      <div className="lTitle">
        <p className="l_Title">Где мы находимся</p>
      </div>
      <div className="main_container">
        <div className="location_container">
          <div style={{ position: "relative", overflow: "hidden" }}>
            <a
              href="https://yandex.ru/maps/56/chelyabinsk/?utm_medium=mapframe&utm_source=maps"
              style={{
                color: "#eee",
                fontSize: 12,
                position: "absolute",
                top: 0,
              }}
            >
              Челябинск
            </a>
            <a
              href="https://yandex.ru/maps/56/chelyabinsk/?ll=61.370636%2C55.182022&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=61.370645%2C55.182012&whatshere%5Bzoom%5D=17&z=17"
              style={{
                color: "#eee",
                fontSize: 12,
                position: "absolute",
                top: 14,
              }}
            >
              Улица Герцена, 13А на карте Челябинска — Яндекс Карты
            </a>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=61.370636%2C55.182022&mode=whatshere&whatshere%5Bpoint%5D=61.370645%2C55.182012&whatshere%5Bzoom%5D=17&z=17"
              width="1270"
              height="645"
              allowFullScreen={true}
              style={{ position: "relative", borderRadius: "45px" }}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
