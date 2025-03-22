import React from "react";
import "./Footer.scss";
import Image from "next/image";
import { Logo, Mail } from "@/app/imgs/imgIndex/imgIndex";
import { tg } from "@/app/imgs/imgIndex/imgIndex";
import { viber } from "@/app/imgs/imgIndex/imgIndex";
import { whatsapp } from "@/app/imgs/imgIndex/imgIndex";
import { vk } from "@/app/imgs/imgIndex/imgIndex";
import { map } from "@/app/imgs/imgIndex/imgIndex";
import { phone } from "@/app/imgs/imgIndex/imgIndex";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="foot">
        <div className="footer_1">
          <div className="column_1">
            <Image
              className="logo"
              src={Logo}
              alt="logotip"
              width="142"
              height="60"
            />
            <p className="txt_1">Носочная фабрика эталон</p>
            <div className="socials">
              <Image src={tg} alt="tg" width="33" height="33" />
              <Image src={viber} alt="viber" width="33" height="33" />
              <Image src={whatsapp} alt="whatsapp" width="33" height="33" />
              <a href="https://vk.com/chelsocks1" target="_blank">
              <Image src={vk} alt="vk" width="33" height="33" /></a>
            </div>
          </div>

          <div className="column_2">
            <p className="txt_2">Главная</p>

            <div className="main_parts">
              <p>О нас</p>
              <p>Наши ценности</p>
              <p>Отзывы</p>
              <p>Оставить заявку</p>
            </div>
          </div>

          <div className="column_3">
            <p className="txt_3">Каталог</p>

            <div className="catalog_parts">
              <p>Мужские</p>
              <p>Женские</p>
              <p>Детские</p>
            </div>
          </div>
        </div>

        <div className="footer_2">
          <p className="txt_11">© 2024 Все права защищены</p>

          <div className="contacts">
            <div className="map_bl">
              <Image src={map} alt="map" />
              <p className="txt_22">
                <a
                  href="https://yandex.ru/maps/56/chelyabinsk/?ll=61.370636%2C55.182022&mode=whatshere&whatshere%5Bpoint%5D=61.370645%2C55.182012&whatshere%5Bzoom%5D=17&z=17"
                  target="_blank"
                >
                  ул. Герцена, 13а, Челябинск
                </a>
              </p>
            </div>

            <div className="phone_bl">
              <Image src={phone} alt="phone" />
              <p className="txt_33">+7 951 799-26-62</p>
            </div>

            <div className="mail_bl">
              <Image src={Mail} alt="mail" />
              <p className="txt_44">chel_nosok1@bk.ru</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
