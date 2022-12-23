import { Component, createEffect, For, onMount, Show } from "solid-js";
import ColorIdentifier from "../assets/components/colorIdentifier.styled";
import { baseNeutral, baseSwatch } from "./playground/components/colorSwatch";
import HelperBadge from "./playground/components/helperBadge";
import { copy } from "./shared/tost";


type IColorSwatchHelperProps<T = {}> = Component<T &{
  track?: 'color' | 'neutral' | 'neutralbg';
  active?: Array<number | string>;
  activeHelper?: Array<string>
}>

const ColorSwatchHelper: IColorSwatchHelperProps = (props) => {

  let helperMod = props.activeHelper

  let counter = 0

  const modifiedShift = (arr: Array<string>) => {
    const out = helperMod ? helperMod[counter] : 'Err'
    counter += 1
    if (counter >= arr.length) {
      counter = 0
    }
    return out
  }

  return (
    <>
      <div class="flex flex-col w-full">
        <div class="flex">
          <For each={props.track == 'neutral' ? baseNeutral() : baseSwatch()}>{(color, k) =>
            <ColorIdentifier color={color}
                              class={`h-10 flex flex-1 justify-center items-center font-mono font-medium outline-none`}
                              onClick={() => copy(color)}>
              <Show when={props.active && props.active.includes(k())}>
                <div class="text-helper-primary bg-helper-dark bg-opacity-70 flex w-full h-full justify-center items-center
                group">
                  0{k()}
                  <div class="bottom-12 absolute hidden group-hover:block">
                    <HelperBadge active>
                      {props.activeHelper ? modifiedShift(helperMod ? helperMod : props.activeHelper) : `0${k()}`}
                    </HelperBadge>
                  </div>
                </div>
              </Show>
            </ColorIdentifier>
          }</For>
        </div>
      </div>
    </>
  )
}

export default ColorSwatchHelper
