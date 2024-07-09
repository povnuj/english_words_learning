'use client'
import { Typography, Container } from "@mui/material";
import MainContainer from "../components/Conatiners/MainContainer";
import WordsList from "../components/List/WordsList";
import { List } from "@/services/words-services";
import { useAppSelector, useAppDispatch, useAppStore } from '@/store/hooks'
import { storeCards} from "@/store/cards-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/services/card_services";
import CardSlider from "../components/Swiper/CardSlider";



export default function LearningPage() {
    const NewCarts = new Card();
    const dispatch = useAppDispatch();
    const wordsList = useAppSelector((state) => state.words.allWords);
    const userWords = useAppSelector((state) => state.words.userWords);
    const cards = useAppSelector((state) => state.cards.allCards);
    const router = useRouter();
    //console.log(cards)
    useEffect(() => {
        const gCards = NewCarts.generate(wordsList, userWords);
        if(gCards.length > 0){
            dispatch(storeCards(gCards));
        }else{
            router.push('/words-list')
        }
        
    }, [userWords]);

    useEffect(() => {
       // router.push('/words-list');
        //console.log(cards);
    }, [cards]);

    return (
        <>
            <CardSlider />
        </>
    );
}