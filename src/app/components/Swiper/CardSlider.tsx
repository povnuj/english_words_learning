'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import  { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import { EffectCards } from 'swiper/modules';
import 'swiper/css/effect-cards';
import css from './CardSlider.module.css'
import {useEffect, useRef} from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import LearningCard from '../LearningCard';
import { changLang, updCard } from "@/store/cards-store";

const updData = async (id: string, word: {}) => {
  //const router = useRouter();
  const response = await fetch('/api/update-learning',
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, word }),
    })
  if (!response.ok) {
    
    //router.push('/login');
  }
};

export default function CardSlider(){
  const swiperRef = useRef<any | null>(null);
  const theme = useTheme();
  const slides = useAppSelector((state) => state.cards.allCards) ; 

  //  useEffect(() =>{
  //    console.log("slides");
  //    if (swiperRef.current && swiperRef.current.swiper) {
  //     //swiperRef.current.swiper.destroy();
  //     swiperRef.current.swiper.update();
  //     swiperRef.current.swiper.updateSlides()
  //   }
    
  // },[slides]);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const trueHandler = (upd: boolean) => {
    if(upd){
      swiperRef.current.swiper.updateSlides();
      swiperRef.current.swiper.update();
    }else{
      handleNext();
    }
  };


  return (
    <Box position={'relative'}  >
      <Swiper
        className={css.card_swiper}
        effect={'cards'}
        modules={[EffectCards]}
        grabCursor={true}
        ref={swiperRef}
        loop={true}

        //   onSlideChange={() => console.log('slide change')}
        //   onSwiper={(swiper) => console.log(swiper)}
        >
        { slides.map(slide => 
          <SwiperSlide className={css.swiper_slide} key={slide.id}>
            {/* <h3>{slide.en}</h3> */}
            <LearningCard {...slide}  truefn={trueHandler} />
          </SwiperSlide>
        )} 
        </Swiper>
    </Box>
  );
};