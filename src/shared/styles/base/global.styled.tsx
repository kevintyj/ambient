import {createGlobalStyles as createGlobalStyle} from "solid-styled-components";
import {Base} from "../utils/variables.styled";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    color: #1E1E1E;
    font-family: ${Base.TEXT_FONT_STACK};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: '${Base.CODE_FONT_STACK}';
  }
`

export default GlobalStyles;