import chroma from "chroma-js"
import { onMount } from "solid-js";
import { darkMode } from "../components/shared/darkModeToggle"

export const BaseBackgroundArr = ['#18181A', '#FFFFFF'];

const BaseBackgroundDarkMixed = '#0a0a0a'; // chroma.mix(BaseBackgroundArr[0], '#000', 0.15, 'lab')

const ScalePrimObj = {
  "NEUTRAL": ['#F7F8F7', '#626262', '#1b1d1c'],
  "OCEAN": ['#E6F5FA', '#1893f6', '#081F46'],
  // "SKY": ['#E2F1FF', '#1B78E7', '#091847'],
  "BLUE": ['#E9EEFE', '#264FE3', '#061148'],
  "INDIGO": ['#EEECFA', '#4624D3', '#0a003d'],
  "VIOLET": ['#F0E9F8', '#6C1CDB', '#1c063d'],
  "CRIMSON": ["#FAEAF2", "#E03780", "#420518"],
  "WINE": ['#FDE9ED', '#9d1635', '#32000A'], 
  "RED": ['#FEEEEC', '#CA2331', '#380004'],
  "SUN": ['#FEF2EE', '#ea3e33', '#460405'],
  "ORANGE": ['#FDF6ED', '#fb7912', '#4e1b00'],
  "YELLOW": ['#FDFCF2', '#f8c51a', '#512D04'],
  "SAPLING": ['#FAFEEC', '#a2c940', '#2b3a06'],
  "GREEN": ['#EEFDF3', '#0da750', '#002f0f'],
  "AURORA": ['#EBFDF9', '#02B192', '#003228'],
  "CYAN": ['#EFFDFD', '#20C4D9', '#01313F']
}

// Generate dark scales using background colors
const generateDarkScales = (genScaleObj: Record<string, Array<string>>, darkScale: Array<string>) => {
  const out: Record<string, Array<string>> = {}
  // for (const prop in genScaleObj) {
  //   out[prop] = [
  //     chroma.mix(mixedDark, BaseBackgroundDarkMixed, 0, 'lab').hex(), 
  //     chroma.mix(genScaleObj[prop][0], genScaleObj[prop][1], 0.95, 'lab').hex(), 
  //     genScaleObj[prop][0]]
  // }
  return out
}

// Steps to elect using the color scales generator
const ColorTakeInd = [0, 1, 2, 3, 6, 8]


// Generate color scales from the primitive scale for one color
const generateScalePrim = (genPrim: Array<string>) => {
  return [...chroma.scale([genPrim[0], genPrim[1]]).mode('lch').colors(10).filter((val, i) => ColorTakeInd.includes(i)),
  ...chroma.scale([genPrim[1], genPrim[2]]).mode('lch').colors(7).filter((val, i) => i % 2 == 0)]
}

// Generate color scale object with name for one color
const generateScalePrimObject = (genScale: Array<string>) => {
  return genScale.reduce((memo, val, i) => ({...memo, [`0${i}`]: val}), {})
}

// Generate the entire object map for the color scale
const genColorScale = (genScaleObj: Record<string, Array<string>>) => {
  const out: Record<string, Record<string, string>> = {}
  for (const prop in genScaleObj) {
    out[prop] = generateScalePrimObject(generateScalePrim(genScaleObj[prop]))
  }
  return out
}

let genLightScale = genColorScale(ScalePrimObj)
let genDarkScale = genColorScale(generateDarkScales(ScalePrimObj, BaseBackgroundArr))

export const generatedColors = () => darkMode() ? genDarkScale : genLightScale
export const generatedColorsArr = () => darkMode() ? colorsToArr(genDarkScale) : colorsToArr(genLightScale)

export const colorsToArr = (colorObj : Record<string, Record<string, string>>) => {
  return Object.values(colorObj).map((obj) => {return Object.values(obj)})
}