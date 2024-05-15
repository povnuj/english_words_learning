import React, {useContext} from 'react';
import { IonFooter, IonTitle, IonToolbar,IonIcon, IonButtons, IonButton } from '@ionic/react';
import { bookmark, checkmarkCircle, albums, shuffleOutline, repeat } from 'ionicons/icons';
import { UiStatesType, WordsStatesType } from '../../../types/ListTypes';
import { UiState } from '../../../context/ui-context';
import { WordsState } from "../../../context/words-context";
import css from "./CardFooter.module.css"

function CardFooter() {
    const ictx = useContext(UiState);
    const wctx = useContext(WordsState);

    const bookmarkHandler = () => {
        ictx.setState!(UiStatesType.CardFilter, {
            marked: true, 
            all: false, 
            rotate: ictx.cardFilter.rotate
        });
    };

    const allWordsHandler = () => {
        ictx.setState!(UiStatesType.CardFilter, {
            marked: false, 
            all: true, 
            rotate: ictx.cardFilter.rotate
        });
    };

    const rotateHandler = () => {
        ictx.setState!(UiStatesType.CardFilter, {
            marked: ictx.cardFilter.marked, 
            all: ictx.cardFilter.all, 
            rotate: !ictx.cardFilter.rotate
        });
    };
    

  return (
      <IonFooter >
        <IonToolbar color='light' >
        <IonButtons className={css['footer-buttons']}>
            <IonButton shape="round" onClick={bookmarkHandler}>
                <IonIcon slot="icon-only" icon={bookmark} color={ictx.cardFilter.marked ?"primary":"dark"} ></IonIcon>
            </IonButton>
            <IonButton shape="round" onClick={allWordsHandler}>
                <IonIcon slot="icon-only" icon={albums} color={ictx.cardFilter.all ?"primary":"dark"} ></IonIcon>
            </IonButton>
            <IonButton shape="round" onClick={rotateHandler}>
                <IonIcon slot="icon-only" icon={repeat} color={ictx.cardFilter.rotate ?"primary":"dark"}></IonIcon>
            </IonButton>
            <IonButton shape="round"  >
                <IonIcon slot="icon-only" icon={shuffleOutline} color={"dark"} ></IonIcon>
            </IonButton>
     
        </IonButtons>    
        </IonToolbar>
      </IonFooter>
  );
}
export default CardFooter;