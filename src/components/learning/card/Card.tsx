import {useContext, useEffect, useState } from "react";
import { UiState } from '../../../context/ui-context';
import { WordsState } from "../../../context/words-context";
import { UiStatesType, WordsStatesType} from '../../../types/ListTypes';
import { IonButton, IonCard, IonCardContent, IonIcon, IonCardHeader, IonLabel, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { eyeOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Random, Generate} from "../../../services/card-services";
import { IonProgressBar } from '@ionic/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './Card.css';
import { EffectCards } from 'swiper/modules';

const Card = () => {
    const ictx = useContext(UiState);
    const wctx = useContext(WordsState);
    const [swiper, setSwiper] = useState<any>();

     useEffect(()=>{
        if(ictx.cardFilter.all && !ictx.cardFilter.shuffle ) wctx.setState!(WordsStatesType.AddCards, new Generate().allCards(wctx.words));
        else if(ictx.cardFilter.shuffle && ictx.cardFilter.all) wctx.setState!(WordsStatesType.AddCards, new Generate().randomCard(wctx.words, true));

        if(ictx.cardFilter.marked && !ictx.cardFilter.shuffle) wctx.setState!(WordsStatesType.AddCards, new Generate().selectedCards(wctx.words));
        else if(ictx.cardFilter.shuffle && ictx.cardFilter.marked) wctx.setState!(WordsStatesType.AddCards, new Generate().randomCard(wctx.words, false));
      console.log("eff");
    },[ictx.progressChange, ictx.cardFilter.all, ictx.cardFilter.shuffle]);
    
    const peekUpHandler = () => {
        ictx.setState!(UiStatesType.CardFilter, {learningModePeekUp: !ictx.cardFilter.learningModePeekUp});
        console.log("timer", ictx.cardFilter.learningModePeekUp);

    };

    useEffect(()=>{
        if(ictx.cardFilter.learningModePeekUp) {
                let timer =  setTimeout(()=>{
                    ictx.setState!(UiStatesType.CardFilter, {learningModePeekUp: !ictx.cardFilter.learningModePeekUp});
                    clearTimeout(timer);
                    console.log("timer", ictx.cardFilter.learningModePeekUp);
                }, 900);
        }
    },[ictx.cardFilter.learningModePeekUp]);

    function trueAnswerHandler(id: string)  {
        swiper!.slideNext();
        wctx.setState!(WordsStatesType.Answer, {answer: true, id});
        
        if(wctx.сards.find(el => el.id === id)!.progress >= 1){
          wctx.setState!(WordsStatesType.FaworiteWords, id);
        }
          
      
        
        ictx.setState!(UiStatesType.ChangeProgress, true);
        console.log("answer", wctx.words)
    };

    function falseAnswerHandler(id: string) {
        ictx.setState!(UiStatesType.CardColor, "danger");
        wctx.setState!(WordsStatesType.Answer, {answer: false, id});
        ictx.setState!(UiStatesType.ChangeProgress, true);
        let timer =  setTimeout(()=>{
            ictx.setState!(UiStatesType.CardColor, "light");
            clearTimeout(timer);
        }, 400);
       // console.log("answer", wctx.words)
    };

    
   
    return(
        <div className={`wraper`} >
            <Swiper
              effect={'cards'}
              loop={true}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
              onSwiper={(s: any) => {
                setSwiper(s);
              }}
            >
                { wctx.сards.map((word, index)  => 
                <SwiperSlide key={word.id}>
                    <IonCard className="ion-card" color={ictx.cardColor}>
                    { ictx.cardFilter.marked ?
                      <IonProgressBar value={word.progress} color={"tertiary"} className="progress_bar"></IonProgressBar>
                      : ''
                    }
                     <IonCardHeader className="ion-card-heder">
                        <IonCardTitle className="ion-card-title">{ictx.cardFilter.changeLanguage === true ? word.tr : word.en}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent className="ion-card-content">
                      { !ictx.cardFilter.learningMode ?
                         new Random().randomNumber(100) < 50 ? (
                            <> 
                              <IonButton fill="clear" color={"dark"} onClick={trueAnswerHandler.bind(null, word.id)}>{ictx.cardFilter.changeLanguage === true ? word.en : word.tr}</IonButton>
                              <IonButton fill="clear" color={"dark"} onClick={falseAnswerHandler.bind(null, word.id)}>{ictx.cardFilter.changeLanguage === true ? word.falseEn : word.falseTr}</IonButton>
                            </>
                        ) : (
                            <>
                              <IonButton fill="clear" color={"dark"} onClick={falseAnswerHandler.bind(null, word.id)}>{ictx.cardFilter.changeLanguage === true ? word.falseEn : word.falseTr}</IonButton>
                              <IonButton fill="clear" color={"dark"} onClick={trueAnswerHandler.bind(null, word.id)}>{ictx.cardFilter.changeLanguage === true ? word.en : word.tr}</IonButton>
                            </> 
                        ) : (
                            !ictx.cardFilter.learningModePeekUp?(
                              <>
                                <IonButton shape="round" color={"light"} fill="clear" className="card_eye_btn" onClick={peekUpHandler}>
                                  <IonIcon slot="icon-only" icon={eyeOutline} color={"dark"} ></IonIcon>
                                </IonButton>
                                
                              </>
                            ) : (
                                <IonLabel className="card_eye_answer">{ictx.cardFilter.changeLanguage === true ? word.en : word.tr}</IonLabel>
                            )
                        )
                      } 
                      </IonCardContent>
                    </IonCard>
                </SwiperSlide>)}
            </Swiper>
        </div>
    );
};

export default Card;