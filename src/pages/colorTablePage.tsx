import { Component, createEffect, createSignal } from "solid-js";
import ColorSwatch from "../components/colorSwatch";
import ColorSwatchLarge from "../components/colorSwatchLarge";
import DataPlot from "../components/dataPlot";
import Button from "../assets/components/button.styled";
import KeyHandler from "../functions/keyHandler";
import Select from "../assets/components/select.styled";
import { colorsToArr } from "../functions/colorConfig";
import ToggleColorScale, { currScaleText, visibleColorScale } from "../components/shared/toggleColorScale";

const ColorTablePage: Component = () => {

  const visibleColorScaleArr = () => colorsToArr(visibleColorScale())

  return (
    <>
      <KeyHandler/>
      <div class='flex justify-center w-full px-6'>
        <div class='flex flex-col w-full max-w-screen-2xl gap-y-1 pb-6'>
          <h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200">
            Ambient Color Generation Tool
          </h1>
          <p class='text-slate-600 dark:text-neutral-500 pb-6'>
          This tool is designed to generate contrast ready color pallets built specifically for UIUX design. Unlike other pallette generation tools, Ambient generates the colors based on the primary color. Hues, saturation, and relative lightness adjustments are made automatically using our algorithm. These values can be adjusted by adjusting the base functions.styled.tsx file located inside the styles folder. As ambient relies on the primary color for alternative color generation, primary colors must be contrast compliant. Ambient displays both WACG and APCA definitions of text contrast, a 4.5:1(WACG) or 60Lc(APCA) is recommended for text contrast. Please remember that for the best results, contrast in colors or differences in color should not represent meaningful information in UIUX design to prevent accessability issues.
          </p>
          <h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200 pb-4">
            Color Table
          </h1>
          <h1 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200">
            Color Swatch
          </h1>
          <p class='text-slate-600 dark:text-neutral-500 pb-2'>
          This tool was designed with the Flex Design Colors in mind. This color set can be modified and also exported. 
          </p>
          <div class="flex gap-x-2">
            <a href="/coming-soon">
              <Button>
                Configure Colors
              </Button>
            </a>
            <a href="/#">
              <Button>
                Import Colorset
              </Button>
            </a>
            <ToggleColorScale/>
          </div>
        </div>
      </div>
      <div class='flex justify-center w-full px-6'>
        <div class='flex flex-row gap-x-8 flex-wrap 2xl:flex-nowrap w-full max-w-screen-2xl'>
          <div class='flex flex-col basis-full 2xl:basis-1/2 pb-10'>
            <h4 class="text-slate-600 dark:text-neutral-500">
              Active Color Swatch
            </h4>
            <h3 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200 pb-2">
              {currScaleText()}
            </h3>
            <ColorSwatch swatch={visibleColorScale()}/>
          </div>
          <div class='basis-full 2xl:basis-1/2'>
            <ColorSwatchLarge swatch={visibleColorScale()} swatchArr={visibleColorScaleArr()} trackIndex='color'/>
            <div class="flex flex-row gap-x-4 pb-6">
              <DataPlot swatchArr={visibleColorScaleArr()} plotArea={1} plotType={"l"}/>
              <DataPlot swatchArr={visibleColorScaleArr()} plotArea={1} plotType={"c"}/>
              <DataPlot swatchArr={visibleColorScaleArr()} plotArea={1} plotType={"h"}/>
            </div>
            <ColorSwatchLarge swatch={visibleColorScale()} swatchArr={visibleColorScaleArr()}trackIndex='id'/>
            <div class="flex flex-row gap-x-4">
              <DataPlot swatchArr={visibleColorScaleArr()} plotArea={0} plotType={"l"}/>
              <DataPlot swatchArr={visibleColorScaleArr()} plotArea={0} plotType={"c"}/>
              <DataPlot swatchArr={visibleColorScaleArr()} plotArea={0} plotType={"h"}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ColorTablePage
