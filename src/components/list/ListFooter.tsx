import React, {useContext, useEffect} from 'react';
import { IonFooter, IonToolbar,IonIcon, IonButtons, IonButton } from '@ionic/react';
import { bookmark, trash, settingsSharp, repeat, eye, create, add } from 'ionicons/icons';
// import { CardFilterTypes } from '../../../types/ListTypes';
import { UiStatesType, WordsStatesType } from '../../types/ListTypes';
import { UiState } from '../../context/ui-context';
import { WordsState } from '../../context/words-context';
import css from "./ListFooter.module.css"
// import {CardFilter} from '../../../services/card-services';
import { List } from "../../services/words-services";

function ListFooter() {
    const ictx = useContext(UiState);
    const wctx = useContext(WordsState);
    const Colection = new List(ictx, wctx);
    
    
    const markedHandler = () => {
        Colection.markWord();
    }   

    const removeHandler = (): void => {
        Colection.removeWord();
    };

    const editHandler = () =>{
        ictx.setState!(UiStatesType.OpenEditForm, true);
    };

   
  return (
      <IonFooter >
        <IonToolbar color='light' >
        <IonButtons className={css['footer-buttons']}>
            <IonButton shape="round" onClick={() => {ictx.setState!(UiStatesType.OpenAddForm, true)}}>
                <IonIcon slot="icon-only" icon={add} color={"dark"} ></IonIcon>
            </IonButton>
            <IonButton shape="round"  onClick={editHandler}>
                <IonIcon slot="icon-only" icon={create} color={"dark"}></IonIcon>
            </IonButton>
            <IonButton shape="round" >
                <IonIcon slot="icon-only" icon={settingsSharp} color={"dark"}></IonIcon>
            </IonButton>
            <IonButton shape="round" onClick={removeHandler}>
                <IonIcon slot="icon-only" icon={trash} color={"dark"} ></IonIcon>
            </IonButton>
            <IonButton shape="round" onClick={markedHandler} >
                <IonIcon slot="icon-only" icon={bookmark} color={"dark"} ></IonIcon>
            </IonButton>
        </IonButtons>    
        </IonToolbar>
      </IonFooter>
  );
}
export default ListFooter;