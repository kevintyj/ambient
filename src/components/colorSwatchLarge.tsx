import { Component, For } from "solid-js";
import { colors, colorsArr } from "../assets/color";
import { ColorIdentifier } from "../assets/components/colorIdentifier.styled";
import { focused } from "../functions/keyHandler";
import { copy } from "./shared/tost";

type IColorWatchLargeProps<T = {}> = Component<T &{
  trackIndex?: 'color' | 'id';
}>

const ColorSwatchLarge: IColorWatchLargeProps = (props) => {

  return (
    <>
      <div class="flex flex-col w-full pb-6">
        <h4 class="text-slate-600 dark:text-neutral-500">
          {props.trackIndex == 'color' ? 'Color Name' : 'Color ID'}
        </h4>
        <h2 class="font-display text-xl capitalize font-semibold text-slate-800 dark:text-slate-200">
          {props.trackIndex == 'color' ? 
          Object.keys(colors())[focused()[1]].toLocaleLowerCase() : 
          `0${Object.keys(Object.values(colors()))[focused()[0]]}`}
        </h2>
        <div class="flex h-9 items-center">
          <For each={props.trackIndex == 'color' ? 
          Object.keys(Object.values(colors())[0]) :
          Object.keys(colors())
        }>{(id, i) =>
            <div class={`${props.trackIndex == 'color' ? 'font-mono' : ''} w-full text-slate-600 dark:text-neutral-500 capitalize text-sm`}>
              {props.trackIndex == 'color' ? id : Object.keys(colors())[i()].toLocaleLowerCase()}
            </div>
          }</For>
        </div>
        <div class="flex">
          <For each={props.trackIndex == 'color' ? 
          colorsArr()[focused()[1]] : 
          colorsArr().map(val => val[focused()[0]])}>{(color, k) =>
            <ColorIdentifier color={color}
                              tabindex="0"
                              class={`h-12 flex flex-1 justify-center items-center font-mono font-medium outline-none 
                              ${(focused()[0] == k() && props.trackIndex == 'color') || 
                              (focused()[1] ==  k() && props.trackIndex == 'id') ? 
                              'focused' : ''}`}
                              onClick={() => copy(color)}/>
          }</For>
        </div>
      </div>
    </>
  )
}

export default ColorSwatchLarge
