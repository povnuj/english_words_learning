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

function ChangeCategoryForm() {
  const ictx = useContext(UiState);
  const wctx = useContext(WordsState);
  // const Colection = new List(ictx, wctx);
  const CurrentCategory = new Category(ictx, wctx);
  let newCategory = '';

  const closeModalHendler = () => {
    ictx.setState!(UiStatesType.OpenCategoryForm, {isOpenChangeCategoryForm: false});
  };

  const moveHendler = () => {
    //ictx.setState!(UiStatesType.OpenCategoryForm, {isOpenChangeCategoryForm: false});
    if(newCategory !== '' && newCategory !== wctx.category.selected){
      console.log("setting change category");
      CurrentCategory.moveToCategory(newCategory);
      CurrentCategory.changeCategory(newCategory);
    }
    closeModalHendler();
  };

  return (
    <IonModal id="category-modal" className={css.modal} isOpen={ictx.listStates.isOpenChangeCategoryForm}  backdropDismiss={false} color="light">
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start" onClick={closeModalHendler}>
            <IonButton>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end" onClick={moveHendler}>
            <IonButton type="submit">Move</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="light">
    
      <div className={css.category}>
        <IonInput 
          className={css.col1}
          color="light"
          label="Current Category"
          labelPlacement="floating"
          fill="outline"
          value={wctx.category.selected}
          disabled>
        </IonInput>
        <IonIcon className={css.col3} slot="icon-only" icon={arrowForwardOutline} color={"dark"} ></IonIcon>
          <IonSelect 
            className={css.col2}
            color="light"
            aria-label="Category"
            fill="outline"
            label="New Category" labelPlacement="floating"
            value={wctx.category.selected}
            onIonChange={(e) => newCategory = e.detail.value}
          >
            {wctx.category.list.map(el => 
                <IonSelectOption key={el} className={css.category_list} value={el}>{el}</IonSelectOption>
            )}
          </IonSelect>
      </div>
      </IonContent>
    </IonModal>
  );
}

export default ChangeCategoryForm;
