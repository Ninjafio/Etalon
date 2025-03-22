import React from "react";
import InfoBlock from "@/app/components/infoBlock/InfoBlock";
import "./AchievementsBlock.scss";
import Image from "next/image";
import { Ach1, Ach2, Ach3 } from "@/app/imgs/imgIndex/imgIndex";

const AchievementsBlock = () => {
  return (
    <div className="AchievementsBlock_container">
      <div className="reviewsBlock_container">
        <h2 className="TitleAch">Отзывы наших клиентов</h2>
        <div className="reviewsBlock">
          <InfoBlock InfoTxtBlock="Отличные носки! Легко надеваются, 
          не садятся после стирки, резинка мягкая, не давит. 
          Размер соответствует, отлично облегают ногу, 
          даже после нескольких стирок форму не теряют." />
          <InfoBlock
            InfoTxtBlock="Качество на высоте! Носки 
            на 41 размер подошли отлично, комфортно сидят, в универ 
            с брюками выглядят стильно. "
          />
          <InfoBlock
            InfoTxtBlock="Очень довольна покупкой. На 
            мою ногу 35-го размера сели идеально, резинка комфортная, 
            не давит. Хлопковый материал приятный, не сползают и не морщатся — супер вариант 
            на каждый день."
          />
        </div>
      </div>
      <div className="Achievements_container">
        <h2 className="TitleAch">Достижения</h2>
        <div className="AchievementsBlock">
            <Image src={Ach1} alt="huh" />
            <Image src={Ach2} alt="huh" />
            <Image src={Ach3} alt="huh" />
        </div>
      </div>
    </div>
  );
};

export default AchievementsBlock;
