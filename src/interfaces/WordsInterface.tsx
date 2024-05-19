export interface UserInterface{
    name: string;
    email: string;
    password: string;
    token: string;
} 

export interface WordsInterface {
    id?: string;
    enWords: string[];
    trWords: string[];
    learned: boolean;
    learning: boolean;
    posAnswer: number;
    negAnswer: number;
};

export interface CardInterface {
    id: string;
    en: string;
    tr: string;
    randomBtnPosition: number;
    falseEn: string;
    falseTr: string;
    progress: number;
}

//context interfaces===============================
export interface ActionInterface {
    type: string;
    newState: any;
};

export interface WordsStateInterface {
    words: WordsInterface[];
    сards: CardInterface[];
    editedWordsId: number;
    setState?: (type: string, newState: any ) => void;
};

export interface UiStateInterface {
    isOpenAddForm: boolean;
    isOpenEditForm: boolean;
    isOpenLerningPage: boolean;
    cardColor: boolean;
    progressChange: boolean;
    studiedWord: boolean,
    cardFilter: {
        marked: boolean,
        all: boolean,
        changeLanguage: boolean,
        learningMode: boolean,
        learningModePeekUp: boolean,
        shuffle: boolean
    };
    setState?: (type: string, newState: any ) => void;
};

export interface PropsProviderInterface {
    children: React.ReactNode;
};
///===============================================