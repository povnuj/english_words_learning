import React, { useContext} from "react";
import  { IonHeader, IonSegment,IonToolbar,IonSegmentButton,IonLabel } from '@ionic/react';
import { UiState } from "../../context/ui-context";
import { UiStatesType } from "../../types/ListTypes";
const NavBar: React.FC = () => {

  const ictx = useContext(UiState);
  

  const clickWordsPageHandler = () =>  {
    ictx.setState!(UiStatesType.openLearningPage, false);
  };

  const clickLearningPageHandler = () =>  {
    ictx.setState!(UiStatesType.openLearningPage, true);
  };

  return(
      <IonHeader >
        <IonToolbar color={'light'}>
          <IonSegment value={ictx.isOpenLerningPage ? "Learning" : "List"}>
            <IonSegmentButton value="List" onClick={clickWordsPageHandler}>
              <IonLabel>List of Words</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Learning" onClick={clickLearningPageHandler}>
              <IonLabel>Learning Section</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
  );
};


export default NavBar;