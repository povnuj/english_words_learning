export enum UiStatesType{
    AddModal = "isOpenAddForm",
    EditModal = "isOpenEditForm",
    openLearningPage = "isOpenLerningPage",
    AddNewWords = "words",
    CardColor = "CardColor",
    CardFilter = "CardFilter"
};

export enum WordsStatesType{
    AddList = "Load",
    AddFavoriteList = "AddFavoriteList",
    AddNewWord = "Add",
    RemoveWord = "Del",
    EditWords = "Edit",
    SaveEditedId = "SaveEditedId",
    FilterWords = "Filter",
    FaworiteWords = "Faworite",
};

export enum FirebaseTypes{
    Add = "POST",
    Remove = "DELETE",
    Update = "PATCH",
}
