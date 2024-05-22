import React, { createContext, useReducer } from "react";
import {
  WordsStateInterface,
  PropsProviderInterface,
  ActionInterface,
} from "../interfaces/WordsInterface";
import { WordsStatesType, FirebaseTypes } from "../types/ListTypes";
import { Word, StringParser } from "../services/words-services";
import { LoginedUser } from "../services/user-servises";


const WordsState = createContext<WordsStateInterface>({
  words: [],
  editedWordsId: 11,
  сards: [],
  selectedItems:[],
  setState: (type, newState) => {},
});

const WordsStateProvider: React.FC<PropsProviderInterface> = (props) => {
  const setStateHandler = (state: WordsStateInterface, action: ActionInterface) => {

    switch (action.type) {

      case WordsStatesType.AddNewWord:
        state.words.unshift(action.newState);
        return {
          ...state,
        }

      case WordsStatesType.AddCards:
        return {
          ...state,
          сards: action.newState
        }

      case WordsStatesType.LoadListFromDB:
        return {
          ...state,
          words: action.newState 
        };

      case WordsStatesType.RemoveWord:
        return {
          ...state,
          words:  action.newState,
        };

      case WordsStatesType.MarkWord:
        state.words[action.newState].learning = !state.words[action.newState].learning;
        state.words[action.newState].posAnswer = 0;
        state.words[action.newState].negAnswer = 1;
        return {
          ...state,
        };

      case WordsStatesType.SaveEditedId:
        return {
          ...state,
          editedWordsId: action.newState,
        };

      case WordsStatesType.AddFavoriteList:
        return {
          ...state,
          favoriteWords: action.newState,
        };

      case WordsStatesType.EditWords:
        state.words[state.editedWordsId].enWords = action.newState.enWords;
        state.words[state.editedWordsId].trWords = action.newState.trWords;
        return {
          ...state,
      };

      case WordsStatesType.FilterWords:
        const filtered = state.words.filter(el => el.enWords.filter(en => en).toString().includes(action.newState.toLowerCase()));
        return {
          ...state,
          words: filtered,
        };

      case WordsStatesType.Answer:
        return {
          ...state,
      };  
      case WordsStatesType.SelectedItems:
        state.words[action.newState].isChecked = !state.words[action.newState].isChecked;
        return {
          ...state,
       }; 

      default:
        return state;
    };
  };

  let initialState: WordsStateInterface = {
    words: [],
    editedWordsId: 1,
    сards: [],
    selectedItems:[],
    setState: (type, newState) => {
      dispatch({ type, newState });
    },
  };

  const [state, dispatch] = useReducer(setStateHandler, initialState);

  return (
    <WordsState.Provider value={state}>{props.children}</WordsState.Provider>
  );
};

export { WordsState, WordsStateProvider };
