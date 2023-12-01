import type { ParentComponent } from 'solid-js';
import { css } from 'solid-styled';

type IButtonProps = ParentComponent< & {
	textColor?: string
	color?: string
	hoverColor?: string
	border: 'top' | 'full' | 'full-top'
	borderColor?: string
	hoverBorderColor?: string
	borderTopColor?: string
	borderTopHoverColor?: string
	selfFlex?: boolean
	type?: 'submit' | 'reset' | 'button' | undefined
}>;

const PlaygroundBtn: IButtonProps = (props) => {
	css`
    .playground-btn {
      color: ${props.textColor ? props.textColor : ''};
      background-color: ${props.color ? props.color : ''};
      border-color: ${props.borderColor ? props.borderColor : ''};
      border-width: ${props.border === 'top' ? '1px 0 0 0' : '1px'} !important;
      border-top-color: ${props.borderTopColor ? props.borderTopColor : props.borderColor ? props.borderColor : ''};
      transition: background-color 80ms ease-out, border-color 80ms ease-out;
    }
    .playground-btn:hover {
      background-color: ${props.hoverColor ? props.hoverColor : ''};
      border-color: ${props.hoverBorderColor
? props.hoverBorderColor
        : props.borderColor ? props.borderColor : ''};
      border-top-color: ${props.borderTopHoverColor ? props.borderTopHoverColor : props.hoverBorderColor ? props.hoverBorderColor : ''};
    }
  `;

	return (
		<>
			<button
				class={`playground-btn font-medium rounded-md
      bg-white dark:bg-neutral-800/50 dark:text-slate-100
      border border-neutral-200 dark:border-neutral-800
      shadow-sm hover:shadow pt-1 py-1.5 px-4
      dark:shadow-black/20
      active:translate-y-px capitalize ${props.selfFlex ? '' : 'self-start'}`}
				type={props.type ? props.type : 'button'}
			>
				{props.children}
			</button>
		</>
	);
};

export default PlaygroundBtn;
