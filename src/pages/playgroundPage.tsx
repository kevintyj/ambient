import { Component } from "solid-js";
import PlaygroundBtn from "../components/playground/button/playgroundButton";
import PlaygroundButtons from "../components/playgroundButtons";
import ToggleColorScale, { currScaleText } from "../components/shared/toggleColorScale";

const PlaygroundPage: Component = () => {
  return (
    <>
      <div class='flex justify-center w-full px-6'>
        <div class='flex flex-col w-full max-w-screen-2xl gap-y-1 pb-6'>
          <h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200">
            Color Playground
          </h1>
          <p class='text-slate-600 dark:text-neutral-500 pb-6'>
            This area was created for users to see the effect of Color Scales on UIUX components. We have devised components to test your color scales to.
          </p>
          <h1 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200 pb-2">
            Color Swatch
          </h1>
          <div class="flex gap-x-2">
            <ToggleColorScale/>
          </div>
        </div>
      </div>
      <div class='flex justify-center w-full px-6'>
        <div class='flex flex-col gap-x-8 w-full max-w-screen-2xl'>
          <div class='flex flex-col pb-4'>
            <h4 class="text-slate-600 dark:text-neutral-500">
              Active Color Swatch
            </h4>
            <h3 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200 pb-2">
              {currScaleText()}
            </h3>
          </div>
          <div class="flex flex-col gap-8">
            <PlaygroundButtons baseColorPos={2}/>
            <PlaygroundButtons baseColorPos={5} border="top"/>
            <PlaygroundButtons baseColorPos={2} textColorful/>
            <PlaygroundButtons baseColorPos={5} border="top" textColorful/>
          </div>
        </div>
      </div> 
    </>
  )
}

export default PlaygroundPage