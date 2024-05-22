import React, { useContext, useEffect, MouseEvent ,useRef, useState, useMemo, useCallback} from "react";
import css from './ListWords.module.css';
import { IonItem, IonLabel, IonList, IonCheckbox, IonFab, IonFabButton, IonFabList, IonIcon} from '@ionic/react';
import { ellipsisVerticalOutline, bookmark, settingsSharp, trash, sadOutline } from 'ionicons/icons';
import { WordsState} from "../../context/words-context";
import { UiState } from "../../context/ui-context";
import { WordsStatesType, UiStatesType } from "../../types/ListTypes";
import { List } from "../../services/words-services";
import EditForm from "./EditForm";


const ListWords: React.FC = () => {
  const wctx =  useContext(WordsState);
  const ictx =  useContext(UiState);
  const Colection = new List(ictx, wctx);
  //let checked: any  = useRef();
    useEffect(()=>{
      Colection.loadListFromDB();
    },[])
    useEffect(()=>{
      //Colection.loadListFromDB();
      //console.log(window.scrollX)
    },[])

  const removeHandler = (index: number) =>{
    //wctx.setState!(WordsStatesType.RemoveWord, index);
    //Colection.removeWord();
  };

  const markHandler = (index: number) =>{
    //wctx.setState!(WordsStatesType.FaworiteWords, index);
    //Colection.markWord();
  };

  const editHandler = (index: number) =>{
    // ictx.setState!(UiStatesType.EditModal, true);
    // wctx.setState!(WordsStatesType.SaveEditedId, index);
    ictx.setState!(UiStatesType.OpenEditForm, true);
    wctx.setState!(WordsStatesType.SaveEditedId, index);
  };
  const isChecked = (id:string) =>{
    console.log("is",id);
    return false;
  }
  function selectItem (id: string){
    
    Colection.selectItem(id);
   //wctx.words.findIndex(el => el.id === id)
   //wctx.setState!(WordsStatesType.SelectedItems, wctx.words.findIndex(el => el.id === id));
   
    //setch(true)
  }
  return (
    <>
      <EditForm />
      <IonList lines="full" className={`${css.wraper} wraper`}  >
      {wctx.words.map((word, index)  =>
        <IonItem key={+Math.random() * 10000 + Math.random() * 10000} button onClick={selectItem.bind(null, word.id!)}>
          <IonCheckbox key={+Math.random() * 10000 + Math.random() * 10000}  id={word.id} justify="start" labelPlacement="end" slot="start" checked={word.isChecked}>
            <IonLabel key={+Math.random() * 10000 + Math.random() * 10000} className={css.list} color={word.learning?"primary": "dark"} >
              <div className={css.col_en} slot="start">{word.enWords}</div>
              <div className={css.col_tr} slot="end">{word.trWords.map(trWord => 
                  <div key={+Math.random() * 10000 + Math.random() * 10000}>{trWord}</div>)}
              </div>
            </IonLabel>
            </IonCheckbox >
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
