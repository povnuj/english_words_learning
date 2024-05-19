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
  setState: (type, newState) => {},
});

const WordsStateProvider: React.FC<PropsProviderInterface> = (props) => {
  const setStateHandler = (state: WordsStateInterface, action: ActionInterface) => {

    switch (action.type) {

      case WordsStatesType.AddNewWord:
        const word = new Word(new StringParser(action.newState.en).arr, 
                              new StringParser(action.newState.tr).arr).wordObj;
        if (LoginedUser){
            LoginedUser.isValid(FirebaseTypes.Add, word);
        }   
        state.words.push(word);
        return {
          ...state,
        }

      case WordsStatesType.AddCards:
        return {
          ...state,
          сards: action.newState
        }

      case WordsStatesType.AddList:
        return {
          ...state,
          words: action.newState 
        };

      case WordsStatesType.RemoveWord:
        if (LoginedUser){
          LoginedUser.isValid(FirebaseTypes.Remove, state.words[0], state.words[action.newState].id);
        }   
        return {
          ...state,
          words: state.words.filter((el, i) => i !== action.newState),
        };

      case WordsStatesType.FaworiteWords:
        const i = typeof action.newState === "number"? action.newState : state.words.findIndex(el => el.id === action.newState)
        const favorite = !state.words[i].learning;
        if (LoginedUser){
          LoginedUser.isValid(FirebaseTypes.Update, {learning: favorite, posAnswer: 1, negAnswer: 1}, state.words[i].id );
        } 
        state.words[i].learning = favorite;
        state.words[i].posAnswer = 0;
        state.words[i].negAnswer = 1;
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
          const obj = {
            enWords: new StringParser(action.newState.en).arr, 
            trWords: new StringParser(action.newState.tr).arr
          };
        if (LoginedUser){
          LoginedUser.isValid(FirebaseTypes.Update, obj, state.words[state.editedWordsId].id);
        } 

        state.words[state.editedWordsId].enWords = obj.enWords;
        state.words[state.editedWordsId].trWords = obj.trWords;
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

      default:
        return state;
    };
  };

  let initialState: WordsStateInterface = {
    words: [],
    editedWordsId: 1,
    сards: [],
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
