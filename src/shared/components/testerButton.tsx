import {ParentComponent, splitProps} from "solid-js";
import {styled} from "solid-styled-components";

type IButtonProps<T = {}> = ParentComponent<T &{
  textColor: string,
  bgColor: string,
  borderColor?: string,

  hoverColor?: string,
  hoverBgColor?: string,
  hoverBorderColor?: string,

  activeColor?: string,
  activeBgColor?: string,
  activeBorderColor?: string,

  focusedColor?: string,
  focusedBgColor?: string,
  focusedBorderColor?: string,
}>

const TesterButton: IButtonProps = (props) => {
  const [local, others] = splitProps(props, ['children']);

  const color = props.textColor ? props.textColor : '#ffffff';
  const bgColor = props.bgColor ? props.bgColor : '#333333';
  const borderColor = props.borderColor? props.borderColor : 'transparent';

  const hoverColor = props.hoverColor ? props.hoverColor : color;
  const hoverBgColor = props.hoverBgColor ? props.hoverBgColor : bgColor;
  const hoverBorderColor = props.hoverBorderColor? props.hoverBorderColor : 'transparent';

  const activeColor = props.activeColor ? props.activeColor : color;
  const activeBgColor = props.activeBgColor ? props.activeBgColor : bgColor;
  const activeBorderColor = props.activeBorderColor? props.activeBorderColor : 'transparent';

  const focusedColor = props.focusedColor ? props.focusedColor : color;
  const focusedBgColor = props.focusedBgColor ? props.focusedBgColor : bgColor;
  const focusedBorderColor = props.focusedBorderColor? props.focusedBorderColor : 'transparent';


  const TesterButton = styled('button')`
    letter-spacing: -0.45px;
    font-weight: bold !important;
    cursor: pointer !important;
    outline: none;
    padding: 6px 12px;
    border-radius: 3px;
    max-width: none;
    flex: none;
    transition: all 100ms ease-in-out;
    outline: 0;
    
    color: ${color} !important;
    background-color: ${bgColor};
    border-width: 1px;
    border-style: solid;
    border-color: ${borderColor};

    &:hover {
      color: ${hoverColor};
      background-color: ${hoverBgColor};
      border-color: ${hoverBorderColor};
    }
    
    &:active {
      color: ${activeColor};
      background-color: ${activeBgColor};
      border-color: ${activeBorderColor};
    }
    
    // &:focus {
    //   color: ${focusedColor};
    //   background-color: ${focusedBgColor};
    // }
  `

  return(
    <TesterButton {...others}>
      {props.children}
    </TesterButton>
  )
}

export default TesterButton;
