import { A, useLocation } from "@solidjs/router";
import { Component, createMemo, For, ParentComponent, Show } from "solid-js";

type IMenuItemProps = ParentComponent< & {
  link: string;
  selected?: boolean;
}>;

type IMenuListProps = Component< & {
  list: Record<string, string>;
  parentPath?: string;
  default?: string;
}>;

const MenuItem: IMenuItemProps = (props) => {
  return (
    <A href={props.link}
    class="pl-3 py-1"
    classList={{'-ml-px text-am-pink dark:text-am-pink-light font-semibold border-l-2 border-am-pink dark:border-am-pink-light': props.selected}}>
      {props.children}
    </A>
  )
}

const DocumentationMenuList: IMenuListProps = (props) => {

  const pathname = () => useLocation().pathname;

  return (
    <div class="flex flex-col">
      <For each={Object.entries(props.list)}>{([item, link]) =>
        <Show
          when={link && link != ""}
          fallback={<h3 class="font-semibold font-display text-slate-800 dark:text-slate-200 pb-3.5 pt-5">
            {item}
          </h3>}
        >
          <div class="h-7 border-l border-neutral-200 dark:border-neutral-800
          text-slate-500 dark:text-neutral-400 hover:text-slate-600 hover:dark:text-neutral-400
          transition-all">
            <MenuItem selected={link == pathname()} link={link}>
              {item}
            </MenuItem>
          </div>
        </Show>
      }</For>
    </div>
  )
}

export default DocumentationMenuList
