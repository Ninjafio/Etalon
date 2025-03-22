
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css"; 



const Slider = () => {

  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
    >
      
      <SwiperSlide>
        <div></div>
      </SwiperSlide>
      <SwiperSlide>
      <div></div>
      </SwiperSlide>
      <SwiperSlide>
      <div></div>
      </SwiperSlide>

    </Swiper>
  );
};

export default Slider;
