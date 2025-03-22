import React from "react";
import "./AboutBlock.scss";
import InfoBlock from "../../components/infoBlock/InfoBlock";
import Image from "next/image";
import { image1 } from "@/app/imgs/imgIndex/imgIndex";
import { image2 } from "@/app/imgs/imgIndex/imgIndex";

const AboutBlock = () => {
  return (
    <div className="cont">
      <div className="AboutBlock">
        <div className="AboutBlock_title">Принципы и ценности </div>
      </div>

      <div className="card_container1">
        <InfoBlock
          InfoBlock="Качество"
          InfoTxtBlock="Мы стремимся к высшему стандарту качества на всех этапах производства. "
        ></InfoBlock>
        <InfoBlock
          InfoBlock="Надежность"
          InfoTxtBlock="Учитываем потребности каждого клиента. Мы предлагаем возможность индивидуальных заказов, чтобы каждая пара носок или чулок соответствовала желаниям и требованиям наших покупателей."
        ></InfoBlock>
        <div className="InfoBlock1">
          <Image src={image1} alt="фабрика" />
        </div>
      </div>

      <div className="card_container2">
        <InfoBlock
          InfoBlock="Индивидуальный подход"
          InfoTxtBlock="Учитываем потребности каждого клиента. Мы предлагаем возможность индивидуальных заказов, чтобы каждая пара носок или чулок соответствовала желаниям и требованиям наших покупателей."
        ></InfoBlock>
        <div className="InfoBlock1">
          <Image src={image2} alt="фабрика2" />
        </div>
        <InfoBlock
          InfoBlock="Творчество"
          InfoTxtBlock="Вдохновляемся различными стилями и культурами, чтобы создавать уникальные и разнообразные дизайны, которые подчеркнут индивидуальность каждого."
        ></InfoBlock>
      </div>
    </div>
  );
};

export default AboutBlock;
