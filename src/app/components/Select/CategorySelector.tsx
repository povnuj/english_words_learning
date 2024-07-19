'use client'
import { Typography, Container, FormControl, InputLabel, MenuItem,Box, styled } from "@mui/material";
import useMediaQuery, { UseMediaQueryOptions } from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { Colors } from "@/app/theme/colors";
import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from "next/link";
import Image from "next/image";
import { WordsInterface } from "@/Interfaces/Interfces";

const MCategorySelector = styled(Box,{
    name: 'MCategorySelector',
    slot: 'root',
})(({}) => ({
    //color: Colors.main,

}));

interface CategoryInterface {
  selectedCategory: string;
  categoryList: string[];
  changeCategoryfn: Function;
  wordsList: WordsInterface[];
}

export default function CategorySelector(props: CategoryInterface) {

    const [category, setCategory] = useState(props.selectedCategory);
    useEffect(() =>{
    setCategory(props.selectedCategory);
      
    },[props.selectedCategory]);
    
    const handleChange = (event: SelectChangeEvent) => {
      setCategory(event.target.value as string);
      props.changeCategoryfn(event.target.value as string);
    };
    

    return (
      <MCategorySelector>
        <Link href={'/add-word'}>
          <Image src={'/assets/ico/add.png'} alt="eye ico" width={25} height={25}  />
        </Link>
         <FormControl className="category_selector" >
              <InputLabel  id="demo-simple-select-label">{`Category (${props.wordsList.length})`}</InputLabel>
              <Select
                className="select"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {props.categoryList.map(el => {
                  return(<MenuItem key={el} value={el}>{el}</MenuItem>)
                })}
              </Select>
            </FormControl>
      </MCategorySelector>
    );
}