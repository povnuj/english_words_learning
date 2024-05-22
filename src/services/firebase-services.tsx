
import { FirebaseTypes } from "../types/ListTypes";
import { WordsInterface } from "../interfaces/WordsInterface";

export class Firebase{
    private url = "https://wordslearning-255d7-default-rtdb.firebaseio.com/users/";
    constructor(){
    }
    async storage(email: string, type?: FirebaseTypes, word?: WordsInterface | {}, id?: string){
        let response: Response;
        switch(type){
            case FirebaseTypes.Add:
                response = await fetch(this.url+email.replace('.','_')+"/words.json",
                    {
                        method: FirebaseTypes.Add,
                        body: JSON.stringify(word),
                    });
            break;

            case FirebaseTypes.Remove:
                response = await fetch(this.url+email.replace('.','_')+`/words/${id}.json`,
                    {
                        method: FirebaseTypes.Remove,
                    });
            break;

            case FirebaseTypes.Update:
                response = await fetch(this.url+email.replace('.','_')+`/words/${id}.json`,
                    {
                        method: FirebaseTypes.Update,
                        body: JSON.stringify(word),
                    });
            break;  

            default:
                response = await fetch(this.url+email.replace('.','_')+".json");
        }

        if (!response!.ok) {
            throw new Error("Something goes wrong :((");
        }
        const responseData = await response.json();
        if(responseData){
            let arr = [];
            for (let key in responseData.words) {
                arr.push({id: key, isChecked: false, ...responseData.words[key]})
              }
            return arr.reverse();
        }
        return true;
    }
    login(){}
}




