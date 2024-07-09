import { WordsStateInterface } from '@/Interfaces/Interfces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: WordsStateInterface = {
  allWords:[],
  userWords: {},
  categoryList: [],
  selectedCategory: '',
 };

const  wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    storeWords: (state, action) => {
      state.allWords = action.payload;
    },
    storeUserWords: (state, action) => {
      state.userWords = action.payload;
    },
    storeCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    updateUserWords: (state, action) => {
      state.userWords[action.payload.id] = {...action.payload.word};
    },
    updateSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
   
  },
});

export const {storeWords, storeUserWords, storeCategoryList, updateUserWords, updateSelectedCategory } = wordsSlice.actions;
// Описуйте дії
//export const {  } = navSlice.actions.getItems;
export default wordsSlice.reducer;