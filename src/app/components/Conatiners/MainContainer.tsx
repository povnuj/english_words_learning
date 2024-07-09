'use client'
import { Box, Button, Container, styled } from "@mui/material";
import { useRouter } from 'next/navigation'
import useMediaQuery, { UseMediaQueryOptions } from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';

const MContainer = styled(Container,{
    name: 'MContainer',
    slot: 'root',
})(({}) => ({
    //color: Colors.main,
    
}));

// interface ContainerProps {
//     isSlider?: boolean;
// }


export default function MainContainer({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const theme = useTheme();
    const options: UseMediaQueryOptions = {
        noSsr: true, 
    };
    const isXs = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));

    return (
    <>
      {isSm || isXs? <MContainer maxWidth="sm">{children}</MContainer> : ''}
      {isMd? <MContainer maxWidth="md">{children}</MContainer> : ''}
      {isLg? <MContainer maxWidth="lg">{children}</MContainer> : ''}
      {isXl? <MContainer maxWidth="xl" >{children}</MContainer> : ''}
    </>
    );
  }