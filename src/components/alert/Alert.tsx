import React, {useContext} from 'react';
import { IonAlert, IonButton } from '@ionic/react';
import { UiState } from "../../context/ui-context";
import { UiStatesType } from '../../types/ListTypes';

function Alert() {
    const ictx = useContext(UiState);
  return (
    <>
      <IonAlert
        isOpen={ictx.error !== '' ? true : false}
        header={ictx.error.split(':')[0].split('_').join(' ')}
        message={ictx.error.split(':')[1]}
        buttons={['Ok']}
        onDidDismiss={() => ictx.setState!(UiStatesType.ThrowError, '')}
      ></IonAlert>
    </>
  );
}
export default Alert;