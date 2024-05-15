import React, {useContext, useEffect} from "react";
import { UiState } from '../../context/ui-context';
import { WordsState } from "../../context/words-context";
import { UiStatesType, WordsStatesType } from '../../types/ListTypes';
import { LoginedUser } from "../../services/user-servises";
import Card from "./card/Card";
import CardFooter from "./card/CardFooter";


const LearningMain: React.FC = () => {
    const ictx = useContext(UiState);
    const wctx = useContext(WordsState);


    // async function loadListFromDb() {
    //     if(LoginedUser){
    //         let list = await LoginedUser.isValid();
            
    //         list = list === true || "undefined" ? []: list;
    //         console.log(list);
    //         wctx.setState!(WordsStatesType.AddList, list); 
    //     }
    // };

    // useEffect(()=>{
    //     loadListFromDb();
        
    // },[])

  

    return(
      <>
        <div className={`wraper`} >
            <Card />
            
        </div>
        {/* <CardFooter /> */}
      </>
    );
};

export default LearningMain;