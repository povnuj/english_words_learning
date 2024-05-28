import React, {useState, useContext, useRef, useEffect} from "react";
import { IonInput, IonContent, IonIcon, IonButton, IonCardContent, IonCard, IonCardHeader,IonCardTitle, IonCardSubtitle} from "@ionic/react";
import { lockClosed } from 'ionicons/icons';
import css from "./Auth.module.css"
import { User } from "../../services/user-servises";
import { UiState } from "../../context/ui-context";
import { UiStatesType } from "../../types/ListTypes";
import { List, Category } from "../../services/words-services";
import { WordsState } from "../../context/words-context";

const Auth: React.FC  = () => {
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();
    const [isValidPassword, setIsValidPassword] = useState<boolean>();
    
    const ictx = useContext(UiState);
    const wctx = useContext(WordsState);
    const inputEmail = useRef<HTMLIonInputElement>(null);
    const inputPassword = useRef<HTMLIonInputElement>(null);
    const inputConfirmPassword = useRef<HTMLIonInputElement>(null);
    
     useEffect(() => {
     },[ictx.error]);
  
    const validateEmail = (email: string) => {
      return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
    };

    const validatePassword = () => {
      let password: string = inputPassword.current!.value!.toString().trim()!;
      let confirmPassword: string = inputConfirmPassword.current!.value!.toString().trim()!;

      setIsValidPassword(undefined);
      if(password && confirmPassword){
        if(confirmPassword == password) setIsValidPassword(true);
        else setIsValidPassword(false);
      }  
    };
  
    const validate = (ev: Event) => {
      const value = (ev.target as HTMLInputElement).value;
  
      setIsValid(undefined);
  
      if (value === '') return;
  
      validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);

    };
  
    const markTouched = () => {
      setIsTouched(true);
    };

    const NewUser = new User();

    if(NewUser.isValid() === true) ictx.setState!(UiStatesType.IsLogined, true);

    async function signInHandler (){
      const email: string = inputEmail.current!.value!.toString()!;
      const password: string = inputPassword.current!.value!.toString()!;
      
      if(email.trim() && password.trim()) {
        const response = await NewUser.SingIn(email, password)
        if( typeof response !== 'undefined') ictx.setState!(UiStatesType.ThrowError, response.error.message);
          if(NewUser.isValid() === true) ictx.setState!(UiStatesType.IsLogined, true);
          else ictx.setState!(UiStatesType.IsLogined, false);
      }
    };

    async function signUpHandler (){
      const email: string = inputEmail.current!.value!.toString()!;
      const password: string = inputPassword.current!.value!.toString()!;
      const confirmPassword: string = inputPassword.current!.value!.toString()!;
      
      if(email.trim() && password.trim() && confirmPassword.trim()) {
        const response = await NewUser.SingUp(email, password)
        if( typeof response !== 'undefined') ictx.setState!(UiStatesType.ThrowError, response.error.message);
          if(NewUser.isValid() === true) {
            new Category(ictx, wctx).create("own category").then(() => ictx.setState!(UiStatesType.IsLogined, true));
          }
          else ictx.setState!(UiStatesType.IsLogined, false);
      }else{
        validatePassword();
      }
    };
    

 return(
    <>
    <IonContent >
      <div className={css.card_container}>
        <IonCard color={"light"} className={css.card}>
            <IonCardHeader>
              {ictx.isSignUp? <IonCardTitle>Register</IonCardTitle> : <IonCardTitle>Login</IonCardTitle>}
              {!ictx.isSignUp?<IonCardSubtitle>SignIn or <span className={css.signUp_btn} onClick={()=>ictx.setState!(UiStatesType.IsSignUp, true)}>Signup</span></IonCardSubtitle>:''}
            </IonCardHeader>
            <IonCardContent  className={css.card_content}>
            <IonInput 
                className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                label="Email" 
                type="email" 
                required 
                labelPlacement="floating" 
                ref={inputEmail}
                fill="outline"  
                errorText="Invalid email" 
                placeholder="Enter your email"
                onIonInput={(event) => validate(event)}
                onIonBlur={() => markTouched()}
            >
            </IonInput>
            <IonInput 
                className={`${isValidPassword && 'ion-valid'} ${!isValidPassword && 'ion-invalid' } ${css.pass_input}`}
                label="Password" 
                type="password" 
                required 
                ref={inputPassword}
                labelPlacement="floating" 
                fill="outline" 
                placeholder="Enter your password"
                onIonInput={()=>ictx.isSignUp?validatePassword:''}
                onIonBlur={()=>ictx.isSignUp?validatePassword:''}
            >
                <IonIcon slot="start" icon={lockClosed} aria-hidden="true"></IonIcon>
            </IonInput>
            {ictx.isSignUp?<IonInput 
                className={`${isValidPassword && 'ion-valid'} ${!isValidPassword && 'ion-invalid'} ${css.pass_input}`}
                label="Confirm password" 
                type="password" 
                required 
                ref={inputConfirmPassword}
                labelPlacement="floating" 
                fill="outline" 
                placeholder="Enter your password"
                onIonInput={validatePassword}
                onIonBlur={validatePassword}
            >
                <IonIcon slot="start" icon={lockClosed} aria-hidden="true"></IonIcon>
            </IonInput>: ''}
            
            {ictx.isSignUp?<IonButton  slot="end" fill="outline" disabled={!isValidPassword} onClick={signUpHandler}>SignUp</IonButton> :
            <IonButton  slot="end" fill="outline" onClick={signInHandler}>LOGIN</IonButton>}
            </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  </>
 );
}

export default Auth;
