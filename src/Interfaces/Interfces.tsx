import { Breakpoint } from "@mui/material";
export interface ObjKey {
  [key: string]: any;
}
export interface WordsInterface {
  id?: string;
  enWords?: string[];
  trWords?: string[];
  learned: boolean;
  learning: boolean;
  posAnswer: number;
  negAnswer: number;
};

export interface CardInterface {
  id: string;
  en?: string;
  tr?: string;
  randomBtnPosition?: number;
  falseEn?: string;
  falseTr?: string;
  progress?: number;
  posAnswer: number;
  negAnswer: number;
}

export interface CardsStateInterface {
  allCards: CardInterface[];
  isEn: boolean;
  isPeek: boolean; 
};


export interface WordsStateInterface {
  allWords: WordsInterface[];
  userWords: ObjKey;
  categoryList: string[];
  selectedCategory: string;
};

export interface ActionInterface {
    type: string;
    newState: any;
};


export interface PropsProviderInterface {
    children: React.ReactNode;
};