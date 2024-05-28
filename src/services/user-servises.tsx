import { Firebase } from "./firebase-services";
import { FirebaseTypes, UiStatesType } from "../types/ListTypes";
import { WordsInterface } from "../interfaces/WordsInterface";
import { UiStateInterface } from "../interfaces/WordsInterface";

class Login{
    constructor(){
      
    }
      chekIsValid(){
        return true ? ()=>{} : false;
      }
     async singUp(email: string, password: string, ictx: UiStateInterface){
         const result  = await new Firebase().storage( '', FirebaseTypes.SingUp, {email, password, returnSecureToken: true });
         if(result.status !== 200){
            return result
         }
       //  this.email = email;
      }
   
}

class User{
    private email: string;
    constructor(){
        this.email = '';
    }
    async SingUp(email: string, password: string){
        const response = await new Firebase().storage( '', FirebaseTypes.SingUp, {email, password, returnSecureToken: true })
        if(response.hasOwnProperty("error"))return response;
        
        sessionStorage.setItem('email', response.email);
        sessionStorage.setItem('idToken', response.idToken);
        sessionStorage.setItem('refreshToken', response.refreshToken);
        sessionStorage.setItem('exp_time', (Date.now() + 3600000).toString());
    }
    async SingIn(email: string, password: string){
        const response = await new Firebase().storage( '', FirebaseTypes.SingIn, {email, password, returnSecureToken: true })
        if(response.hasOwnProperty("error"))return response;
        
        sessionStorage.setItem('email', response.email);
        sessionStorage.setItem('idToken', response.idToken);
        sessionStorage.setItem('refreshToken', response.refreshToken);
        sessionStorage.setItem('exp_time', (Date.now() + 3600000).toString());
    }
    isValid(){
        const exp_time: number = +sessionStorage.getItem('exp_time')!;
        if(exp_time){
            if (exp_time > Date.now()) return true;
            else return false;
        }
    }
}






//console.log("SINGUP:",new Login("test12@test.com", "123456s").singUp())
const NewUser = (new Login());
const LoginedUser = new Login();


export {
    NewUser,
    LoginedUser,
    Login,
    User

}