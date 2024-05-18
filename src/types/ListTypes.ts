export enum UiStatesType{
    AddModal = "isOpenAddForm",
    EditModal = "isOpenEditForm",
    openLearningPage = "isOpenLerningPage",
    AddNewWords = "words",
    CardColor = "CardColor",
    CardFilter = "CardFilter",
    ChangeProgress = "ChangeProgress",
};

export enum WordsStatesType{
    AddList = "Load",
    AddCards = "AddCards",
    AddFavoriteList = "AddFavoriteList",
    AddNewWord = "Add",
    RemoveWord = "Del",
    EditWords = "Edit",
    SaveEditedId = "SaveEditedId",
    FilterWords = "Filter",
    FaworiteWords = "Faworite",
    Answer= "Answer",
    StudiedWords = "StudiedWords",
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
