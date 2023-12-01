import type { ParentComponent } from 'solid-js';

import './colorIdentifier.scss';

type IColorIdentifier = ParentComponent< & {
	color?: string
	textColor?: string
	class?: string
	tabindex?: number
	onClick?: any
}
>;

const ColorIdentifier: IColorIdentifier = (props) => {
	return (
		<div
			tabindex={props.tabindex}
			onClick={props.onClick}
			class={`
        color-identifier ${props.class ? props.class : ''}
      `}
			style={`
        background-color: ${props.color ? props.color : 'white'};
        color: ${props.textColor ? props.textColor : 'black'}
      `}
		>
			{props.children}
		</div>
	);
};

export default ColorIdentifier;
