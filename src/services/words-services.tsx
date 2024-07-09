import { WordsInterface } from "@/Interfaces/Interfces";

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
        }
    }
}

class List extends Word {
    constructor(){
        super();
    }
    createList(data: any){
        let words = [];
        for (let key in data) {
            words.push({id: key, ...data[key]})
        }
        return words;
    }

}

export {
    Word,
    StringParser,
    List,
    //Category
};