
import { CardFilterTypes, UiStatesType, WordsStatesType, FirebaseTypes } from "../types/ListTypes";
import { UiStateInterface, WordsStateInterface, WordsInterface, CardInterface} from '../interfaces/WordsInterface';
import { LoginedUser } from "../services/user-servises";

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

    constructor(ictx: UiStateInterface, wctx: WordsStateInterface){
        super();
        this.ictx = ictx;
        this.wctx = wctx;
        this.result = [];
    }

    card(word: WordsInterface){
        const obj: CardInterface = {
            id: word.id!, 
            en: word.enWords[0],
            tr: word.trWords[this.randomNumber(word.trWords.length)],
            randomBtnPosition: this.randomNumber(100),
            falseEn: this.randomAnswer(this.wctx.words, true, word.id!),
            falseTr: this.randomAnswer(this.wctx.words, false, word.id!),
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

    trueAnswer(id: string){

        if (LoginedUser){

            const i =  this.wctx.words.findIndex(el => el.id ===  id)
            LoginedUser.isValid(FirebaseTypes.Update, {posAnswer: ++this.wctx.words[i].posAnswer}, id);
        
            if(this.wctx.сards.find(el => el.id === id)!.progress >= 1){
                //this.wctx.setState!(WordsStatesType.FaworiteWords, id);///////////////////Do IT
            }

            this.ictx.setState!(UiStatesType.ChangeProgress, true);
        }
    }
    falseAnswer(id: string){
        if (LoginedUser){

            const i =  this.wctx.words.findIndex(el => el.id ===  id)
            LoginedUser.isValid(FirebaseTypes.Update, {negAnswer: ++this.wctx.words[i].negAnswer}, id);

            this.ictx.setState!(UiStatesType.CardColor, false);
            this.ictx.setState!(UiStatesType.ChangeProgress, true);
            let timer =  setTimeout(()=>{
                this.ictx.setState!(UiStatesType.CardColor, true);
                clearTimeout(timer);
            }, 400);
        }   
    }

}




export {
    CCard,
    Random,
    CardFilter,
   // Generate
}