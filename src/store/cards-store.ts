import { CardsStateInterface, CardInterface } from '@/Interfaces/Interfces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: CardsStateInterface = {
  allCards: [],
  isEn: true,
  isPeek: true, 
 };

const  cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    storeCards: (state, action) => {
      state.allCards = action.payload;
    },
    changLang: (state) => {
      state.isEn = !state.isEn;
    },
    updCard: (state, action) => {
      if(action.payload.progress >= 1 ){
        const allCards = state.allCards.filter(el => el.id !== action.payload.id);
        state.allCards = allCards;
      }else{
        const index = state.allCards.findIndex(el => el.id === action.payload.id);
        state.allCards[index].posAnswer = action.payload.posAnswer;
        state.allCards[index].negAnswer = action.payload.negAnswer;
        state.allCards[index].progress = action.payload.progress;
      }
      //console.log("action =>>",action.payload);
    },
  },
});

export const {storeCards, changLang, updCard } = cardsSlice.actions;
export default cardsSlice.reducer;