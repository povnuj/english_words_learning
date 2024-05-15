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


//context interfaces===============================
export interface ActionInterface {
    type: string;
    newState: any;
};

export interface WordsStateInterface {
    words: WordsInterface[];
    favoriteWords: WordsInterface[];
    editedWordsId: number;
    setState?: (type: string, newState: any ) => void;
};

export interface UiStateInterface {
    isOpenAddForm: boolean;
    isOpenEditForm: boolean;
    isOpenLerningPage: boolean;
    cardColor: string;
    cardFilter: {
        marked: boolean,
        all: boolean,
        rotate: boolean
    };
    setState?: (type: string, newState: any ) => void;
};

export interface PropsProviderInterface {
    children: React.ReactNode;
};
///===============================================