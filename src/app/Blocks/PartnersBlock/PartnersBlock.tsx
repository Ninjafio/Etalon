import React from "react";
import { Card1 } from "@/app/imgs/imgIndex/imgIndex";
import { card2 } from "@/app/imgs/imgIndex/imgIndex";
import { card3 } from "@/app/imgs/imgIndex/imgIndex";
import { card4 } from "@/app/imgs/imgIndex/imgIndex";
import { card5 } from "@/app/imgs/imgIndex/imgIndex";
import { card6 } from "@/app/imgs/imgIndex/imgIndex";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import "./PartnersBlock.scss";

const PartnersBlock = () => {
  return (
    <div>
      <div className="Title">
        <p className="pTitle">Наши партнеры</p>
      </div>

      <div className="RunningBlock_runningLine">
      <Marquee className="partners_container">
        <Image src={Card1} alt="юничел" />
        <Image src={card2} alt="копеечка" />
        <Image src={card3} alt="жизньмарт" />
        <Image src={card4} alt="трактор" />
        <Image src={card5} alt="кб" />
        <Image src={card6} alt="ф" className="F" />
      </Marquee>
      </div>
    </div>
  );
};

export default PartnersBlock;
