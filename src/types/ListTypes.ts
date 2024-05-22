export enum UiStatesType{
    OpenAddForm = "isOpenAddForm",
    OpenEditForm = "isOpenEditForm",
    openLearningPage = "isOpenLerningPage",
    AddNewWords = "words",
    CardColor = "CardColor",
    CardFilter = "CardFilter",
    ChangeProgress = "ChangeProgress",
};

export enum WordsStatesType{ 
    LoadListFromDB = "LoadListFromDB",
    AddCards = "AddCards",
    AddFavoriteList = "AddFavoriteList",
    AddNewWord = "Add",
    RemoveWord = "Del",
    EditWords = "Edit",
    SaveEditedId = "SaveEditedId",
    FilterWords = "Filter",
    MarkWord = "MarkWord",
    Answer= "Answer",
    StudiedWords = "StudiedWords",
    SelectedItems = "SelectedItems",
};

export enum FirebaseTypes{
    Add = "POST",
    Remove = "DELETE",
    Update = "PATCH",
}
export enum CardFilterTypes{
    Marked = "Marked",
    Shuffle = "Shuffle",
    LearningMode = "LearningMode",
    AllWords = "AllWords",
    ChangeLanguage = "ChangeLanguage",
    LearningModePeekUp = "LearningModePeekUp",
}
