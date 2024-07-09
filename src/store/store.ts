
//import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit'
import wordsReducer  from './words-store';
import cardsReducer from './cards-store'
// import footerReducer from './footerStore'

export const makeStore = () => {
  return configureStore({
    reducer: {
        words: wordsReducer,
        cards: cardsReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

