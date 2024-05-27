import React, { useContext, useEffect, MouseEvent , useCallback, useState,useDeferredValue} from "react";
import css from './ListWords.module.css';
import { IonItem, IonLabel, IonList, IonCheckbox, IonIcon} from '@ionic/react';
import { sadOutline } from 'ionicons/icons';
import { WordsState} from "../../context/words-context";
import { UiState } from "../../context/ui-context";
import { UiStatesType, WordsStatesType } from "../../types/ListTypes";
import { List } from "../../services/words-services";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import ChangeCategoryForm from "./ChangeCategoryForm";

const ListWords: React.FC = () => {
  const wctx = useContext(WordsState);
  const ictx = useContext(UiState);
  const Colection = new List(ictx, wctx);

  useEffect(()=>{
  },[ ])
  
  useEffect(()=>{
    Colection.loadListFromDB();

  },[])


  const selectItem = (index: number, e: MouseEvent) =>{
    e.preventDefault();
    Colection.selectItem(index)
  }

  return (
    <>
      <EditForm />
      <AddForm />
      <ChangeCategoryForm />
      <IonList lines="full" className={`${css.wraper} wraper`}  >
      {wctx.words.map((word, index)  =>
        <IonItem key={word.id} button onClick={selectItem.bind(null, index!)}>
          <IonCheckbox id={word.id} justify="start" labelPlacement="end" slot="start" checked={word.isChecked}> </IonCheckbox >
            <IonLabel className={css.list} color={word.learning?"primary": "dark"} >
              <div className={css.col_en} slot="start">{word.enWords}</div>
              <div className={css.col_tr} slot="end">{word.trWords.map((trWord, i, arr) => 
                  <div key={trWord}>{trWord}{arr.length > 1 ?" | ":""}</div>)}
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
