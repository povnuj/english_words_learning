import React, {useContext} from 'react';
import { IonFooter, IonToolbar,IonIcon, IonButtons, IonButton } from '@ionic/react';
import { bookmark, albums, shuffleOutline, repeat, eye } from 'ionicons/icons';
import { CardFilterTypes } from '../../../types/ListTypes';
import { UiState } from '../../../context/ui-context';
import css from "./CardFooter.module.css"
import {CardFilter} from '../../../services/card-services';

function CardFooter() {
    const ictx = useContext(UiState);

    const filterHandler = (action: CardFilterTypes): void => {
        new CardFilter(action, ictx);
    };


  return (
      <IonFooter >
        <IonToolbar color='light' >
        <IonButtons className={css['footer-buttons']}>
            <IonButton shape="round" onClick={() =>filterHandler(CardFilterTypes.Marked)}>
                <IonIcon slot="icon-only" icon={bookmark} color={ictx.cardFilter.marked ?"primary":"dark"} ></IonIcon>
            </IonButton>
            <IonButton shape="round" onClick={() =>filterHandler(CardFilterTypes.AllWords)}>
                <IonIcon slot="icon-only" icon={albums} color={ictx.cardFilter.all ?"primary":"dark"} ></IonIcon>
            </IonButton>
            <IonButton shape="round" onClick={() =>filterHandler(CardFilterTypes.ChangeLanguage)}>
                <IonIcon slot="icon-only" icon={repeat} color={ictx.cardFilter.changeLanguage ?"primary":"dark"}></IonIcon>
            </IonButton>
            <IonButton shape="round" onClick={() =>filterHandler(CardFilterTypes.Shuffle)}>
                <IonIcon slot="icon-only" icon={shuffleOutline} color={ictx.cardFilter.shuffle ?"primary":"dark"} ></IonIcon>
            </IonButton>
            <IonButton shape="round" onClick={() =>filterHandler(CardFilterTypes.LearningMode)}>
                <IonIcon slot="icon-only" icon={eye} color={ictx.cardFilter.learningMode ?"primary":"dark"} ></IonIcon>
            </IonButton>
        </IonButtons>    
        </IonToolbar>
      </IonFooter>
  );
}
export default CardFooter;