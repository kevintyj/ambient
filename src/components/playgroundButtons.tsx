import { Component, For } from "solid-js";
import { colorsToArr } from "../functions/colorConfig";
import { calcMaxAPCAText } from "../functions/contrastCalc";
import PlaygroundBtn from "./playground/button/playgroundButton";
import { visibleColorScale } from "./shared/toggleColorScale";

type IButtonProps = Component< & {
  baseColorPos: number;
  textColorful?: boolean;
  border?: 'top' | 'full';
}>;

const PlaygroundButtons: IButtonProps = (props) => {

  const watchingSwatch = () => colorsToArr(visibleColorScale());
  const swatchNames = () => Object.keys(visibleColorScale());

  const textColor = () => "NEUTRAL" in visibleColorScale() ? 
  [visibleColorScale()["NEUTRAL"]["01"], visibleColorScale()["NEUTRAL"]["09"]] : ['red', 'red'];

  const calcTextColor = (swatch: Array<string>) => {
    const bg = swatch[props.baseColorPos];
    if (props.textColorful) {
      return calcMaxAPCAText(bg, swatch[swatch.length - 1], swatch[0])
    } else {
      return calcMaxAPCAText(bg, textColor()[0], textColor()[1])
    }
  }

  return (
    <>
      <div class="flex flex-row flex-wrap gap-4 justify-center">
        <For each={watchingSwatch()}>{(swatch, i) =>
            <PlaygroundBtn border={props.border ? props.border : 'full'} 
            textColor={calcTextColor(swatch)}
            color={swatch[props.baseColorPos]}
            hoverColor={swatch[props.baseColorPos - 1]}
            borderColor={swatch[props.baseColorPos + 1]}
            hoverBorderColor={swatch[props.baseColorPos]}>
              {swatchNames()[i()].toLocaleLowerCase()}
            </PlaygroundBtn>
          }</For>
      </div>
    </>
  )
}

export default PlaygroundButtons
