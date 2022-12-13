import { Component, createEffect, createSignal, For } from "solid-js";
import { BaseColorScale } from "../assets/color";
import { ColorIdentifier } from "../assets/components/colorIdentifier.styled";
import {calcAPCA, calcMinAPCA, calcWCAG} from "../functions/contrastCalc";
import { focused } from "../functions/keyHandler";

type IColorWatchLargeProps<T = {}> = Component<T &{
  trackIndex?: 'color' | 'id';
}>

const ColorSwatchLarge: IColorWatchLargeProps = (props) => {

  const colors = () => BaseColorScale;
  const focusedState = () => focused();

  return (
    <>
      <div class="prose">
        <h2>{props.trackIndex == 'color' ? Object.keys(colors())[focusedState()[1]] : Object.keys(Object.values(colors()))[focusedState()[0]]}</h2>
      </div>
      <div class="flex h-9 items-center">
        <For each={Object.keys(Object.values(colors())[0])}>{(id, i) =>
          <div class={`grow ${props.trackIndex == 'color' ? 'font-mono' : ''} text-slate-500 capitalize`}>
            {props.trackIndex == 'color' ? id : Object.keys(colors())[i()].toLocaleLowerCase()}
          </div>
        }</For>
      </div>
      <div class="flex">
        <For each={props.trackIndex == 'color' ? 
        Object.values(Object.values(colors())[focusedState()[1]]) : 
        Object.values(colors()).map((obj, j) => { return Object.values(obj)[focusedState()[0]] })}>{(color, k) =>
          <ColorIdentifier color={color}
                            tabindex="0"
                            class={`grow h-16 flex justify-center items-center font-mono font-medium outline-none 
                            ${(focusedState()[0] == k() && props.trackIndex == 'color') || 
                            (focusedState()[1] ==  k() && props.trackIndex == 'id') ? 
                            'focused' : ''}`}/>
        }</For>
      </div>
    </>
  )
}

export default ColorSwatchLarge
