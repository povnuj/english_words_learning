'use client'
import {Button, Box, Container, styled } from "@mui/material";
import useMediaQuery, { UseMediaQueryOptions } from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import Link from "next/link";

const MNavButtonCont = styled(Box,{
    name: 'MNavButtonCont',
    slot: 'root',
})(({}) => ({
    //color: Colors.main,
   
}));

export default function NavButtonContainer() {
    // const theme = useTheme();
    // const options: UseMediaQueryOptions = {
    //   noSsr: true, 
    // };
    // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    // //const nav = useAppSelector((state) => state.)


    

    return (
        <MNavButtonCont>
            <Link href={'/words-list'}>Список</Link>
            <Link href={'/learning'}>Картки</Link>
            <Link href={'/'}>Вийти</Link>
        </MNavButtonCont>
    );
}