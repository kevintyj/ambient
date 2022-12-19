import { Component, For } from "solid-js";
import { BaseBackgroundArr, colorsToArr } from "../../../functions/colorConfig";
import { calcMaxAPCAText } from "../../../functions/contrastCalc";
import PlaygroundBtn from "../button/playgroundButton";
import { darkMode } from "../../shared/darkModeToggle";
import { visibleColorScale } from "../../shared/toggleColorScale";

type IButtonProps = Component< & {
  baseColorPos: number;
  textColorful?: boolean;
  border?: 'top' | 'full' | 'full-top';
  direction?: 1 | -1;
}>;

const PlaygroundButtons: IButtonProps = (props) => {

  const watchingSwatch = () => colorsToArr(visibleColorScale());
  const swatchNames = () => Object.keys(visibleColorScale());
  const direction = props.direction ? props.direction : -1 ;

  const textColor = () => "NEUTRAL" in visibleColorScale() ? 
  [visibleColorScale()["NEUTRAL"]["00"], visibleColorScale()["NEUTRAL"]["09"]] : ['red', 'red'];

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
        <PlaygroundBtn border={props.border ? props.border : 'full'}
        textColor={watchingSwatch()[0][9]}
        color={darkMode() ? watchingSwatch()[0][0] : BaseBackgroundArr[0]}
        hoverColor={darkMode() ? BaseBackgroundArr[1] : BaseBackgroundArr[0]}
        borderColor={watchingSwatch()[0][2]}
        hoverBorderColor={watchingSwatch()[0][1]}>
          Default
        </PlaygroundBtn>
        <For each={watchingSwatch()}>{(swatch, i) =>
            <PlaygroundBtn border={props.border ? props.border : 'full'} 
            textColor={calcTextColor(swatch)}
            color={swatch[props.baseColorPos]}
            hoverColor={swatch[props.baseColorPos + direction]}
            borderColor={swatch[props.baseColorPos + 1]}
            hoverBorderColor={swatch[props.baseColorPos + direction + 1]}>
              {swatchNames()[i()].toLocaleLowerCase()}
            </PlaygroundBtn>
          }</For>
      </div>
    </>
  )
}

export default PlaygroundButtons
