
import { FirebaseTypes } from "../types/ListTypes";
import { WordsInterface } from "../interfaces/WordsInterface";
import { UiStateInterface } from "../interfaces/WordsInterface";
import { UiStatesType, WordsStatesType } from "../types/ListTypes";

export class Firebase{
    private url = "https://wordslearning-255d7-default-rtdb.firebaseio.com/users/";
    private email = sessionStorage.getItem('email');
    constructor(){
    }
    async storage(category: string, type?: FirebaseTypes, word?: WordsInterface | {} | [], id?: string){
        let response: Response;
        switch(type){
            case FirebaseTypes.Add:
                response = await fetch(this.url+this.email!.replace('.','_')+`/words/${category}.json`,
                    {
                        method: FirebaseTypes.Add,
                        body: JSON.stringify(word),
                    });
            break;

            case FirebaseTypes.Remove:
                response = await fetch(this.url+this.email!.replace('.','_')+`/words/${category}/${id}.json`,
                    {
                        method: FirebaseTypes.Remove,
                    });
            break;

            case FirebaseTypes.Update:
                response = await fetch(this.url+this.email!.replace('.','_')+`/words/${category}/${id}.json`,
                    {
                        method: FirebaseTypes.Update,
                        body: JSON.stringify(word),
                    });
            break;  

            case FirebaseTypes.LoadCategoryList:
                response = await fetch(this.url+this.email!.replace('.','_')+`/words.json`);
            break;  

            case FirebaseTypes.UpdateCategory:
                response = await fetch(this.url+this.email!.replace('.','_')+`/words/${category}.json`,
                    {
                        method: FirebaseTypes.Update,
                        body: JSON.stringify(word),
                    });
            break;  

            case FirebaseTypes.CloneCategory:
                response = await fetch(this.url+"test@test.com".replace('.','_')+`/words/${category}.json`);
            break;  
            
            case FirebaseTypes.SingUp:
                response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDw_TZfD5zIV5FNlp9G_ZdT4gIP-jDEd8U`,
                    {
                        method: FirebaseTypes.Add,
                        body: JSON.stringify(word),
                    });
            break;  

            case FirebaseTypes.SingIn:
                response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDw_TZfD5zIV5FNlp9G_ZdT4gIP-jDEd8U`,
                    {
                        method: FirebaseTypes.Add,
                        body: JSON.stringify(word),
                    });
            break;  

            default:
                response = await fetch(this.url+this.email!.replace('.','_')+`/words.json`);
        }
        if (!response!.ok) {
            return response.json();
        }
        
        const responseData = await response.json();
        if(responseData){

            return responseData;
        }
        return true;
    }
    login(){}
}




