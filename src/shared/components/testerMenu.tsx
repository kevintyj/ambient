import {createEffect, ParentComponent, splitProps} from "solid-js";
import {styled} from "solid-styled-components";
import {calcMaxAPCA} from "../styles/functions/contrastCalc";
import {textColorScale} from "../styles/utils/variables.styled";

type IMenuProps<T = {}> = ParentComponent<T &{
  swatch: Record<number, string>,

  textColor?: string,
  bgColor?: string,

  hoverColor?: string,
  hoverBgColor?: string,

  activeColor?: string,
  activeBgColor?: string,

  focusedColor?: string,
  focusedBgColor?: string,

  active?: boolean,
  highlight?: boolean,
  solid?: boolean,
}>

const checkTextColor = (color: string) => {
  return calcMaxAPCA(textColorScale(), color)[2]
}

const TesterMenu: IMenuProps = (props) => {

  const [local, others] = splitProps(props, ['children']);

  const ACTIVE_BG = props.solid ? 600 : 300;
  const HIGHLIGHT = 200;

  const color = props.textColor ? props.textColor :
    props.highlight ? checkTextColor(props.swatch[HIGHLIGHT]) :
      props.active ? checkTextColor(props.swatch[ACTIVE_BG]) : checkTextColor(props.swatch[100]);
  const bgColor = props.bgColor ? props.bgColor :
    props.active ? props.swatch[ACTIVE_BG] :
      props.highlight ? props.swatch[HIGHLIGHT] : 'transparent';

  const hoverColor = props.hoverColor ? props.hoverColor : color;
  const hoverBgColor = props.hoverBgColor ? props.hoverBgColor :
    props.active ? props.swatch[ACTIVE_BG - 100] :
      props.highlight ? props.swatch[HIGHLIGHT - 100] : props.swatch[100];

  const activeColor = props.activeColor ? props.activeColor : color;
  const activeBgColor = props.hoverBgColor ? props.hoverBgColor :
    props.active ? props.swatch[ACTIVE_BG] :
      props.highlight ? props.swatch[ACTIVE_BG] : props.swatch[ACTIVE_BG];

  const focusedColor = props.focusedColor ? props.focusedColor : color;
  const focusedBgColor = props.focusedBgColor ? props.focusedBgColor : bgColor;


  const TesterMenu = styled('button')`
    letter-spacing: -0.45px;
    cursor: pointer !important;
    padding: 10px 21px;
    width: 200px;
    text-align: left;
    max-width: none;
    flex: none;
    transition: all 100ms ease-in-out;
    outline: 0;
    border: none;
    
    color: ${color} !important;
    background-color: ${bgColor};

    font-weight: ${props.active ? 'bold' : ''} !important;
    
    a {
      padding-left: 12px;
      transform: translateY(80px);
      i {
        font-size: 6px;
      }
    }

    &:hover {
      color: ${hoverColor};
      background-color: ${hoverBgColor};
    }
    
    &:active {
      color: ${activeColor};
      background-color: ${activeBgColor};
    }
  `

  return(
    <TesterMenu {...others}>
      {props.children}
    </TesterMenu>
  )
}

export default TesterMenu;
