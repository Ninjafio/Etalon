import React from "react";
import "./AboutBlock.scss";
import Image from "next/image";
import { image1 } from "@/app/imgs/imgIndex/imgIndex";
import { image2 } from "@/app/imgs/imgIndex/imgIndex";

const AboutBlock = () => {
  return (
    <div className="cont">
      <div className="AboutBlock">
        <div className="AboutBlock_title">Принципы и ценности </div>
      </div>

      <div className="card_container">
        <div className="col-4 InfoBlock">
          <div className="InfoBlock_title">Качество</div>
          <div className="InfoBlock_txt">Мы стремимся к высшему стандарту качества на всех этапах производства. </div>
          <div className="InfoBlock_swiper"></div>
        </div>
        <div className="col-4 InfoBlock">

          <div className="InfoBlock_title">Надежность</div>
          <div className="InfoBlock_txt">Учитываем потребности каждого клиента. Мы предлагаем возможность индивидуальных заказов, чтобы каждая пара носок или чулок соответствовала желаниям и требованиям наших покупателей. </div>
          <div className="InfoBlock_swiper"></div>
        </div>
        <div className="col-4 InfoBlock">
          <Image src={image1} alt="фабрика" />
        </div>
        <div className="col-4 InfoBlock">
          <div className="InfoBlock_title">Индивидуальный подход</div>
          <div className="InfoBlock_txt">Учитываем потребности каждого клиента. Мы предлагаем возможность индивидуальных заказов, чтобы каждая пара носок или чулок соответствовала желаниям и требованиям наших покупателей.</div>
          <div className="InfoBlock_swiper"></div>
        </div>
        <div className="col-4 InfoBlock">

          <Image src={image2} alt="фабрика2" />
        </div>
        <div className="col-4 InfoBlock">
          <div className="InfoBlock_title">Творчество</div>
          <div className="InfoBlock_txt">Вдохновляемся различными стилями и культурами, чтобы создавать уникальные и разнообразные дизайны, которые подчеркнут индивидуальность каждого.</div>
          <div className="InfoBlock_swiper"></div>

        </div>
      </div>
    </div>
  );
};

export default AboutBlock;
