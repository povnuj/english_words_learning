'use client'
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

import { Colors } from "./colors";

const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', "900"],
    subsets: ['latin'],
    display: 'swap'
});

let theme = createTheme();

declare module '@mui/material/styles' {
    interface TypographyVariants {
        buttonGreenText: React.CSSProperties;
    }
  
    interface TypographyVariantsOptions {
        buttonGreenText?: React.CSSProperties;
  }
} 

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    buttonGreenText: true;
  }
}

declare module '@mui/material/styles'{
    interface Components {
        MNavBar: {},
        MNavButtonCont: {},
        MNavBrand: {},
        MContainer: {}
        MWordsList: {},
        MListItem: {},
        MCard: {},
        MCategorySelector: {},
        MCheckbox: {},
        MMainCard: {},
    }
}

theme = createTheme(theme,{ 
    breakpoints: {
        values: {
          xs: 350,
          sm: 900,
          md: 1000,
          lg: 1240,
          xl: 1440,
        },
    },
    palette:{
        mode: 'dark'
    },

    typography:{
        fontFamily: 'Roboto, sans-serif',

        h3:{
            fontSize: 'clamp(1rem, 0.9vw, 1rem)',
            fontWeight: 700,
            lineHeight: '28px',
            textTransform: 'uppercase',
        },
        h2:{
            fontSize: 36,
            fontWeight: 700,
            lineHeight: '28px',
            textTransform: 'uppercase',
            [theme.breakpoints.between('xs' , "lg")]: {
                fontSize: 22,
                lineHeight: '24px',
            },
        },
        subtitle1: {
            fontSize: 22,
            fontWeight: 600,
            textTransform: 'uppercase',
            marginTop: 30,
            [theme.breakpoints.between('xs' , "lg")]: {
                fontSize: 18,
                lineHeight: '20px',
            },
        },
        caption: {
            fontSize: 18,
            marginTop: 30,
            [theme.breakpoints.between('xs' , "lg")]: {
                fontSize: 16,
                lineHeight: '18px',
            },
        },
     
        buttonGreenText:{
            fontSize: 27,
            fontWeight: 500,
            lineHeight: '32px',
            color: Colors.light,
            textDecoration: 'none',
            textTransform: 'none',
   
            [theme.breakpoints.down('xl')]: {
                fontSize: 20,
                lineHeight: '20px',
                
            },
            [theme.breakpoints.between('xs' , "lg")]: {
                fontSize: 16,
                lineHeight: '16px',
            },
        },
    },

    components:{

        MMainCard: {
            styleOverrides: {
                root:{
                    marginTop: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    // border : `1px solid  ${Colors.light}`,
                    ".word_form_block": {
                        width: '100%',
                        maxWidth: '600px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        "&-sec1, &-sec2, &-sec3": {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            color: Colors.lightGray,
                            fontSize: 18,
                            [theme.breakpoints.between('xs' , "lg")]: {
                                fontSize: 16,
                                lineHeight: '18px',
                            },
                            "div": {
                                // marginTop: '20px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                            },
                            
                        },
                        "&-sec3": {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        },
                        "&-sec4": {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        },
                        ".line_top": {
                            position: 'relative',
                            background: Colors.lightGray,
                            width: '50px',
                            height: '2px',
                            transform: 'rotateZ(45deg)',
                            bottom: '15px',
                            right: '-9px',
                        },
                        ".line_middle": {
                            position: 'relative',
                            background: Colors.lightGray,
                            width: '50px',
                            height: '2px',
                            

                        },
                        ".line_bottom": {
                            position: 'relative',
                            top: '15px',
                            background: Colors.lightGray,
                            width: '50px',
                            height: '2px',
                            transform: 'rotateZ(-45deg)',
                            right: '-9px',
                        },
                        
                    },
                    ".block_container": {
                        marginLeft: 30,
                        [theme.breakpoints.between('xs' , "lg")]: {
                            marginLeft: 0,
                        },
                    },
                    "ul": {
                        color: Colors.light,
                        marginLeft: 30,
                        listStyle: 'none',
                        "li:before":{
                            content: "'-  '",
                            
                        },
                    },
                }
            } 
        },

        MCategorySelector: {
            styleOverrides: {
                root:{
                    width: '100%',
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    'img': {
                        marginRight: '10px',
                    },
                    '.category_selector': {
                        maxWidth: '300px',
                        minWidth: '200px',
                        color: Colors.light,
                        [theme.breakpoints.down('md')]: {
                            maxWidth: 'none',
                            width: '100%',
                        },
                        'label': {
                            color: Colors.light,
                        },
                        '.select': {
                            color: Colors.light,
                            [theme.breakpoints.down('md')]: {
                                height: '40px',
                            },
                        },
                        'svg': {
                            color: Colors.light,
                        },

                    },
         
                }
            }
        },
        MCard: {
            styleOverrides: {
                root:{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '10px 10px 0',
                    'h3': {
                        display: 'flex',
                        textAlign: 'center',
                    },
                    '.button_cont': {
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: '20px 0',
                        'button' : {
                            color: Colors.dark,
                        }
                    },
                    '.peek_button_cont':{
                        marginTop: '10px',
                    },
                    '.answer_cont':{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '50%',
                    'button': {

                        padding: '0',
                        maxWidth: '20px',
                    },  
                    },


                }
            } 
        },

        MWordsList: {
            styleOverrides: {
                root:{
                    // marginTop: 10,
                    backgroundColor: Colors.dark,
                }
            } 
        },
        MCheckbox: {
            styleOverrides: {
                root:{
                    [theme.breakpoints.down('md')]: {
                        width: '30px',
                        display: 'flex',
                        
                    },
                }
            } 
        },

        MListItem: {
            styleOverrides: {
                root:{
                    color: Colors.lightGray,
                    fontSize: 16,
                   
                    borderBottom: `1px solid ${Colors.lightGray}`,
                    maxWidth: 900,
                    margin: '0 auto',
                    '.checkbox-ico': {
                        width: '30px',
                        display: 'contents',

                    },
                    '.list_col1': {
                        textTransform: "uppercase", 
                        maxWidth: '200px', 
                        //marginLeft: '50px', 
                        //marginRight: '100px',
                        [theme.breakpoints.down('md')]: {
                            marginLeft: '10px', 
                            width: '100%',
                            'span': {
                                width: '100%',
                                fontSize: '12px',
                            },
                        },
                    },
                    
                    '.list_col2': {
                        textTransform: "uppercase",
                        [theme.breakpoints.down('md')]: {
                            marginLeft: '10px',
                            width: '100%',

                            'span': {
                                fontSize: '12px',
                            },
                        },
                    },
                    

                }
            } 
        },

        MContainer: {
            styleOverrides: {
                root:{
                }
            } 
        },

        MNavBrand: {
            styleOverrides: {
                root:{
                    display: 'flex',
                    alignItems: 'center',
                }
            }
        },

        MNavButtonCont: {
            styleOverrides: {
                root:{
                    width: '100%',
                    maxWidth: '300px',
                    columnGap: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    [theme.breakpoints.down('md')]: {
                        justifyContent: 'flex-end',
                    },
                    'a': {
                        fontSize: 'inherit',
                        color: 'inherit',
                        textDecoration: 'none',
                    }
                }
            }
        },

        MNavBar: {
            styleOverrides: {
              root:{
                width: '100%',
                height: 56,
                backgroundColor: Colors.dark,
                color: Colors.lightGray,
                fontSize: 18,
                '& .nav_body': {
                    width: '100%',
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `2px solid ${Colors.lightGray}`
                },
              }
            }
        },
    },



}); 

export {
    theme
}