import { useContext, useRef } from "react";
import css from "./ChangeCategoryForm.module.css";
import { UiState } from "../../context/ui-context";
import { UiStatesType } from "../../types/ListTypes";
import { WordsState } from "../../context/words-context";
import { WordsStatesType } from "../../types/ListTypes";
import { LoginedUser } from "../../services/user-servises"
import { List } from "../../services/words-services";
import { arrowForwardOutline } from 'ionicons/icons';
import { Category } from "../../services/words-services";
// import "./ChangeCategoryForm.css"

import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonInput,
  IonIcon,
  IonItem,
  IonSelect,
  IonSelectOption
} from "@ionic/react";

  function CloneCategory() {
  const ictx = useContext(UiState);
  const wctx = useContext(WordsState);
  // const Colection = new List(ictx, wctx);
  const CloningCategory = new Category(ictx, wctx);
  let newCategory = '';
  const closeModalHendler = () => {
    ictx.setState!(UiStatesType.OpenCategoryForm, {isOpenCloneForm: false});
  };

  const cloneHendler = () => {
    if(newCategory !== '') CloningCategory.clone(newCategory);
    closeModalHendler();
  };

  return (
    <IonModal id="category-modal" className={css.modal} isOpen={ictx.listStates.isOpenCloneForm}  backdropDismiss={false} color="light">
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start" onClick={closeModalHendler}>
            <IonButton>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end" onClick={cloneHendler}>
            <IonButton type="submit">Clone Category</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="light">
    
      <div className={css.category}>
          <IonSelect 
            className={css.col2}
            color="light"
            aria-label="Category"
            fill="outline"
            label="Category" labelPlacement="floating"
            // value={wctx.category.selected}
            onIonChange={(e) => newCategory = e.detail.value}
          >
            {wctx.existCategory.map(el => 
                <IonSelectOption key={el} className={css.category_list} value={el}>{el}</IonSelectOption>
            )}
          </IonSelect>
      </div>
      </IonContent>
    </IonModal>
  );
}

export default CloneCategory;
