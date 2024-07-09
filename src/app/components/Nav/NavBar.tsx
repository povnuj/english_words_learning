'use client'
import {Button, Box, Container, styled } from "@mui/material";
import useMediaQuery, { UseMediaQueryOptions } from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import NavButtonContainer from "./NavButtonContainer";
import NavBrand from "./NavBrand";
import MainContainer from "../Conatiners/MainContainer";

const MNavBar = styled(Box,{
    name: 'MNavBar',
    slot: 'root',
})(({}) => ({
    //color: Colors.main,

}));

export default function NavBar() {
    // const theme = useTheme();
    // const options: UseMediaQueryOptions = {
    //   noSsr: true, 
    // };
    // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    // const nav = useAppSelector((state) => state.nav)


    

    return (
      <MNavBar>
        <MainContainer>
          <Box className="nav_body">
            <NavBrand />
            <NavButtonContainer />
          </Box>
        </MainContainer>
      </MNavBar>
    );
}