import { WordsInterface, ObjKey, CardInterface } from "@/Interfaces/Interfces";

class Random{
    constructor(){}
    randomNumber(maxNumber: number){
        return  Math.floor(Math.random() * maxNumber);
    }
    randomWord(arr: WordsInterface[], word: string, en: boolean){
        let counter = 0;
        const generate = () =>{
            counter++;
            if(counter > 15){ 
                const defaultAnswer = ['frustrated', 'random', 'boolean', 'cosmic', 'friendly']
                return defaultAnswer[this.randomNumber(4)]; 
            }
            if(en){
                const generatedWord = arr[this.randomNumber(arr.length - 1)].enWords![0];
                if( generatedWord === word && arr.length > 2){
                    generate();
                }else{
                    return generatedWord;
                }
            }else{
                const randomIndex1 =  this.randomNumber(arr.length - 1);
                const randomIndex2 =  this.randomNumber(arr[randomIndex1].trWords!.length - 1);
                const generatedWord = arr[randomIndex1].trWords![randomIndex2];
                if( generatedWord === word && arr.length > 2){
                    generate();
                }else{
                    return generatedWord;
                }  
            }
        }
        return generate();

    }
}

class Card extends Random{
    cardArr: CardInterface[] ;
    constructor(){
        super();
        this.cardArr = [];
    }
    getCards( userWords: ObjKey){
        for (let key in userWords){
            if (userWords[key].learning) {
                if(this.cardArr.length === 0 || !this.cardArr.find(el => el.id === key) ) this.cardArr.push({id: key, negAnswer: userWords[key].negAnswer, posAnswer: userWords[key].posAnswer});
            }
        }
    }
    generateCardWords(words: WordsInterface[]){
         return this.cardArr.map((card, index)  => {
            const word = words.find(el => el.id === card.id)
            if(word){ 
                const en =  word.enWords![0]
                const tr =  word.trWords![this.randomNumber(word.trWords!.length-1)];
                const randomBtnPosition = this.randomNumber(100);
                const falseEn = this.randomWord(words, en, true) || 'store';
                const falseTr = this.randomWord(words, tr, false) || 'Авто';
                const progress = card.posAnswer / (card.negAnswer *8)
                return {...card, en, tr, randomBtnPosition, falseEn, falseTr, progress};
            }else{ return []}
         });
    }
  

    generate(words: WordsInterface[], userWords: ObjKey){
        this.getCards(userWords);
        return this.generateCardWords(words);
    }

}

export {
    Card,
    Random
}