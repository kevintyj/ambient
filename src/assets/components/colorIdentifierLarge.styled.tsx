import { styled } from "solid-styled-components";
import {JSX} from "solid-js";

type IColorIdentifier = JSX.HTMLAttributes<HTMLDivElement> & {
  color?: string;
  textColor?: string;
};

export const ColorIdentifier = styled('div')((props: IColorIdentifier) => `
  position: relative;
  background-color: ${props.color ? props.color : 'white'};
  color:  ${props.textColor ? props.textColor : 'white'};
  & .focused {
    z-index: 1;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: -1.5px;
      bottom: -1.5px;
      left: -1.5px;
      right: -1.5px;
      border-radius: 6px;
      border: 2.5px solid #fff;
      box-shadow: 0px 0px 2px 0px #00000032, inset 0px 0px 2px 0px #00000032;
    }
  }
`)
