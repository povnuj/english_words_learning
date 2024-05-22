import React, { useContext, useEffect} from "react";
import { UiState } from "../context/ui-context";
import {WordsStateProvider} from "../context/words-context"
import css from "./MainPage.module.css"
import NavBar from './nav/NavBar';
import  { IonApp, IonContent} from '@ionic/react';
import ListMain from './list/ListMain';
import LearningMain from "./learning/LearningMain";
import CardFooter from "./learning/card/CardFooter";
import ListFooter from "./list/ListFooter";

const MainPage: React.FC = () => {

    const ictx = useContext(UiState);


    return(
        <IonApp className="App">
            <WordsStateProvider>
                <NavBar />
                <IonContent className={css.ion_padding}>
                    {!ictx.isOpenLerningPage ? <ListMain />:<LearningMain /> }
                </IonContent>
                {ictx.isOpenLerningPage ? <CardFooter />: <ListFooter />}
            </WordsStateProvider>
        </IonApp>

    );

};


export default MainPage;

