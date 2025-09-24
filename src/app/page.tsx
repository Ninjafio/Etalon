"use client";
import AboutBlock from "./Blocks/AboutBlock/AboutBlock";
import Form from "./Blocks/Form/Form";
import PartnersBlock from "./Blocks/PartnersBlock/PartnersBlock";
import { IntroBlockBg } from "./imgs/imgIndex/imgIndex";
import Footer from "./components/footer/Footer";
import AchievementsBlock from "./Blocks/achievementsBlock/AchievementsBlock";
import HistoryBlock from "./Blocks/historyBlock/HistoryBlock";
import NumBLock from "./Blocks/numBlock/NumBlock";
import { useEffect, useState } from "react";
import IntroBlock from "./Blocks/introBlock/IntroBlock";
import Map from "./Blocks/map/Map";
import "./page.scss";

export default function Home() {
  const [userLogin, setUserLogin] = useState<string | null>(null);

  useEffect(() => {
    const storedLogin = sessionStorage.getItem("userLogin");
    if (storedLogin) {
      setUserLogin(storedLogin);
    }
  }, []);

  return (
    <>
    <IntroBlock
      imgChild={IntroBlockBg}
      txtChildAdditional="носки премиального качества с уникальным дизайном для вашего бизнеса"
      txtChild="Носочная фабрика «Эталон»"
    />
    <div className="container">
      <NumBLock />
      <HistoryBlock />
      <AboutBlock />
      <PartnersBlock />
      <AchievementsBlock />
      <Map />
      <Form />
      <Footer />
    </div>
    </>
  );
}
