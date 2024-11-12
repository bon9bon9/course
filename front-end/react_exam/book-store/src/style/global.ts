import { createGlobalStyle } from "styled-components"
import "sanitize.css"

export const GlobalStyle = createGlobalStyle`
  body{
    padding : 0;
    margin : 0;
    background-color : ${({theme}) => (theme.global.background)}
  }

  h1 {
    margin : 0;
  }

  *{
    color : ${({theme}) => (theme.global.color)}
  }
`;