import { useContext, useRef } from "react";
import css from "./AddForm.module.css";
import { UiState } from "../../context/ui-context";
import { UiStatesType } from "../../types/ListTypes";
import { WordsState } from "../../context/words-context";
import { WordsStatesType } from "../../types/ListTypes";
import { LoginedUser } from "../../services/user-servises"
import { List } from "../../services/words-services";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonInput,
} from "@ionic/react";

function AddForm() {
  const ictx = useContext(UiState);
  const wctx = useContext(WordsState);
  const Colection = new List(ictx, wctx);
  const inputEn = useRef<HTMLIonInputElement>(null);
  const inputTr = useRef<HTMLIonInputElement>(null);

  const closeModalHendler = () => {
    ictx.setState!(UiStatesType.OpenAddForm, false);
  };

  const addNewWordHendler = () => {
    
    const en: string = inputEn.current!.value!.toString()!;
    const tr: string = inputTr.current!.value!.toString()!;
    
    if(en.trim() && tr.trim()) {
     // wctx.setState!(WordsStatesType.AddNewWord, {en, tr});
      Colection.addWord(en, tr);
 
      closeModalHendler();
    }
    
  };


  return (
    <IonModal isOpen={ictx.isOpenAddForm}  backdropDismiss={false} color="light">
      <IonHeader>
        <IonToolbar color="light">
          {/* <IonTitle>Add new</IonTitle> */}
          <IonButtons slot="start" onClick={closeModalHendler}>
            <IonButton>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end" onClick={addNewWordHendler}>
            <IonButton type="submit">Add</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="light">
        <IonInput
          label="English Word"
          labelPlacement="floating"
          fill="outline"
          ref={inputEn}
          placeholder="Enter text"
          errorText="Please enter a valid email"
          helperText="Only one word!"
        ></IonInput>
        <IonInput
          className={css.tr_input}
          label="Translate Word"
          labelPlacement="floating"
          fill="outline"
          ref={inputTr}
          placeholder="Enter text"
          helperText="Use , to separate words!"
        ></IonInput>
      </IonContent>
    </IonModal>
  );
}

export default AddForm;
