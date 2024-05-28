import { useContext, useEffect, useState } from "react";
import { UiState } from '../../../context/ui-context';
import { WordsState } from "../../../context/words-context";
import { IonButton, IonCard, IonCardContent, IonIcon, IonCardHeader, IonLabel, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { eyeOutline, checkmarkOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CCard} from "../../../services/card-services";
import { IonProgressBar } from '@ionic/react';
import { UiStatesType } from "../../../types/ListTypes";
import './Card.css';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

const Card = () => {
    const ictx = useContext(UiState);
    const wctx = useContext(WordsState);
    const [swiper, setSwiper] = useState<any>();
    const Cards = new CCard(ictx, wctx);

    useEffect(()=>{
       if (ictx.cardFilter.shuffle){ 
         Cards.generateRandomCard();
         ictx.setState!(UiStatesType.CardFilter, {shuffle: false})
       }
       if (ictx.cardFilter.all) {
         Cards.generateAllCards();
       }else{
         Cards.generateSelectedCards();
       }
    },[ictx.cardFilter.all, ictx.cardFilter.shuffle]);
    
    const peekUpHandler = () => {
        Cards.peekUp();
    };

    function trueAnswerHandler(id: number)  {
        swiper!.slideNext();
        Cards.trueAnswer(id);
        console.log(id)
    };

    function falseAnswerHandler(id: number) {
        Cards.falseAnswer(id);
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
                    <IonCard className="ion-card" color={ictx.cardColor?"light" : "danger"}>
                    { ictx.cardFilter.marked ?
                      <IonProgressBar value={word.progress} color={word.progress <= 1? "tertiary" : "success" } className="progress_bar"></IonProgressBar>
                      : ''
                    }
                     <IonCardHeader className="ion-card-heder">
                        <IonCardTitle className="ion-card-title">{ictx.cardFilter.changeLanguage === true ? word.tr : word.en}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent className="ion-card-content">
                      { word.progress <= 1?
                        !ictx.cardFilter.learningMode ?
                          word.randomBtnPosition < 50 ? (
                            <> 
                              <IonButton fill="clear" color={"dark"} type="button" onClick={trueAnswerHandler.bind(null, index)}>{ictx.cardFilter.changeLanguage === true ? word.en : word.tr}</IonButton>
                              <IonButton fill="clear" color={"dark"} type="reset" onClick={falseAnswerHandler.bind(this, index)}>{ictx.cardFilter.changeLanguage === true ? word.falseEn : word.falseTr}</IonButton>
                            </>
                        ) : (
                            <>
                              <IonButton fill="clear" color={"dark"} type="reset" onClick={falseAnswerHandler.bind(this, index)}>{ictx.cardFilter.changeLanguage === true ? word.falseEn : word.falseTr}</IonButton>
                              <IonButton fill="clear" color={"dark"} type="button" onClick={trueAnswerHandler.bind(null, index)}>{ictx.cardFilter.changeLanguage === true ? word.en : word.tr}</IonButton>
                            </> 
                        ) : (
                            !ictx.cardFilter.learningModePeekUp?(
                              <>
                                <IonButton  shape="round" color={"light"} fill="clear" className="card_eye_btn" onClick={peekUpHandler}>
                                  <IonIcon slot="icon-only" icon={eyeOutline} color={"dark"} ></IonIcon>
                                </IonButton>
                                
                              </>
                            ) : (
                                <IonLabel className="card_eye_answer">{ictx.cardFilter.changeLanguage === true ? word.en : word.tr}</IonLabel>
                            )
                        )
                      : <IonIcon className="card_eye_btn" size="large"  slot="icon-only" icon={checkmarkOutline} color={"success"} ></IonIcon>
                      
                      } 
                      </IonCardContent>
                    </IonCard>
                </SwiperSlide>)}
            </Swiper>
        </div>
    );
};

export default Card;