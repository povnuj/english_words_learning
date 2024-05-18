import { WordsInterface } from "../interfaces/WordsInterface";

class Word{
    wordObj: WordsInterface;
    constructor(en: string[], tr: string[]){
        this.wordObj = {
            enWords: en,
            trWords: tr,
            learned: false,
            learning: false,
            posAnswer: 1,
            negAnswer: 1,
        }
    }
}

class StringParser {
    arr: string[];
    constructor(str: string) {
        this.arr = this.parse(str);
    }
    parse(str: string){
        const wordsArr: string[] = str.toString().toLowerCase().split(',');
        return wordsArr.map(el => el.trim()).filter(function (el) {return el !== ''});
    }
} 


export {
    Word,
    StringParser
};