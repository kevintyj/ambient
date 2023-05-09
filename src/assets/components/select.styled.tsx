import { JSX } from "solid-js/jsx-runtime";

const Select = (props : JSX.SelectHTMLAttributes<HTMLSelectElement & {value?: string}>) => {
  return (
    <select
      class="relative font-medium text-sm rounded-md pb-1.5 bg-white dark:bg-neutral-800/50 dark:text-slate-100 border border-neutral-200 dark:border-neutral-800 border-7-neutral-300 dark:border-t-neutral-700/50 shadow-sm py-1 px-3 dark:shadow-black/40 hover:shadow active:border-neutral-300 dark:active:border-neutral-700 active:translate-y-px" {...props}>
      {props.children}
    </select>
  )
}

export default Select;

