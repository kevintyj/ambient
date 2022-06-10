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

  h1, h2, h3, h4, h5, h6  {
    font-weight: bold !important;
    margin-bottom: 6px;
  }

  h1 {
    font: 36px/56px ${Base.TEXT_FONT_STACK};
    letter-spacing: -0.5px;
  }

  h2{
    font: 28px/48px ${Base.TEXT_FONT_STACK};
  }

  h3{
    font: 24px/40px ${Base.TEXT_FONT_STACK};
  }

  h4 {
    font: 20px/32px ${Base.TEXT_FONT_STACK};
    letter-spacing: +0.15px;
  }

  h5 {
    font: 18px/28px ${Base.TEXT_FONT_STACK};
    letter-spacing: +0.15px;
  }

  h5 {
    font: 16px/24px ${Base.TEXT_FONT_STACK};
    letter-spacing: +0.15px;
  }

  h6 {
    font: 12px/22px ${Base.TEXT_FONT_STACK};
    letter-spacing: +0.15px;
  }

  p, a, label, form, input {
    font: 12px/18px ${Base.CODE_FONT_STACK};
    letter-spacing: -0.45px;
  }

  strong {
    font-weight: bold !important;
  }

  a {
    cursor: pointer;
    font-weight: bold !important;
  }
`

export default GlobalStyles;