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
    isChecked?: boolean;
    category?: string;
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
    existCategory: [];
    selectedItems: string[];
    editedWordsId: number;
    isRefresh: number,
    category:{
        list: string[],
        selected: string
    }
    setState?: (type: string, newState: any ) => void;
};

export interface UiStateInterface {
    isOpenLerningPage: boolean;
    cardColor: boolean;
    progressChange: boolean;
    studiedWord: boolean,
    isLogin: boolean,
    isSignUp: boolean,
    error: string,
    listStates:{
        isOpenAddForm: boolean,
        isOpenEditForm: boolean,
        isAddFormWords: boolean,
        isEditedWord: boolean,
        disableEdit: boolean,
        disableRemove: boolean,
        disableMark: boolean,
        isOpenChangeCategoryForm: boolean,
        isOpenSetingsMenu: boolean,
        isOpenCloneForm: boolean,
    };
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