// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import React from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
// import required modules

import SurveyCard from './Card';

export default function CardSlide() {
  const styles = {
    CardSwiper: {
      width: '100%',
      height: '100%',
    },
    Slide: {
      width: '100%',
      height: '95%',
    },
  };

  const swiperParams: SwiperOptions = {
    slidesPerView: 'auto', // 한 번에 보여질 슬라이드 수
    spaceBetween: 10, // 슬라이드 간의 간격 (옵션)
    breakpoints: {
      1050: {
        slidesPerView: 5,
      },
      870: {
        slidesPerView: 4,
      },
      // 화면 너비가 768px 이상일 때 3개의 슬라이드 보이기
      730: {
        slidesPerView: 3,
      },
      // 화면 너비가 480px 이상 768px 미만일 때 2개의 슬라이드 보이기
      511: {
        slidesPerView: 2,
      },
      // 화면 너비가 480px 미만일 때 1개의 슬라이드 보이기
      0: {
        slidesPerView: 1.8,
      },
    },
  };

  return (
    <Swiper style={styles.CardSwiper} {...swiperParams}>
      <SwiperSlide style={styles.Slide}>
        <SurveyCard />
      </SwiperSlide>
      <SwiperSlide>
        <SurveyCard />
      </SwiperSlide>
      <SwiperSlide>
        <SurveyCard />
      </SwiperSlide>
      <SwiperSlide>
        <SurveyCard />
      </SwiperSlide>
      <SwiperSlide>
        <SurveyCard />
      </SwiperSlide>
      <SwiperSlide>
        <SurveyCard />
      </SwiperSlide>
    </Swiper>
  );
}
