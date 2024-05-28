import React, {useContext} from "react";
import { IonSearchbar, IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import css from './Filter.module.css';
import { UiState } from '../../context/ui-context';
import { WordsState } from "../../context/words-context";
import { List, Category } from "../../services/words-services";

const NewWord: React.FC = () => {
    const ictx = useContext(UiState);
    const wctx = useContext(WordsState);
    const Colection = new List(ictx, wctx);
    const CurrentCategory = new Category(ictx, wctx);

    const filterHandler = (e: Event) => {
        Colection.findWord(e);
    };

    return(
        <div className={`${css.title} wraper`} >
            <IonSearchbar  color={"light"} className={css.search_bar} mode={'ios'} inputmode={'search'} minlength={3} type={"text"}  onIonInput={filterHandler}></IonSearchbar>
            <div>{wctx.words.length}</div>
            <IonSelect 
              className={css.category}
              color={"light"}
              aria-label="Category"
              // fill="outline"
              label="Category" labelPlacement="floating"
              value={wctx.category.selected}
              onIonChange={(e) => CurrentCategory.changeCategory(e.detail.value)}
            >
              {wctx.category.list.map(el => 
                  <IonSelectOption key={el} className={css.category_list} value={el}>{el}</IonSelectOption>
              )}
            </IonSelect>
        </div>
    );
};

export default NewWord;