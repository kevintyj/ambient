import {Component, createEffect, createSignal} from "solid-js";
import { BaseColorScale } from "../assets/color";

export const [focused, setFocused] = createSignal([5,2]);

const keyHandler: Component = () => {

  const colors = () => BaseColorScale;


  createEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
      }
      if("ArrowUp" == e.code && focused()[1] > 0) { 
        setFocused([focused()[0], focused()[1] - 1]);
      }
      if("ArrowDown" == e.code && focused()[1] < Object.keys(colors()).length - 1) { 
        setFocused([focused()[0], focused()[1] + 1]);
      }
      if("ArrowLeft" == e.code && focused()[0] > 0) { 
        setFocused([focused()[0] - 1, focused()[1]]);
      }
      if("ArrowRight" == e.code && focused()[0] < Object.keys(Object.values(colors())[0]).length - 1) { 
        setFocused([focused()[0] + 1, focused()[1]]);
      }
    })
  })
  return (<></>)
}

export default keyHandler;
