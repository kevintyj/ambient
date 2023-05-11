import {ParentComponent} from "solid-js";

type IButtonProps = ParentComponent< & {
  square?: boolean;
  aria: string;
  type?: "button" | "submit" | "reset" | undefined;
}>;

const Button: IButtonProps = (props) => {
  return (
    <button
    aria-label={props.aria}
    class="font-medium text-sm rounded-md pb-1.5
    bg-white dark:bg-neutral-800/50 dark:text-slate-100
    border border-neutral-200 dark:border-neutral-800
    border-7-neutral-300 dark:border-t-neutral-700/50
    shadow-sm py-1 px-3
    dark:shadow-black/50 hover:shadow
    active:border-neutral-300
    dark:active:border-neutral-700
    active:translate-y-px"
    classList={{'w-8 h-8 px-0': props.square}} type={props.type}>
      {props.children}
    </button>
  )
}

export default Button;
