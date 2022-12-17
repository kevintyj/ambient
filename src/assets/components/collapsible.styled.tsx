import {createSignal, ParentComponent} from "solid-js";

type ICollapsibleProps = ParentComponent< & {
  title: string;
}>;

const Collapsible: ICollapsibleProps = (props) => {

  const [state, setState] = createSignal(false)

  const handleState = () => {
    setState(!state())
  }

  return (
    <div class="font-medium rounded-md
    bg-white dark:bg-neutral-800/50 dark:text-slate-100
    border border-neutral-200 dark:border-neutral-800
    border-7-neutral-300 dark:border-t-neutral-700/50
    shadow-sm dark:shadow-black/50 
    hover:shadow hover:border-neutral-300 dark:hover:border-neutral-700
    active:border-neutral-300
    dark:active:border-neutral-700
    flex flex-col transition-all">
      <button class="flex text-default sm:text-lg justify-between py-2.5 px-3 sm:px-5" onClick={handleState}>
        {props.title}
        <i class={`bi text-lg ${state() ? 'bi-chevron-down' : 'bi-chevron-up'}`}></i>
      </button>
      <div class={`h-auto overflow-hidden max-h-0 transition-all duration-[400ms] 
      ${state() ? 'max-h-[2000px]' : ''}`}>
        <div class="px-3 sm:px-5">
          <div class="border-t border-neutral-200 dark:border-neutral-700 pb-4"></div>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Collapsible;
