import React, { createContext, useReducer } from 'react';
import { UiStateInterface, PropsProviderInterface, ActionInterface } from '../interfaces/WordsInterface';
import { UiStatesType } from '../types/ListTypes';

const UiState = createContext<UiStateInterface>({
    isOpenAddForm: false,
    isOpenEditForm: false,
    isOpenLerningPage: false,
    cardColor: "light",
    progressChange: false,
    studiedWord: false,
    cardFilter: {
        marked: false,
        all: true,
        changeLanguage: false,
        learningMode: false,
        learningModePeekUp: false,
        shuffle: false,
    },
    setState: (newState) => {}
});

const UiStateProvider:React.FC<PropsProviderInterface> = (props) =>{

    const setStateHandler = (state: UiStateInterface, action: ActionInterface) =>{
        switch (action.type) {
            
            case UiStatesType.AddModal:
                return {
                    ...state,
                    [action.type]: (action.newState)
                };
            
            case UiStatesType.EditModal:
                return {
                    ...state,
                    [action.type]: (action.newState)
                };
            
            case UiStatesType.openLearningPage:
                return {
                    ...state,
                    isOpenLerningPage: action.newState
                };

            case UiStatesType.CardColor:
                return {
                    ...state,
                    cardColor: action.newState
                };

            case UiStatesType.CardFilter:
                return {
                    ...state,
                    cardFilter: {...state.cardFilter, ...action.newState},
                };

            case UiStatesType.ChangeProgress:
                return {
                    ...state,
                    progressChange: !state.progressChange,
                };


            default:
            return state;
        };

    
    };
    
    let initialState: UiStateInterface = {
        isOpenAddForm: false,
        isOpenEditForm: false,
        isOpenLerningPage: false,
        cardColor: "light",
        progressChange: false,
        studiedWord: false,
        cardFilter: {
            marked: false,
            all: true,
            changeLanguage: false,
            learningMode: false,
            learningModePeekUp: false,
            shuffle: false,
        },
        setState: (type, newState) => {
            dispatch({type, newState});
        },
        
    };

    const [state, dispatch] = useReducer(setStateHandler, initialState)
    
     return(
        <UiState.Provider value={state}>
            {props.children}
        </UiState.Provider>
     );
 };

export {
    UiState,
    UiStateProvider
}


