import {createGlobalStyles as createGlobalStyle} from "solid-styled-components";
import {Base} from "../utils/variables.styled";
import {createEffect, createSignal} from "solid-js";

export const [darkMode, setDarkMode] = createSignal(true);

export const [globalBgColor, setGlobalBgColor] = createSignal('#131313');
export const [globalTextColor, setGlobalTextColor] = createSignal('#ffffff');

createEffect(() => {
  if (darkMode()) {
    setGlobalTextColor('#ffffff');
    setGlobalBgColor('#131313');
  } else {
    setGlobalTextColor('#000000');
    setGlobalBgColor('#ffffff')
  }
})

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${globalBgColor};
    color: ${globalTextColor}; 
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

  p, a, i {
    font: 14px/21px ${Base.CODE_FONT_STACK};
    letter-spacing: -0.45px;
  }

  button, label, form, input, option, select {
    font: 13px/21px ${Base.CODE_FONT_STACK};
    letter-spacing: -0.45px;
  }

  strong {
    font-weight: bold !important;
  }

  a {
    cursor: pointer;
    font-weight: bold !important;
  }

  @media only screen and (max-width: 780px) {
    h1 {
      font: 32px/52px ${Base.TEXT_FONT_STACK};
      letter-spacing: -0.5px;
    }

    h2{
      font: 24px/42px ${Base.TEXT_FONT_STACK};
    }

    h3{
      font: 20px/38px ${Base.TEXT_FONT_STACK};
    }

    h4 {
      font: 16px/32px ${Base.TEXT_FONT_STACK};
      letter-spacing: +0.15px;
    }

    h5 {
      font: 14px/28px ${Base.TEXT_FONT_STACK};
      letter-spacing: +0.15px;
    }

    h5 {
      font: 12px/24px ${Base.TEXT_FONT_STACK};
      letter-spacing: +0.15px;
    }

    h6 {
      font: 11px/22px ${Base.TEXT_FONT_STACK};
      letter-spacing: +0.15px;
    }

    p, a, i {
      font: 12px/18px ${Base.CODE_FONT_STACK};
      letter-spacing: -0.45px;
    }
    
    button, label, form, input, option, select {
      font: 11px/18px ${Base.CODE_FONT_STACK};
      letter-spacing: -0.45px;
    }
  }
`

export default GlobalStyles;
