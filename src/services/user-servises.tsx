
import { Firebase } from "./firebase-services";
import { FirebaseTypes } from "../types/ListTypes";
import { WordsInterface } from "../interfaces/WordsInterface";


class User{
    private password: string;
    private token: string;
    private email: string;
    name: string;
    constructor(email: string, password: string, token: string){
        this.password = password;
        this.token = token;
        this.email = email;
        this.name = 'User';
    }
    isValid( type?: FirebaseTypes, word?: WordsInterface | {}, id?: string){
       return new Firebase().storage(this.email, type, word, id);
    }
}

class Login{
    private email: string;
    private password: string;
    
    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
    chekIsValid(){
      return true ? new User( this.email, this.password, "token") : false;
    }
   
}




//console.log(new User())
const NewUser = new User("test@test.com1", "1245s1","");
const LoginedUser = new Login("test@test.com", "1245s").chekIsValid();


export {
    NewUser,
    LoginedUser
}