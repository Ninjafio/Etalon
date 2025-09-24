"use client";

import "../page.scss";
import { SocksBanner } from "@/app/imgs/imgIndex/imgIndex";
import React from "react";
import NewProductsBlock from "../Blocks/newProductsBlock/NewProductsBlock";
import IntroBlock from "../Blocks/introBlock/IntroBlock";

const cataloguePage = () => {
  return (
    <>
    <IntroBlock
      imgChild={SocksBanner}
      txtChildAdditional=""
      txtChild="При заказе от 100 000 рублей скидка 7% от прайса"
    />
    <div className="container">
      <NewProductsBlock />
    </div>
    </>
  );
};

export default cataloguePage;
