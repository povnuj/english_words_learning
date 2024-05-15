import React, { useContext} from "react";
import css from './ListWords.module.css';
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { IonButton, IonIcon } from '@ionic/react';
import { heart, bookmark, settingsSharp, trash,sadOutline } from 'ionicons/icons';
import { WordsState} from "../../context/words-context";
import { UiState } from "../../context/ui-context";
import { WordsStatesType, UiStatesType } from "../../types/ListTypes";
import EditForm from "./EditForm";


const ListWords: React.FC = () => {
  const wctx =  useContext(WordsState);
  const ictx =  useContext(UiState);

  const removeHandler = (index: number) =>{
    wctx.setState!(WordsStatesType.RemoveWord, index);
  };

  const favoriteHandler = (index: number) =>{
    wctx.setState!(WordsStatesType.FaworiteWords, index);
  };

  const editHandler = (index: number) =>{
    ictx.setState!(UiStatesType.EditModal, true);
    wctx.setState!(WordsStatesType.SaveEditedId, index);
  };
  
  return (
    <>
      <EditForm />
      <IonList lines="full" className={`${css.wraper} wraper`}  >
      {wctx.words.map((word, index)  =>
        <IonItem key={+Math.random() * 10000 + Math.random() * 10000}>
          <IonLabel className={css.list}>
            <div className={css.col_en}>{word.enWords}</div>
            <div className={css.col_tr}>{word.trWords.map(trWord => 
                <div key={+Math.random() * 10000 + Math.random() * 10000}>{trWord}</div>)}
            </div>
            <div className={css.button_container}>
              <IonButton shape="round" color={"light"} onClick={favoriteHandler.bind(null, index)}>
                <IonIcon slot="icon-only" icon={bookmark} color={word.learning?"primary":"dark"} ></IonIcon>
              </IonButton>

              <IonButton size="small" color={"light"} onClick={editHandler.bind(null, index)}>
                <IonIcon slot="icon-only" md={settingsSharp}></IonIcon>
              </IonButton>
              <IonButton size="small" color={"light"} onClick={removeHandler.bind(null, index)}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonButton>
            </div>
          </IonLabel>
        </IonItem>)} 

        { wctx.words.length === 0 ?
         <IonItem>
          <IonLabel>List is empty! </IonLabel>
          <IonIcon slot="end" color="danger" size="large" md={sadOutline}></IonIcon>
          </IonItem>:''}
      </IonList>

    </>
  );
};

export default ListWords;
