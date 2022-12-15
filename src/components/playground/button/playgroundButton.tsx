import {ParentComponent} from "solid-js";
import { css } from 'solid-styled';

type IButtonProps = ParentComponent< & {
  textColor?: string;
  color?: string;
  hoverColor?: string;
  border: 'top' | 'full';
  borderColor?: string;
  hoverBorderColor?: string;
}>;

const PlaygroundBtn: IButtonProps = (props) => {

  css`
    .playground-btn {
      color: ${props.textColor ? props.textColor : ''};
      background-color: ${props.color ? props.color : ''};
      border-color: ${props.borderColor ? props.borderColor : ''};
      border-width: ${props.border == 'top' ? '1px 0 0 0' : '1px'} !important;
      transition: background-color 100ms ease, border-color 100ms ease;
    }
    .playground-btn:hover {
      background-color: ${props.hoverColor ? props.hoverColor : ''};
      border-color: ${props.hoverBorderColor ? props.hoverBorderColor : 
      props.borderColor ? props.borderColor : ''};
    }
  `;

  return (
    <>
      <button class="playground-btn font-medium rounded-md
      bg-white dark:bg-neutral-800/50 dark:text-slate-100
      border border-neutral-200 dark:border-neutral-800
      shadow-sm hover:shadow pt-0.5 py-1 px-3
      dark:shadow-black/50
      active:translate-y-[2px] self-start capitalize">
        {props.children}
      </button>
    </>
  )
}

export default PlaygroundBtn;
