export enum UiStatesType{
    OpenAddForm = "isOpenAddForm",
    OpenEditForm = "isOpenEditForm",
    OpenCategoryForm = "isOpenCategoryForm",
    OpenForm = "OpenForm",
    OpenLearningPage = "isOpenLerningPage",
    AddNewWords = "words",
    CardColor = "CardColor",
    CardFilter = "CardFilter",
    ChangeProgress = "ChangeProgress",
    IsCanUseButton = "IsCanUseButton",
    CreateUser = "CreateUser",
    ThrowError = "ThrowError",
    IsLogined = "IsLogined",
    IsSignUp = "IsSinUp",
    
};

export enum WordsStatesType{ 
    LoadListFromDB = "LoadListFromDB",
    AddCards = "AddCards",
    AddWord = "AddWord",
    RemoveWord = "Del",
    EditWords = "Edit",
    SaveEditedId = "SaveEditedId",
    FilterWords = "Filter",
    MarkWord = "MarkWord",
    Answer= "Answer",
    StudiedWords = "StudiedWords",
    SelectedItems = "SelectedItems",
    SaveLoadedCategory = "SaveLoadedCategory",
    AddCloningCategory = "AddCloningCategory",
};

export enum FirebaseTypes{
    Add = "POST",
    Remove = "DELETE",
    Update = "PATCH",
    LoadCategoryList = "LoadCategoryList",
    UpdateCategory = "UpdateCategory",
    SingUp = "SingUp",
    SingIn = "SingIn",
    CloneCategory = "CloneCategory",
}
export enum CardFilterTypes{
    Marked = "Marked",
    Shuffle = "Shuffle",
    LearningMode = "LearningMode",
    AllWords = "AllWords",
    ChangeLanguage = "ChangeLanguage",
    LearningModePeekUp = "LearningModePeekUp",
}
