import chroma, { hex } from "chroma-js"
import { darkMode } from "../components/shared/darkModeToggle"

export const BaseBackgroundArr = ['#FFFFFF', '#18181A'];

const BaseBackgroundDarkMixed = chroma.mix(BaseBackgroundArr[1], '#000', 0.2, 'rgb')

const ScalePrimObj = {
  "NEUTRAL": ['#EEEEEA', '#626262', '#181816'],
  "OCEAN": ['#E6F5FA', '#359AFA', '#081F46'],
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
  for (const prop in genScaleObj) {
    const primary = chroma.mix(genScaleObj[prop][0], genScaleObj[prop][1], (prop == "NEUTRAL" ? 0.8 : 0.95), 'lab')
    const mixedDark = chroma.mix(chroma(genScaleObj[prop][1]), BaseBackgroundDarkMixed, 0.5, 'rgb')
    const mixedLight = chroma.mix(primary, genScaleObj[prop][0], 0.7, 'lch')
    out[prop] = [
      chroma.mix(chroma(genScaleObj[prop][2]).darken(0.2), mixedDark, 0.1, 'lab')
        .saturate(prop == "NEUTRAL" ? 0.1 : 0.5).hex(), 
      primary.hex(), 
      prop == "NEUTRAL" ? chroma(mixedLight).brighten(0.75).hex() : chroma.mix(mixedLight, genScaleObj[prop][0], 0.6, 'lab').hex()]
  }
  return out
}

// Steps to elect using the color scales generator
const ColorTakeInd = [0, 1, 2, 3, 6, 8]


// Generate color scales from the primitive scale for one color
const generateScalePrim = (genPrim: Array<string>) => {
  return [...chroma.scale([genPrim[0], genPrim[1]]).mode('lab').colors(10).filter((val, i) => ColorTakeInd.includes(i)),
  ...chroma.scale([genPrim[1], genPrim[2]]).mode('lab').colors(7).filter((val, i) => i % 2 == 0)]
}

// Generate color scale object with name for one color
const generateScalePrimObject = (genScale: Array<string>) => {
  return genScale.reduce((memo, val, i) => ({...memo, [`0${i}`]: val}), {})
}

// Generate the entire object map for the color scale
const genColorScale = (genScaleObj: Record<string, Array<string>>, dark: boolean) => {
  const out: Record<string, Record<string, string>> = {}
  for (const prop in genScaleObj) {
    if (dark) out[prop] = generateScalePrimObject(redefineDarkScale(generateScalePrim(genScaleObj[prop])))
    else out[prop] = generateScalePrimObject(generateScalePrim(genScaleObj[prop]))
  }
  return out
}

const DarkenInd = [0.85, 0.6, 0.45, 0.4, 0.1, 0.1]

// Correct dark scales for background
const redefineDarkScale = (genScale: Array<string>) => {
  const out: Array<string> = genScale
  const BackgroundMixed = chroma(BaseBackgroundArr[1]).brighten(0.15)
  for (var c = 0; c < 6; c++){
    out[c] = chroma.mix(genScale[c], BackgroundMixed, DarkenInd[c], 'rgb').hex()
  }
  return out
}

let genLightScale = genColorScale(ScalePrimObj, false)
let genDarkScale = genColorScale(generateDarkScales(ScalePrimObj, BaseBackgroundArr), true)

export const generatedColors = () => darkMode() ? genDarkScale : genLightScale
export const generatedColorsArr = () => darkMode() ? colorsToArr(genDarkScale) : colorsToArr(genLightScale)

export const colorsToArr = (colorObj : Record<string, Record<string, string>>) => {
  return Object.values(colorObj).map((obj) => {return Object.values(obj)})
}