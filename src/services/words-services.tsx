import React,{MouseEvent,useDeferredValue} from "react";
import { WordsInterface, UiStateInterface, WordsStateInterface } from "../interfaces/WordsInterface";
import { LoginedUser, User } from "./user-servises";
import { WordsStatesType, UiStatesType, FirebaseTypes } from "../types/ListTypes";
import { Firebase } from "./firebase-services";

class StringParser {
    constructor() {
    }
    arrParse(arr: string[]){
        this.parse(arr)
    }
    stringParse(str: string){
        return this.parse(str.toString().toLowerCase().split(','))
    }
    parse(arr: string[]){
        return arr.map(el => el.trim()).filter(function (el) {return el !== ''});
    }
} 
class Word extends StringParser{
    constructor(){
        super();
    }
    generateFromArr(en: string[], tr: string[], id?: string):WordsInterface{
        return {
            enWords: en,
            trWords: tr,
            learned: false,
            learning: false,
            posAnswer: 0,
            negAnswer: 1,
        }
    }
    generateFromSring(en: string, tr: string, id?: string): WordsInterface{
        return {
            enWords: this.stringParse(en)! || [],
            trWords: this.stringParse(tr)! || [],
            learned: false,
            learning: false,
            posAnswer: 0,
            negAnswer: 1,
            isChecked: false,
            category: 'string',
        }
    }
}


class List extends Word{
    ictx: UiStateInterface;
    wctx: WordsStateInterface;
    LoginedUser: any;
    list: WordsInterface[];
    User = new User();
    FireBase = new Firebase();
    private email = sessionStorage.getItem('email');

    constructor(ictx: UiStateInterface, wctx: WordsStateInterface){
        super()
        this.ictx = ictx;
        this.wctx = wctx;
        this.LoginedUser = LoginedUser;
        this.list = [];
    }


    async loadListFromDB(wctx?: WordsStateInterface, user?: boolean, email?: string){
        if((user? user : this.User.isValid())){
            
            let response = await (this.FireBase? this.FireBase : new Firebase()).storage((email? email : this.email!), "", FirebaseTypes.LoadCategoryList);
            
            if (response.hasOwnProperty("config") ){
                const category =  response.config.category;
                (wctx? wctx : this.wctx).setState!(WordsStatesType.SaveLoadedCategory, category);

                let arr = [];
                for (let key in response[response.config.category.selected]) {
                    arr.push({id: key, isChecked: false, ...response[response.config.category.selected][key]})
                }
                (wctx? wctx : this.wctx).setState!(WordsStatesType.LoadListFromDB, arr.reverse());
            }else{
                this.ictx.setState!(UiStatesType.ThrowError, "Error: Something went wrong")
            }
        }
    }

    removeWord(){
        if (this.User.isValid()){
            this.wctx.words.forEach((el, index) => {
                if(el.isChecked === true){
                    this.FireBase.storage(this.email!, this.wctx.category.selected, FirebaseTypes.Remove, [], el.id);
                }
            });
            this.wctx.setState!(WordsStatesType.RemoveWord, this.wctx.words.filter(el => el.isChecked !== true));
        } 
        this.allowBtnListFooter(0);
    }
    markWord(){
        if (this.User.isValid()){
       
            let arr = this.wctx.words.map((el, index) => {
                if(el.isChecked === true){
                    el.learning = !el.learning;
                    el.negAnswer = 1;
                    el.posAnswer = 0;
                    el.isChecked = !el.isChecked;
                    this.FireBase.storage(this.email!, this.wctx.category.selected, FirebaseTypes.Update, {learning: el.learning, posAnswer: 0, negAnswer: 1}, el.id );
                }
            })
            this.wctx.setState!(WordsStatesType.MarkWord, arr);
            this.allowBtnListFooter(0)
        } 
    }

    editWord(en: string, tr: string){
        if (this.User.isValid()){
            const obj ={ 
                enWords: this.stringParse(en),
                trWords: this.stringParse(tr),
                isChecked: false,
            }

            this.FireBase.storage(this.email!, this.wctx.category.selected, FirebaseTypes.Update, obj, this.wctx.words[this.wctx.editedWordsId].id); 

            this.wctx.setState!(WordsStatesType.EditWords, obj );
            this.allowBtnListFooter(0);
        } 
    }

    async addWord(en: string, tr: string){
        if (this.User.isValid()){
            const arr = this.generateFromSring(en, tr);
            this.FireBase.storage(this.email!, this.wctx.category.selected, FirebaseTypes.Add, arr);
        } 
        await this.loadListFromDB();
        this.allowBtnListFooter(0)
    }

    findWord(event: Event){
        let val = event as CustomEvent;
        if(val.detail.value.length >= 3){
            this.loadListFromDB().then(() => this.wctx.setState!(WordsStatesType.FilterWords, val.detail.value));
        }
        if(val.detail.value.length === 0){
            this.loadListFromDB();
        }
        this.allowBtnListFooter(0)
    }

    selectItem( index: number){

         const arr = this.wctx.words;
         arr[index].isChecked = !arr[index].isChecked;

         this.wctx.setState!(WordsStatesType.SelectedItems, arr);
         const filter = this.wctx.words.filter(el => el.isChecked)
         console.log(filter.length)
         if(filter.length === 1) this.wctx.words.forEach((el, index) => {
            if(filter[0].id === el.id) this.wctx.setState!(WordsStatesType.SaveEditedId, index)
         });
         this.allowBtnListFooter(filter.length)
    }

    allowBtnListFooter(counter: number, ictx?: UiStateInterface){
        if (counter === 1 ) (ictx? ictx: this.ictx).setState!(UiStatesType.IsCanUseButton,{disableEdit: false, disableMark: false, disableRemove: false})
        else if(counter > 1) (ictx? ictx: this.ictx).setState!(UiStatesType.IsCanUseButton,{disableEdit: true, disableMark: false, disableRemove: false})
        else (ictx? ictx: this.ictx).setState!(UiStatesType.IsCanUseButton,{disableEdit: true, disableMark: true, disableRemove: true})
    }

}

class Category{
    ictx: UiStateInterface;
    wctx: WordsStateInterface;
    LoginedUser: any;
    FireBase = new Firebase();
    private email = sessionStorage.getItem('email');
    User = new User();

    constructor(ictx: UiStateInterface, wctx: WordsStateInterface){
        this.ictx = ictx;
        this.wctx = wctx;
        this.LoginedUser = LoginedUser;
        
    }
    changeCategory(to: string){
        if (this.User.isValid() && to){
            this.FireBase.storage(this.email!, 'config/category/', FirebaseTypes.UpdateCategory, {selected: to}).then(()=>
                 List.prototype.loadListFromDB(this.wctx, this.User.isValid(), this.email!) 
            );
        }
    }
    moveToCategory( to: string,){
        if (this.User.isValid()){
          this.wctx.words.forEach(word => {
            if(word.isChecked){
                let obj = {
                    enWords: word.enWords,
                    trWords: word.trWords,
                    learned: word.learned,
                    learning: word.learning,
                    posAnswer: word.posAnswer,
                    negAnswer: word.negAnswer,
                };
                this.FireBase.storage(this.email!, to, FirebaseTypes.Add, obj);
                this.FireBase.storage(this.email!, this.wctx.category.selected, FirebaseTypes.Remove, [], word.id)
            }
          });
        } 
    }
    async create(name: string, categoryArr?: string[]){
        let obj = {
            enWords: ["book"],
            trWords: ["книга"],
            learned: false,
            learning: false,
            posAnswer: 0,
            negAnswer: 1,
        };
        const arr = categoryArr?.length! > 0? categoryArr : [name]
        await this.FireBase.storage(this.email!, name, FirebaseTypes.Add, obj);
        await this.FireBase.storage(this.email!, "config/category", FirebaseTypes.UpdateCategory, {list: arr, selected: name});
        
    }

}



export {
    Word,
    StringParser,
    List,
    Category
};