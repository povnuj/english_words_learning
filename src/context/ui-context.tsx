import React, { createContext, useReducer } from 'react';
import { UiStateInterface, PropsProviderInterface, ActionInterface } from '../interfaces/WordsInterface';
import { UiStatesType } from '../types/ListTypes';
import { NewUser } from '../services/user-servises';
import { error } from 'console';

const UiState = createContext<UiStateInterface>({
    isOpenLerningPage: false,
    cardColor: true,
    progressChange: false,
    studiedWord: false,
    isLogin: false,
    isSignUp: false,
    error: '',
    listStates:{
        isOpenAddForm: false,
        isOpenEditForm: false,
        isAddFormWords: false,
        isEditedWord: false,
        disableEdit: true,
        disableRemove: true,
        disableMark: true,
        isOpenChangeCategoryForm: false,
        isOpenSetingsMenu: false,
        isOpenCloneForm: false,
    },
    cardFilter: {
        marked: true,
        all: false,
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
            
            case UiStatesType.OpenAddForm:
                return {
                    ...state,
                    listStates: {...state.listStates, isOpenAddForm: !state.listStates.isOpenAddForm}
                };
            
            case UiStatesType.OpenEditForm:
                return {
                    ...state,
                    listStates: {...state.listStates, isOpenEditForm: !state.listStates.isOpenEditForm}
                };
            
            case UiStatesType.OpenLearningPage:
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
            
            case UiStatesType.IsCanUseButton:
                
                return {
                    ...state,
                    listStates: {...state.listStates, ...action.newState},
                };


            case UiStatesType.OpenCategoryForm:
            
            return {
                ...state,
                listStates: {...state.listStates, ...action.newState},
            };

            case UiStatesType.OpenForm:
            
            return {
                ...state,
                listStates: {...state.listStates, ...action.newState},
            };
            

            case UiStatesType.ThrowError:
            return {
                ...state,
                error: action.newState,
            };

            case UiStatesType.IsLogined:
                return {
                    ...state,
                    isLogin: action.newState,
            };

            case UiStatesType.IsSignUp:
                return {
                    ...state,
                    isSignUp: action.newState,
            };

            default:
            return state;
        };

    
    };
    
    let initialState: UiStateInterface = {
        isOpenLerningPage: false,
        cardColor: true,
        progressChange: false,
        studiedWord: false,
        isLogin: false,
        isSignUp: false,
        error: '',
        listStates:{
            isOpenAddForm: false,
            isOpenEditForm: false,
            isAddFormWords: false,
            isEditedWord: false,
            disableEdit: true,
            disableRemove: true,
            disableMark: true,
            isOpenChangeCategoryForm: false,
            isOpenSetingsMenu: false,
            isOpenCloneForm: false,
        },
        cardFilter: {
            marked: true,
            all: false,
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


