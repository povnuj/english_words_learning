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
        MCategorySelector: {
            styleOverrides: {
                root:{
                    width: '100%',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'flex-end',
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
                            minWidth: '90px',
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