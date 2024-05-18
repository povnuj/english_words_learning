
import { CardFilterTypes, UiStatesType } from "../types/ListTypes";
import { UiStateInterface, WordsStateInterface, WordsInterface, CardInterface} from '../interfaces/WordsInterface';


class CardFilter {
    action: CardFilterTypes;
    ictx: UiStateInterface;
    constructor(action: CardFilterTypes, ictx: UiStateInterface){
        this.action = action;
        this.ictx = ictx;
        this.doAction();
    }
    doAction(){
        
        switch(this.action){

            case CardFilterTypes.AllWords:
              this.ictx.setState!(UiStatesType.CardFilter, {
                  marked: false, 
                  all: true, 
              });
            break;

            case CardFilterTypes.Marked:
                this.ictx.setState!(UiStatesType.CardFilter, {
                  marked: true, 
                  all: false, 
              });
            break;

            case CardFilterTypes.LearningMode:
                this.ictx.setState!(UiStatesType.CardFilter, {
                  learningMode: !this.ictx.cardFilter.learningMode
              });
            break;

            case CardFilterTypes.ChangeLanguage:
                this.ictx.setState!(UiStatesType.CardFilter, {
                  changeLanguage: !this.ictx.cardFilter.changeLanguage, 
              });
            break;

            case CardFilterTypes.Shuffle:
                this.ictx.setState!(UiStatesType.CardFilter, {
                  shuffle: !this.ictx.cardFilter.shuffle, 
              });
            break;
           default:
       }
    };
    
}
class CCard {
    obj: CardInterface;
    constructor(id: string, en: string, tr: string, falseEn: string, falseTr: string, word: WordsInterface){
        this.obj = {
            id, 
            en,
            tr, 
            falseEn, 
            falseTr, 
            progress: this.progressHandler(word)
        }
    }
    progressHandler(word: WordsInterface){
        return  word.posAnswer / (word.negAnswer *8)
    }
}
 class Random{
    
    constructor(){
    }
    
    randomNumber(maxNumber: number){
        return  Math.floor(Math.random() * maxNumber);
    }

    randomAnswer(words: WordsInterface[], EnLang: boolean, id: string){
        let a: number = this.randomNumber(words.length);
        const check = () => {
            if(words[a].id === id){
                a = this.randomNumber(words.length)
                check();
            }
            else return
        };
        if(words.length > 1) check();
        const b: number = this.randomNumber(words[a].trWords.length);

        return EnLang === false ? words[a].trWords[b] : words[a].enWords[b];
    }
    
}

class Generate extends Random{
    constructor(){
        super();
    }
    allCards(words: WordsInterface[]){
       return words.map((el) => {
            return new CCard(
                el.id!, 
                el.enWords[0], 
                el.trWords[this.randomNumber(el.trWords.length)], 
                this.randomAnswer(words, true, el.id!), 
                this.randomAnswer(words, false, el.id!,),
                el).obj
        });
    }

    selectedCards(words: WordsInterface[]){
        return words.map((el) => {
            if(el.learning === true)
                { 
                return new CCard(
                    el.id!, 
                    el.enWords[0], 
                    el.trWords[this.randomNumber(el.trWords.length)], 
                    this.randomAnswer(words, true, el.id!), 
                    this.randomAnswer(words, false, el.id!),
                    el).obj
            }
        }).filter(el => typeof el !== "undefined");
    }
    randomCard(words: WordsInterface[], allWords: boolean){
        
        const randomize = (words: WordsInterface[]) =>{
             let index = words.length;
             while (index != 0) {
                 let randomIndex = this.randomNumber(index);
                 index--;
                 [words[index], words[randomIndex]] = [words[randomIndex], words[index]];
             }
             return words;
        };

        randomize(words);

        if (allWords) return this.allCards(words);
        else return this.selectedCards(words);
    }
    isDone(){
        
    }

}



export {
    CCard,
    Random,
    CardFilter,
    Generate
}