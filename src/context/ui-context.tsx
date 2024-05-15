import React, { createContext, useReducer } from 'react';
import { UiStateInterface, PropsProviderInterface, ActionInterface } from '../interfaces/WordsInterface';
import { UiStatesType } from '../types/ListTypes';

const UiState = createContext<UiStateInterface>({
    isOpenAddForm: false,
    isOpenEditForm: false,
    isOpenLerningPage: false,
    cardColor: "light",
    cardFilter: {
        marked: false,
        all: true,
        rotate: false
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
               // console.log(action.newState)
                return {
                    ...state,
                    cardFilter: action.newState
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
        cardFilter: {
            marked: false,
            all: true,
            rotate: false
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


