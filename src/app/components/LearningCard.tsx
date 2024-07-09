'use client'
import {Button, Box, Container, styled, Typography } from "@mui/material";
import useMediaQuery, { UseMediaQueryOptions } from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import Image from "next/image";
import { CardInterface } from "@/Interfaces/Interfces";
import { useEffect, useState } from "react";
import { changLang, updCard } from "@/store/cards-store";
import { Colors } from "../theme/colors";

const MCard = styled(Box,{
    name: 'MCard',
    slot: 'root',
})(({}) => ({
    //color: Colors.main,
   
}));

const updData = async (id: string, word: {}) => {
    //const router = useRouter();
    const response = await fetch('/api/update-learning',
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, word }),
      })
    if (!response.ok) {
      
      //router.push('/login');
    }
};

 interface TrueInterface {
    truefn: Function;
}

export default function LearningCard(props: CardInterface & TrueInterface) {
    const [isPeek, setIsPeek] = useState(false);
    const [isFalse, setIsFalse] = useState(false);
    const dispatch = useAppDispatch();

    
    const theme = useTheme();
    const options: UseMediaQueryOptions = {
      noSsr: true, 
    };
    //const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isEn = useAppSelector((state) => state.cards.isEn)
    useEffect(() => {
        if(isPeek){
            setTimeout( () => setIsPeek(!isPeek), 800);
        }
    },[isPeek])

    useEffect(() => {
        if(isFalse){
            setTimeout( () => setIsFalse(!isFalse), 400);
        }
    },[isFalse])

    const peekHandler = () => {
        setIsPeek(!isPeek);
        
        
    };
    const changeLamgHandler = () => {
        dispatch(changLang());
    };

    const falseHandler = () => {
        setIsFalse(!isFalse);
        const negAnswer = props.negAnswer + 1;
        let word = {
            learning:  props.posAnswer / (negAnswer*8) >= 1 ? false : true, 
            posAnswer: props.posAnswer,
            negAnswer: negAnswer
        }
        dispatch(updCard({progress: props.posAnswer / (props.negAnswer *8), id: props.id, ...word}));
        updData(props.id, word);
    };

    const trueHandler = () => {
        //console.log(props.posAnswer / (props.negAnswer *8));
        const posAnswer = props.posAnswer + 1;
        let word = {
            learning:  posAnswer / (props.negAnswer *8) >= 1 ? false : true, 
            posAnswer: posAnswer,
            negAnswer: props.negAnswer
        }
        dispatch(updCard({progress: props.posAnswer / (props.negAnswer *8), id: props.id, ...word}));
        updData(props.id, word);
        props.truefn();    
    };

    

    return (
        <>
        {isEn? <MCard sx={isFalse? {background: Colors.danger} : {}}>
            <Box className={'answer_cont'}>
                 

                {isPeek ? <Typography onClick={peekHandler} variant="h3">{props.tr}</Typography> : <Typography onClick={peekHandler} variant="h3">{props.en}</Typography>}

                <Box className={'peek_button_cont'}>
                    
                    <Button onClick={changeLamgHandler}>
                        <Image src={'/assets/ico/change.png'} alt="eye ico" width={18} height={18}  />
                    </Button>
                </Box>
            </Box>
            {props.randomBtnPosition! > 50 ? 
                    <Box className={'button_cont'}>
                        <Button onClick={falseHandler}>{props.falseTr}</Button>
                        <Button onClick={trueHandler}>{props.tr}</Button>
                    </Box>
                    :
                    <Box className={'button_cont'}>
                        <Button onClick={trueHandler}>{props.tr}</Button>
                        <Button onClick={falseHandler}>{props.falseTr}</Button>
                    </Box>
            }
           
        </MCard>
        :
        <MCard sx={isFalse? {background: Colors.danger} : {}}>
            <Box className={'answer_cont'}>
                 
                {isPeek ? <Typography onClick={peekHandler} variant="h3">{props.en}</Typography> : <Typography onClick={peekHandler} variant="h3">{props.tr}</Typography>}


                <Box className={'peek_button_cont'}>
                    
                    <Button onClick={changeLamgHandler}>
                        <Image src={'/assets/ico/change.png'} alt="eye ico" width={18} height={18}  />
                    </Button>
                </Box>
            </Box>
            {props.randomBtnPosition! > 50 ? 
                    <Box className={'button_cont'}>
                        <Button onClick={falseHandler}>{props.falseEn}</Button>
                        <Button onClick={trueHandler}>{props.en}</Button>
                    </Box>
                    :
                    <Box className={'button_cont'}>
                        <Button onClick={trueHandler}>{props.en}</Button>
                        <Button onClick={falseHandler}>{props.falseEn}</Button>
                    </Box>
            }
           
        </MCard>}
        </>
    );
}