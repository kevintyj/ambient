import { Component, createEffect, createSignal, For } from "solid-js";
import { BaseColorScale } from "../assets/color";
import { ColorIdentifier } from "../assets/components/colorIdentifier.styled";
import {calcAPCA, calcMinAPCA, calcWCAG} from "../functions/contrastCalc";
import { focused } from "../functions/keyHandler";

const ColorSwatch: Component = () => {

  const colors = () => BaseColorScale;
  const focusedState = () => focused();

  return (
    <>
      <div class="flex h-9 items-center w-full">
        <div class="w-24" />
        <For each={Object.keys(Object.values(colors())[0])}>{(id, i) =>
          <div class="flex-grow font-mono text-slate-500">
            {id}
          </div>
        }</For>
      </div>
      <For each={Object.entries(colors())}>{([color, swatch], j) =>
        <div class="flex items-center">
          <div class="w-24 pr-4 flex-none justify-end text-slate-500 capitalize">
            {color.toLocaleLowerCase()}
          </div>
          <For each={Object.entries(swatch)}>{([id, color], k) =>
            <ColorIdentifier color={color} textColor={calcMinAPCA(Object.values(swatch), color)[1].toString()}
                             tabindex="0"
                             class={`grow text-xs h-10 flex flex-1 justify-center items-center font-mono font-medium outline-none 
                             ${focusedState()[0] == k() && focusedState()[1] == j() ? 'focused' : ''}`}>
              {calcMinAPCA(Object.values(swatch), color)[0].toFixed()}
            </ColorIdentifier>
          }</For>
        </div>
      }</For>
    </>
  )
}

export default ColorSwatch
