import React, {useContext, useCallback,useMemo} from 'react';
import { IonFooter, IonToolbar,IonIcon, IonButtons, IonButton,IonPopover,IonContent, IonList, IonItem} from '@ionic/react';
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

    const addHandler = () =>{
         ictx.setState!(UiStatesType.OpenAddForm, true);

    };

    const categoryHandler = () => {
        ictx.setState!(UiStatesType.OpenForm, {isOpenChangeCategoryForm: true});
    };
   
  return (
    <>
      <IonFooter >
        <IonToolbar color='light' >
        <IonButtons className={css['footer-buttons']}>
            <IonButton shape="round" onClick={addHandler}>
                <IonIcon slot="icon-only" icon={add} color={"dark"} ></IonIcon>
            </IonButton>
            <IonButton shape="round"  onClick={editHandler} disabled={ictx.listStates.disableEdit}>
                <IonIcon slot="icon-only" icon={create} color={"dark"}></IonIcon>
            </IonButton>
            <IonButton shape="round"  id="open-popover">
            <IonContent>
               <IonPopover keepContentsMounted={true} trigger="open-popover" onDidDismiss={() => "ictx.setState!(UiStatesType.ThrowError, '')"}>
                <IonButton fill="clear" expand='full' color={'light'} disabled={ictx.listStates.disableMark} onClick={categoryHandler}>Change category</IonButton>
                <IonButton fill="clear" expand='full' color={'light'} >Copy category from the library</IonButton>
               </IonPopover>
            </IonContent>





                <IonIcon slot="icon-only" icon={settingsSharp} color={"dark"}></IonIcon>



            </IonButton>
            <IonButton shape="round" onClick={removeHandler} disabled={ictx.listStates.disableRemove}>
                <IonIcon slot="icon-only" icon={trash} color={"dark"} ></IonIcon>
            </IonButton>
            <IonButton shape="round" onClick={markedHandler} disabled={ictx.listStates.disableMark}>
                <IonIcon slot="icon-only" icon={bookmark} color={"dark"} ></IonIcon>
            </IonButton>
        </IonButtons>    
        </IonToolbar>
      </IonFooter>
      </>
  );
}
export default React.memo(ListFooter);