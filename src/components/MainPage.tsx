import React, { useContext, useEffect} from "react";
import { UiState } from "../context/ui-context";
import {WordsStateProvider} from "../context/words-context"
import NavBar from './nav/NavBar';
import  { IonApp, IonContent} from '@ionic/react';
import ListMain from './list/ListMain';
import LearningMain from "./learning/LearningMain";
import CardFooter from "./learning/card/CardFooter";

const MainPage: React.FC = () => {

    const ictx = useContext(UiState);


    return(
        <IonApp className="App">
            <WordsStateProvider>
                <NavBar />
                <IonContent className="ion-padding">
                    {!ictx.isOpenLerningPage ? <ListMain />:<LearningMain /> }
                </IonContent>
                {ictx.isOpenLerningPage ? <CardFooter />:''}
            </WordsStateProvider>
        </IonApp>

    );

};


export default MainPage;

