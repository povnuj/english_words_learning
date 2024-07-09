'use client'
import {Button, Box, Container, styled } from "@mui/material";
import useMediaQuery, { UseMediaQueryOptions } from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import Image from "next/image";

const MNavBrand = styled(Box,{
    name: 'MNavBrand',
    slot: 'root',
})(({}) => ({
    //color: Colors.main,
   
}));

export default function NavBrand() {
    // const theme = useTheme();
    // const options: UseMediaQueryOptions = {
    //   noSsr: true, 
    // };
    // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    // const nav = useAppSelector((state) => state.nav)


    

    return (
        <MNavBrand>
          <Image src='/assets/brand/LogoEWL.svg' alt="Logo" width={50} height={50} />
        </MNavBrand>
    );
}