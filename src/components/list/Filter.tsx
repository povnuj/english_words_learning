import React, {useContext, useEffect} from "react";
import { IonButton, IonIcon, IonSearchbar } from '@ionic/react';
import {add} from 'ionicons/icons';
import css from './Filter.module.css';
import AddForm from "./AddForm";
import { UiState } from '../../context/ui-context';
import { WordsState } from "../../context/words-context";
import { UiStatesType, WordsStatesType } from '../../types/ListTypes';
import { LoginedUser } from "../../services/user-servises";


const NewWord: React.FC = () => {
    const ictx = useContext(UiState);
    const wctx = useContext(WordsState);


    async function loadListFromDb() {
        if(LoginedUser){
            let list = await LoginedUser.isValid();
            list = list === true ? []: list;
            wctx.setState!(WordsStatesType.AddList, list); 
        }
    };

    useEffect(()=>{
        loadListFromDb();
    },[])

    const filterHandler = (e: Event) => {
        let val = e as CustomEvent;
        if(val.detail.value.length >= 3){
            loadListFromDb().then(() => wctx.setState!(WordsStatesType.FilterWords, val.detail.value));
        }
        if(val.detail.value.length === 0){
            loadListFromDb();
        }
    };

    return(
        <div className={`${css.title} wraper`} >
            <IonSearchbar  color={"light"} className={css.search_bar} mode={'ios'} inputmode={'search'} minlength={3} type={"text"}  onIonInput={filterHandler}></IonSearchbar>
            <IonButton className={css.btn} size="small" color={"light"} onClick={() => {ictx.setState!(UiStatesType.AddModal, true)}}>
              <IonIcon slot="start" icon={add}></IonIcon>NEW</IonButton>
            <AddForm />
        </div>
    );
};

export default NewWord;