import chroma from "chroma-js";
import { Component, For } from "solid-js"
import { colorsArr } from "../assets/color";
import { colorsToArr } from "../functions/colorConfig";
import { focused } from "../functions/keyHandler";

type IDataPlotProps<T = {}> = Component<T &{
  swatchArr: Array<Array<string>>;
  plotArea: 1 | 0;
  plotType: 'l' | 'c' | 'h';
}>

const DataPlot: IDataPlotProps = (props) => {

  const watchingSwatch = () => props.swatchArr ? props.swatchArr : colorsArr();

  const colorsRemap = () => props.plotArea == 1 ? 
  watchingSwatch()[focused()[1]] : 
  watchingSwatch().map(val => val[focused()[0]]);

  const lchCalc = () => colorsRemap().map(hex => {
    const lch = chroma(hex).lch()
    return {l: lch[0], c: lch[1], h: (lch[2] / 3.6)}
  })

  return (
    <div class="flex flex-col grow">
      <h4 class="text-slate-800 dark:text-slate-200 pb-2">
        {props.plotType == 'l' ? 'Lightness' : props.plotType == 'c' ? 'Chroma' : 'Hue'}
      </h4>
      <div class="flex flex-row border border-b-0 border-neutral-200 dark:border-neutral-700">
        <For each={colorsRemap()}>{(swatch, i) =>
          <div class="h-2 w-full grow" style={`
          background-color: ${swatch};
          `}/>
        }</For>
      </div>
      <div class="flex grow justify-center h-[150px] bg-neutral-100 dark:bg-neutral-800 
      border border-neutral-200 dark:border-neutral-700 relative">
        <div class="w-full h-full relative mx-6 my-[35px]">
          <For each={colorsRemap()}>{(swatch, i) =>
              <div class="h-[20px] w-[20px] rounded-md absolute border 
              border-neutral-200 dark:border-neutral-700" style={`
              background-color: ${swatch};
              bottom: calc(${lchCalc()[i()][props.plotType] * 0.75}% + 40px);
              left: calc(${i() * (100 / (lchCalc().length - 1))}% - 10px);
              `}/>
            }</For>
        </div>
      </div>
    </div>
  )
}

export default DataPlot