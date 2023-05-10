import { Component, createEffect, For, onMount } from "solid-js";
import { colors, colorsArr } from "../assets/color";
import ColorIdentifier from "../assets/components/colorIdentifier.styled";
import { calcMinAPCA } from "../functions/contrastCalc";
import { focused } from "../functions/keyHandler";
import Toast, { copy } from "./shared/toast";

type IColorSwatchProps<T = {}> = Component<T &{
  swatch?: Record<string, Record<string, string>>;
}>

const ColorSwatch: IColorSwatchProps = (props) => {

  const watchingSwatch = () => props.swatch ? props.swatch : colors();

  const focusedState = () => focused();

  return (
    <>
      <div class="flex h-9 items-center w-full">
        <div class="w-24 hidden sm:block" />
        <For each={Object.keys(Object.values(watchingSwatch())[0])}>{(id, i) =>
          <div class="flex-grow text-sm sm:text-base font-mono text-slate-600 dark:text-neutral-400">
            {id}
          </div>
        }</For>
      </div>
      <For each={Object.entries(watchingSwatch())}>{([color, swatch], j) =>
        <div class="flex items-center">
          <div class="w-24 pr-4 flex-none justify-end text-slate-600 dark:text-neutral-400 capitalize hidden sm:block">
            {color.toLocaleLowerCase()}
          </div>
          <For each={Object.values(swatch)}>{(color, k) =>
            <ColorIdentifier color={color} textColor={calcMinAPCA(Object.values(swatch), color)[1].toString()}
                             tabindex={0}
                             class={`grow text-[10px] sm:text-xs h-10 flex flex-1 justify-center items-center font-mono font-medium outline-none 
                             ${focusedState()[0] == k() && focusedState()[1] == j() ? 'focused' : ''}`}
                             onClick={() => copy(color)}>
              {Math.abs(calcMinAPCA(Object.values(swatch), color)[0]) > 60 ?
                calcMinAPCA(Object.values(swatch), color)[0].toFixed() :
              ""}
            </ColorIdentifier>
          }</For>
        </div>
      }</For>
    </>
  )
}

export default ColorSwatch
