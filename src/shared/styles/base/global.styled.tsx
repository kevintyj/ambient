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

  h1 {
    font: 56px/56px ${Base.TEXT_FONT_STACK};
    letter-spacing: -0.5px;
    font-weight: 400;
  }

  h2{
    font: 36px/48px ${Base.TEXT_FONT_STACK};
  }

  h3{
    font: 30px/40px ${Base.TEXT_FONT_STACK};
  }

  h4 {
    font: 24px/32px ${Base.TEXT_FONT_STACK};
    letter-spacing: +0.15px;
  }

  h5 {
    font: 21px/28px ${Base.TEXT_FONT_STACK};
    letter-spacing: +0.15px;
  }

  h5 {
    font: 18px/24px ${Base.TEXT_FONT_STACK};
    letter-spacing: +0.15px;
  }
`

export default GlobalStyles;