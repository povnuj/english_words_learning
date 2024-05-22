import React,{MouseEvent} from "react";
import { WordsInterface, UiStateInterface, WordsStateInterface } from "../interfaces/WordsInterface";
import { LoginedUser } from "./user-servises";
import { WordsStatesType, UiStatesType, FirebaseTypes } from "../types/ListTypes";

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
    constructor(ictx: UiStateInterface, wctx: WordsStateInterface){
        super()
        this.ictx = ictx;
        this.wctx = wctx;
        this.LoginedUser = LoginedUser;
    }
    async loadListFromDB(){
        if(LoginedUser){
            let list = await LoginedUser.isValid();
            if(list === true) list = [];
            this.wctx.setState!(WordsStatesType.LoadListFromDB, list); 
        }
    }
    removeWord(){
        if (LoginedUser){
            // const list = (index: number) => {
            //     return this.wctx.words.filter((e, i) => i !== index)
            // }
            
            this.wctx.words.forEach((el, index) => {
                if(el.isChecked === true){
                    this.LoginedUser.isValid(FirebaseTypes.Remove, [], el.id);
                    const list = this.wctx.words.filter((e, i) => i !== index)
                    this.wctx.setState!(WordsStatesType.RemoveWord, list);
                }
            })
           
        } 

    }
    markWord(){

        if (LoginedUser){
       
            this.wctx.words.forEach((el, index) => {
                if(el.isChecked === true){
                    this.LoginedUser.isValid(FirebaseTypes.Update, {learning: !el.learning, posAnswer: 0, negAnswer: 1}, el.id );
                    this.wctx.setState!(WordsStatesType.MarkWord, index);
                    this.wctx.setState!(WordsStatesType.SelectedItems, index);
                }
            })
        } 
    }
    editWord(en: string, tr: string){
        if (LoginedUser){
            const obj ={ 
                enWords: this.stringParse(en),
                trWords: this.stringParse(tr)
            }

            LoginedUser.isValid(FirebaseTypes.Update, obj, this.wctx.words[this.wctx.editedWordsId].id); 

            this.wctx.setState!(WordsStatesType.EditWords, obj );
        } 
    }
    addWord(en: string, tr: string){
        if (LoginedUser){
            const arr = this.generateFromSring(en, tr);
            
            LoginedUser.isValid(FirebaseTypes.Add, arr);
            
            //this.wctx.setState!(WordsStatesType.AddNewWord, arr );
        } 
        this.loadListFromDB();
    }
    findWord(event: Event){
        let val = event as CustomEvent;
        if(val.detail.value.length >= 3){
            this.loadListFromDB().then(() => this.wctx.setState!(WordsStatesType.FilterWords, val.detail.value));
        }
        if(val.detail.value.length === 0){
            this.loadListFromDB();
        }
        
    }
    selectItem(id: string){
        
        
        this.wctx.setState!(WordsStatesType.SelectedItems, this.wctx.words.findIndex(el => el.id === id));
        console.log();
    }
}




export {
    Word,
    StringParser,
    List
};