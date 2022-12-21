import { colorsToArr } from "../../../functions/colorConfig";
import { calcMaxAPCAText } from "../../../functions/contrastCalc";
import { focused } from "../../../functions/keyHandler";
import { visibleColorScale } from "../../shared/toggleColorScale";

const watchingSwatch = () => colorsToArr(visibleColorScale());
const focusRow = () => focused()[1]

const baseSwatch = () => watchingSwatch()[focusRow()]
const baseNeutral = () => watchingSwatch()[0]

const textColor = () => "NEUTRAL" in visibleColorScale() ? 
[visibleColorScale()["NEUTRAL"]["00"], visibleColorScale()["NEUTRAL"]["09"]] : ['red', 'red'];

export const colorSwatch = (ind: number) => {
  return baseSwatch()[ind];
}

export const neutralSwatch = (ind: number) => {
  return baseNeutral()[ind];
}

export const calcTextColor = () => {
  const buttonBG = () => colorSwatch(5)
  return calcMaxAPCAText(buttonBG(), textColor()[0], textColor()[1])
}