import React, {useContext, useEffect, useRef, useState } from "react";
import { UiState } from '../../../context/ui-context';
import { WordsState } from "../../../context/words-context";
import { UiStatesType, WordsStatesType } from '../../../types/ListTypes';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';
import './Card.css';
import { EffectCards } from 'swiper/modules';

const Card: React.FC = () => {
    const ictx = useContext(UiState);
    const wctx = useContext(WordsState);
    const [swiper, setSwiper] = React.useState<any>();

    useEffect(()=>{
        const arr = wctx.words.filter(el => el.learning === true);
        wctx.setState!(WordsStatesType.AddFavoriteList, arr);
    },[wctx.words]);


    const random = (max: number): number => {
        return  Math.floor(Math.random() * max);
    };
    
    function randomAnswerHandler(id: string,){
        let a: number = random(wctx.words.length);
        const check = () => {
            if(wctx.words[a].id === id){
                a = random(wctx.words.length)
                check();
            }
            else return
        };
        if(wctx.words.length > 1) check();
        const b: number = random(wctx.words[a].trWords.length);

        return ictx.cardFilter.rotate === false ? wctx.words[a].trWords[b] : wctx.words[a].enWords[b];
    };
       

    function trueAnswerHandler()  {
        console.log("true")
        swiper!.slideNext();
        //swiper!.slideTo(0, 100)
        
        
    };
    function falseAnswerHandler()  {
        ictx.setState!(UiStatesType.CardColor, "danger");
        let timer =  setTimeout(()=>{
            ictx.setState!(UiStatesType.CardColor, "light");
            clearTimeout(timer);
        }, 400);

    };
    
    useEffect(()=>{
        if(swiper) swiper!.slideTo(0, 0)
    },[ictx.cardFilter.all]);
    
    
    const cards = ictx.cardFilter.all === true ? wctx.words : wctx.favoriteWords;

    return(
        <div className={`wraper`} >
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
              onSwiper={(s: any) => {
                console.log("initialize swiper", s);
                setSwiper(s);
              }}
            >
                { cards.map((word, index)  => 
                <SwiperSlide key={word.id}>
                    <IonCard className="ion-card" color={ictx.cardColor}>
                      <IonCardHeader className="ion-card-heder">
                        <IonCardTitle className="ion-card-title">{ictx.cardFilter.rotate === true ? word.trWords[0] : word.enWords[0]}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent className="ion-card-content">
                        {random(100) < 50 ? (
                            <>
                             <IonButton fill="clear" color={"dark"} onClick={trueAnswerHandler}>{ictx.cardFilter.rotate === true ? word.enWords[0] : word.trWords[0]}</IonButton>
                             <IonButton fill="clear" color={"dark"} onClick={falseAnswerHandler}>{randomAnswerHandler(word.id!)}</IonButton>
                            </>
                        ):(
                            <>
                             <IonButton fill="clear" color={"dark"} onClick={falseAnswerHandler}>{randomAnswerHandler(word.id!)}</IonButton>
                             <IonButton fill="clear" color={"dark"} onClick={trueAnswerHandler}>{ictx.cardFilter.rotate === true ? word.enWords[0] : word.trWords[0]}</IonButton>
                            </> 
                        )}
                      </IonCardContent>
                    </IonCard>
                </SwiperSlide>)}
            </Swiper>
        </div>
    );
};

export default Card;