import {Component, createEffect, createSignal, onCleanup } from "solid-js";
import { colorsArr } from "../assets/color";
import { darkMode, setDarkMode } from "../components/shared/darkModeToggle";

export const [focused, setFocused] = createSignal([7,5]);

const KeyHandler: Component = () => {

  onCleanup(() => {
    document.removeEventListener('keydown', () => true);
  })

  createEffect(() => {
    document.removeEventListener('keydown', () => true);
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        setDarkMode(!darkMode());
      }
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
      }
      if("ArrowUp" == e.code && focused()[1] > 0) { 
        setFocused([focused()[0], focused()[1] - 1]);
      }
      if("ArrowDown" == e.code && focused()[1] < colorsArr().length -1) { 
        setFocused([focused()[0], focused()[1] + 1]);
      }
      if("ArrowLeft" == e.code && focused()[0] > 0) { 
        setFocused([focused()[0] - 1, focused()[1]]);
      }
      if("ArrowRight" == e.code && focused()[0] < colorsArr()[0].length - 1) { 
        setFocused([focused()[0] + 1, focused()[1]]);
      }
    })
  })
  return (<></>)
}

export default KeyHandler;
