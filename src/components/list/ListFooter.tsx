import React, {useContext} from 'react';
import { IonFooter, IonToolbar,IonIcon, IonButtons, IonButton,IonPopover,IonContent, IonList, IonItem} from '@ionic/react';
import { bookmark, trash, logOutOutline, settingsSharp, create, add } from 'ionicons/icons';
import { UiStatesType, WordsStatesType } from '../../types/ListTypes';
import { UiState } from '../../context/ui-context';
import { WordsState } from '../../context/words-context';
import css from "./ListFooter.module.css"
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
    const cloneHandler = () =>{ 
        ictx.setState!(UiStatesType.OpenForm, {isOpenCloneForm: true});
    };
   
    const signOutHandler = () =>{
        sessionStorage.removeItem("exp_time");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("refreshToken");
        ictx.setState!(UiStatesType.IsLogined, false);
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
            <IonButton shape="round"  id="open-popover" >
            <IonContent>
               <IonPopover isOpen={ictx.listStates.isOpenSetingsMenu} keepContentsMounted={true} trigger="open-popover" dismissOnSelect={true}>
                <IonButton fill="clear" expand='full' color={'light'} disabled={ictx.listStates.disableMark} onClick={categoryHandler}>Change category</IonButton>
                <IonButton fill="clear" expand='full' color={'light'} onClick={cloneHandler}>Copy category from the library</IonButton>
                <IonButton fill="clear" expand='full' color={'light'} onClick={signOutHandler}>SignOut
                <IonIcon slot="end" icon={logOutOutline} color={"light"}></IonIcon>
                </IonButton>
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