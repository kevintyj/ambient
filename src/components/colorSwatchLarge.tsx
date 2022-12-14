import { Component, For } from "solid-js";
import { colors, colorsArr } from "../assets/color";
import { ColorIdentifier } from "../assets/components/colorIdentifier.styled";
import { focused } from "../functions/keyHandler";

type IColorWatchLargeProps<T = {}> = Component<T &{
  trackIndex?: 'color' | 'id';
}>

const ColorSwatchLarge: IColorWatchLargeProps = (props) => {

  const focusedState = () => focused();

  return (
    <>
      <div class="flex flex-col w-full pb-6">
        <h2 class="font-display text-xl capitalize font-semibold text-slate-800 dark:text-slate-200">
          {props.trackIndex == 'color' ? Object.keys(colors())[focusedState()[1]].toLocaleLowerCase() : Object.keys(Object.values(colors()))[focusedState()[0]]}
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
          colorsArr()[focusedState()[1]] : 
          colorsArr().map(val => val[focusedState()[0]])}>{(color, k) =>
            <ColorIdentifier color={color}
                              tabindex="0"
                              class={`h-12 flex flex-1 justify-center items-center font-mono font-medium outline-none 
                              ${(focusedState()[0] == k() && props.trackIndex == 'color') || 
                              (focusedState()[1] ==  k() && props.trackIndex == 'id') ? 
                              'focused' : ''}`}/>
          }</For>
        </div>
      </div>
    </>
  )
}

export default ColorSwatchLarge
