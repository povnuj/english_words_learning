'use client'
import * as React from 'react';
import {Button, Box, Container, styled } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import useMediaQuery, { UseMediaQueryOptions } from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { Colors } from '@/app/theme/colors';
import { WordsInterface } from '@/Interfaces/Interfces';
import { updateUserWords } from "@/store/words-store";
import { useRouter } from 'next/navigation';

const MWordsList = styled(List,{
    name: 'MWordsList',
    slot: 'root',
})(({}) => ({
    //color: Colors.main,
   
}));

const MListItem = styled(ListItem,{
  name: 'MListItem',
  slot: 'root',
})(({}) => ({
  //color: Colors.main,
 
}));

const MCheckbox = styled(Checkbox,{
  name: 'MCheckbox',
  slot: 'root',
})(({}) => ({
  //color: Colors.main,
 
}));

interface listData {
  data: WordsInterface[];
}
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

export default function WordsList(props: listData) {
  const userList = useAppSelector((state) => state.words.userWords);
  const dispatch = useAppDispatch();

  const clickHandle = (id: string) =>{
    //console.log(userList);
    if(typeof userList[id] === 'undefined' ||  userList[id].learning ){
      const word = {learning: false, negAnswer: 1, posAnswer: 0 }
      dispatch(updateUserWords({id, word}));
      updData(id, word);
    }else{
      const word = {learning: true,negAnswer: 1, posAnswer: 0}
      dispatch(updateUserWords({id, word}));
      updData(id, word);
    }
    //updateUserWords
  };

  const isCheckedHandler = (id: string) =>{
    if(userList.hasOwnProperty(id)){
      
      if(userList[id].learning) return true 
      else return false;
    }
  };


  return (
    <MWordsList>
      {props.data.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <MListItem
            key={value.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={()=>clickHandle(value.id!)} dense>
              <ListItemIcon>
                <MCheckbox
                  className='checkbox-list'
                  edge="start"
                  checked={isCheckedHandler(value.id!)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  sx={{color:`${Colors.lightGray}`}}
                />
              </ListItemIcon> 
              <ListItemText className='list_col1' id={labelId} primary={value.enWords![0]} />
              <ListItemText className='list_col2' id={labelId} primary={value.trWords?.map((el, i, arr) => arr.length-1 !== i ?el +', ' : el)} />
            </ListItemButton>
          </MListItem>
        );
      })}
    </MWordsList>
  );
}