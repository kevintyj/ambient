import {JSX, ParentComponent, splitProps} from "solid-js";

import './colorIdentifier.scss'

type IColorIdentifier = ParentComponent< & {
  color?: string;
  textColor?: string;
  class?: string;
  tabindex?: number;
  onClick?: any;
}
>;


const ColorIdentifier: IColorIdentifier = (props) => {

  const [local, others] = splitProps(props, ['children', 'color', 'textColor', 'class', 'tabindex']);

  return (
    <div
      tabindex={props.tabindex}
      onClick={props.onClick}
      class={`
        color-identifier ${props.class ? props.class : '' }
      `}
      style={`
        background-color: ${props.color ? props.color : 'white'};
        color: ${props.textColor ? props.textColor : 'black'}
      `} 
    >
      {props.children}
    </div>
  )
}

export default ColorIdentifier;
