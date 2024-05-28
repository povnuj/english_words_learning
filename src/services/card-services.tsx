
import { CardFilterTypes, UiStatesType, WordsStatesType, FirebaseTypes } from "../types/ListTypes";
import { UiStateInterface, WordsStateInterface, WordsInterface, CardInterface} from '../interfaces/WordsInterface';
import { LoginedUser } from "../services/user-servises";
import { Firebase } from "./firebase-services";
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
                  shuffle: true, 
              });
            break;
           default:
       }
    };
    
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

class CCard extends Random {
    ictx: UiStateInterface;
    wctx: WordsStateInterface;
    result: CardInterface[];
    FireBase = new Firebase();

    constructor(ictx: UiStateInterface, wctx: WordsStateInterface){
        super();
        this.ictx = ictx;
        this.wctx = wctx;
        this.result = [];
    }

    card(word: WordsInterface){
        const trueWord = {
            en: word.enWords[0],
            tr: word.trWords[this.randomNumber(word.trWords.length)]
        } 
        const obj: CardInterface = {
            id: word.id!, 
            en: trueWord.en,
            tr: trueWord.tr,
            randomBtnPosition: this.randomNumber(100),
            falseEn: this.randomAnswer(this.wctx.words, true, word.id!),
            falseTr: this.randomAnswer(this.wctx.words, false, word.id!),
            posAnswer: 0,
            negAnswer: 1,
            progress: word.posAnswer / (word.negAnswer *8)
        }
     
        return obj;
    }

    private setCardToContext(){
        this.wctx.setState!(WordsStatesType.AddCards, this.result);
    }

    generateAllCards(wordsArr?: WordsInterface[]){
        let words =  wordsArr ? wordsArr : this.wctx.words;
        this.result = [];
        this.result = words.map((el) => {
            return this.card(el);
        });
        this.setCardToContext();
    }

    generateSelectedCards(wordsArr?: WordsInterface[]){
        let words =  wordsArr ? wordsArr : this.wctx.words;
        this.result = [];
        this.result = words.filter(el => el.learning ).map(el => this.card(el));
        this.setCardToContext();
    }

    generateRandomCard(){
        let words = this.wctx.words;
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

        if (this.ictx.cardFilter.all) {
            return this.generateAllCards(words);
        }else{
            return this.generateSelectedCards(words);
        }    
    }
    peekUp(){
        this.ictx.setState!(UiStatesType.CardFilter, {learningModePeekUp: true});
        let timer =  setTimeout(()=>{
            this.ictx.setState!(UiStatesType.CardFilter, {learningModePeekUp: false});
            clearTimeout(timer);
        }, 400);
    }

    trueAnswer(id: number){

        if (LoginedUser){
            if(this.ictx.cardFilter.marked){
                const arr = this.wctx.сards;
                arr[id].posAnswer++;
                arr[id].progress = arr[id].posAnswer / (arr[id].negAnswer * 8);
                this.wctx.setState!(WordsStatesType.AddCards, arr);
                
                if(arr[id].progress >= 1){
                    this.FireBase.storage(this.wctx.category.selected, FirebaseTypes.Update, {learning: false}, arr[id].id);
                }
            }
        }
    }
    falseAnswer(id: number){
        
        if (LoginedUser){
            if(this.ictx.cardFilter.marked){
                const arr = this.wctx.сards;
                arr[id].negAnswer++;
                arr[id].progress = arr[id].posAnswer / (arr[id].negAnswer * 8);
                this.wctx.setState!(WordsStatesType.AddCards, arr);

                this.ictx.setState!(UiStatesType.CardColor, false);
                let timer =  setTimeout(()=>{
                    this.ictx.setState!(UiStatesType.CardColor, true);
                    clearTimeout(timer);
                }, 400);
            }
        }   
    }

}




export {
    CCard,
    Random,
    CardFilter,
   // Generate
}