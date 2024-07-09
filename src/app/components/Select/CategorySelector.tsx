'use client'
import { Typography, Container, FormControl, InputLabel, MenuItem,Box, styled } from "@mui/material";
import useMediaQuery, { UseMediaQueryOptions } from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { Colors } from "@/app/theme/colors";
import { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
         <FormControl className="category_selector" >
              <InputLabel  id="demo-simple-select-label">Category</InputLabel>
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