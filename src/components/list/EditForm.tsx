import { useContext, useRef } from "react";
import css from "./AddForm.module.css";
import { UiState } from "../../context/ui-context";
import { UiStatesType } from "../../types/ListTypes";
import { WordsState } from "../../context/words-context";
import { WordsStatesType } from "../../types/ListTypes";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonInput,
} from "@ionic/react";


function EditForm() {
  const ictx = useContext(UiState);
  const wctx = useContext(WordsState);

  const inputEn = useRef<HTMLIonInputElement>(null);
  const inputTr = useRef<HTMLIonInputElement>(null);

  const closeModalHendler = () => {
    ictx.setState!(UiStatesType.EditModal, false);
  };

  const setInputValue = (val: string) => {
    if(typeof wctx.words[wctx.editedWordsId] !== "undefined")
      {
        return val === "en"? wctx.words[wctx.editedWordsId].enWords.join(', '): 
                             wctx.words[wctx.editedWordsId].trWords.join(', ');
      }
  }


  const saveHendler = () => {
    const en: string = inputEn.current!.value!.toString()!;
    const tr: string = inputTr.current!.value!.toString()!;
    //const id: number = wctx.editedWordsId;
    if(en.trim() && tr.trim()) {
      wctx.setState!(WordsStatesType.EditWords, {en, tr});
      closeModalHendler();
    }
  };


  return (
    <IonModal isOpen={ictx.isOpenEditForm}  backdropDismiss={false} color="light">
      <IonHeader>
        <IonToolbar color="light">
          {/* <IonTitle>Add new</IonTitle> */}
          <IonButtons slot="start" onClick={closeModalHendler}>
            <IonButton>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end" onClick={saveHendler}>
            <IonButton>Save</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="light">
        <IonInput
          label="English Word"
          labelPlacement="floating"
          fill="outline"
          ref={inputEn}
          value={setInputValue("en")}
          placeholder="Enter text"
        ></IonInput>
        <IonInput
          className={css.tr_input}
          label="Translate Word"
          labelPlacement="floating"
          fill="outline"
          ref={inputTr}
          value={setInputValue("tr")}
          placeholder="Enter text"
        ></IonInput>
      </IonContent>
    </IonModal>
  );
}

export default EditForm;
