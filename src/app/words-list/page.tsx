'use client'
import { Typography, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import MainContainer from "../components/Conatiners/MainContainer";
import WordsList from "../components/List/WordsList";
import { List } from "@/services/words-services";
import { useAppSelector, useAppDispatch, useAppStore } from '@/store/hooks'
import { storeWords, storeUserWords, storeCategoryList,updateSelectedCategory } from "@/store/words-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CategorySelector from "../components/Select/CategorySelector";

const updSeleCategory = async (category : string) =>{
    const response = await fetch('/api/upd-sel-category',
        {
            method: 'PATCH',
            body: JSON.stringify({category}),
            headers: { 'Content-Type': 'application/json' },
        }
    );
    if (response.ok) {
        const data = await response.json();
    
        
    }else{
        console.log(response.status)
      //  router.push('/login');
    }
};

export default function WordListPage() {
    const NewList = new List();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const wordsList = useAppSelector((state) => state.words.allWords);
    const selectedCategory = useAppSelector((state) => state.words.selectedCategory);
    const categoryList = useAppSelector((state) => state.words.categoryList);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/get-list')
            if (response.ok) {
                const data = await response.json();
               // console.log(data);
                if(data.words) dispatch(storeWords(NewList.createList(data.words)));
                if(data.userWords) dispatch(storeUserWords(data.userWords));
                if(data.categoryList) dispatch(storeCategoryList(data.categoryList));
                if(data.selectedCategory) dispatch(updateSelectedCategory(data.selectedCategory));
                
            }else{
                router.push('/login');
            }
        };

        fetchData();
    }, [dispatch, selectedCategory]);

    useEffect(() => {
    //    console.log(wordsList);
    }, [wordsList]);

    const changeCategoryHandler = (category: string) => {
        updSeleCategory(category);
        dispatch(updateSelectedCategory(category));
    };

    return (
        <MainContainer>
            <CategorySelector wordsList={wordsList} selectedCategory={selectedCategory} categoryList={categoryList} changeCategoryfn={changeCategoryHandler} />
            <WordsList data={wordsList} />
        </MainContainer>
    );
}