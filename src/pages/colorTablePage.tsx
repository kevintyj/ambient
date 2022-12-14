import { Component } from "solid-js";
import ColorSwatch from "../components/colorSwatch";
import ColorSwatchLarge from "../components/colorSwatchLarge";
import LineChart from "../components/views/lineChart";
import KeyHandler from "../functions/keyHandler";

const ColorTablePage: Component = () => {
  return (
    <>
      <KeyHandler/>
      <div class='flex justify-center w-full px-6'>
        <div class='flex flex-row gap-x-8 flex-wrap 2xl:flex-nowrap w-full max-w-screen-2xl'>
          <div class='flex flex-col basis-full 2xl:basis-5/12'>
            <div class='flex flex-col gap-y-1 pb-6'>
              <h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200">
                Color Table
              </h1>
              <p class='text-slate-600 dark:text-neutral-500'>
                Color table of generated colors can be edited here. Only the primary color is considered.Color names must be unique.
              </p>
            </div>
            <h3 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200">
              Flex Design Colors
            </h3>
            <ColorSwatch/>
          </div>
          <div class='basis-full 2xl:basis-7/12'>
            <ColorSwatchLarge trackIndex='color'/>
            <div class="flex flex-col h-100">
              <div class="flex flex-col">
                <LineChart/>
              </div>
              <div class="flex flex-col">
                <LineChart/>
              </div>
            </div>
            <ColorSwatchLarge trackIndex='id'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ColorTablePage