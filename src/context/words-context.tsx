import React, { createContext, useReducer } from "react";
import {
  WordsStateInterface,
  PropsProviderInterface,
  ActionInterface,
} from "../interfaces/WordsInterface";
import { WordsStatesType } from "../types/ListTypes";


const WordsState = createContext<WordsStateInterface>({
  words: [],
  editedWordsId: 11,
  сards: [],
  selectedItems:[],
  isRefresh: 0,
  category:{
    list: [],
    selected: ''
  },
  setState: (type, newState) => {},
});

const WordsStateProvider: React.FC<PropsProviderInterface> = (props) => {
  const setStateHandler = (state: WordsStateInterface, action: ActionInterface) => {

    switch (action.type) {

      case WordsStatesType.AddWord:
        // state.words.unshift(action.newState);
        return {
          ...state,
          words: action.newState
        }

      case WordsStatesType.AddCards:
        return {
          ...state,
          сards: action.newState,
        }

      case WordsStatesType.LoadListFromDB:
        return {
          ...state,
          words: action.newState,
          isRefresh: (state.isRefresh+1)
        };

      case WordsStatesType.RemoveWord:
        return {
          ...state,
          words:  action.newState,
        };

      case WordsStatesType.MarkWord:
        return {
          ...state,
          word: action.newState
        };

      case WordsStatesType.SaveEditedId:
        return {
          ...state,
          editedWordsId: action.newState,
        };

      case WordsStatesType.EditWords:
        state.words[state.editedWordsId].enWords = action.newState.enWords;
        state.words[state.editedWordsId].trWords = action.newState.trWords;
        state.words[state.editedWordsId].isChecked = action.newState.isChecked;
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
        //state.words[action.newState].isChecked = !state.words[action.newState].isChecked;
        //console.log(action.newState)
        return {
          ...state,
          words: action.newState,
       }; 
      
      case WordsStatesType.SaveLoadedCategory:
       return {
         ...state,
         category: action.newState,
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
    isRefresh: 0,
    category:{
      list: [],
      selected: ''
    },
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
