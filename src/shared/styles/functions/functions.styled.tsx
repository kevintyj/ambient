import chroma from "chroma-js";
import { createSignal } from "solid-js";
import {method} from "lodash";

/* Outdated generation of color */
/*export const generatedColor = (scale: Record<string,string>) => {
  let output: Record<string, string> = {}
  for (const [key, value] of Object.entries(scale)) {
    for (let i = 1; i < 8; i++) {
      output[`${key}_${i}00`] = `${chroma(value).luminance(chroma(value).luminance() * 0.2)}`;
    }
  }
  return output as Record<string, string>;
};*/

export const [Legacy, SetLegacy] = createSignal([0.1, 0.7, 0.9, 1, 1.1, 1.2, 1.5]);
export const [Relative, SetRelative] = createSignal([0.6, 0.7, 0.9, 1, 1.1, 1.2, 1.3]);
export const [Shades, SetShades] = createSignal([1.85, 1.65, 1.1, 1, 0.9, 0.35, 0.18]);


export const [LegacyLight, SetLegacyLight] = createSignal([1.5, 1.2, 1.1, 1, 0.9, 0.7, 0.1]);
export const [RelativeLight, SetRelativeLight] = createSignal([1.3, 1.2, 1.1, 1, 0.9, 0.7, 0.6]);
export const [ShadesLight, SetShadesLight] = createSignal([0.18, 0.35, 0.9, 1, 1.1, 1.65, 1.85]);



export const arrSize = () => Legacy().length;

export function evalColor(scale: Record<string, string>, func: any, color1: number[], color2?: number[], color3?: number[]) {
  let output: Record<string, {}> = {}
  for (const [key, color] of Object.entries(scale)) {
    let colorScale: Record<string, string> = {};
    for (let i = 1; i <= arrSize(); i++) {
      // @ts-ignore
      if (color3 && color2){
        colorScale[`${i}00`] = `${func(color, color1[i - 1], color2[i - 1], color3[i - 1])}`;
      } else if (color2) {
        colorScale[`${i}00`] = `${func(color, color1[i - 1], color2[i - 1])}`;
      } else {
        colorScale[`${i}00`] = `${func(color, color1[i - 1])}`;
      }
    }
    output[`${key}`] = colorScale;
  }
  return output as Record<string, {}>;
}

/* Manual generation of color */
export const generatedColor = (scale: Record<string,string>) => {
  return evalColor(scale, generateColor, Legacy())
};

/* Automatic generation of color */
export const generatedColorRelative = (scale: Record<string,string>) => {
  return evalColor(scale, generateColorRelative, Relative())
};

/* Automatic generation of color */
export const generatedColorMix = (scale: Record<string,string>) => {
  return evalColor(scale, generateColorMix, Legacy(), Relative())
};

// Shade Corrected Output (Returns a mix of the mixed colors + adds luminance correction)
export const generatedColorMixShadeCorrected = (scale: Record<string, string>) => {
  return evalColor(scale, generateColorMixShade, Legacy(), Relative(), Shades())
}


/**
 * LIGHT MODE
 *
 * EXPERIMENTAL!
 */

/* Manual generation of color */
export const generatedColorLight = (scale: Record<string,string>) => {
  return evalColor(scale, generateColor, LegacyLight())
};

/* Automatic generation of color */
export const generatedColorRelativeLight = (scale: Record<string,string>) => {
  return evalColor(scale, generateColorRelative, RelativeLight())
};

/* Automatic generation of color */
export const generatedColorMixLight = (scale: Record<string,string>) => {
  return evalColor(scale, generateColorMix, Legacy(), RelativeLight())
};

// Shade Corrected Output (Returns a mix of the mixed colors + adds luminance correction)
export const generatedColorMixShadeCorrectedLight = (scale: Record<string, string>) => {
  return evalColor(scale, generateColorMixShade, LegacyLight(), RelativeLight(), ShadesLight())
}




export const generateColorScale = (color: string, step: number) => {
  if (step == arrSize()/2) {
    return color;
  }
}

/* Multiplies amount by the multiplier */
const HUE_MULTIPLIER = 1;
const SAT_MULTIPLIER = 1;

/* Number in scale from 0-1 */
const generateColor = (color: string, amount: number) => {
  if (amount > 1) {
    return chroma(color).brighten(Math.pow(amount, 2) - 1).hex();
  } if (amount < 1) {
    return chroma(color).darken(1 - Math.pow(amount, 2)).hex();
  } else {
    return chroma(color).hex();
  }
    //.luminance(chroma(color).luminance() - (1 - amount) * 0.3).hex();
}

const generateColorRelative = (color: string, amount: number) => {
  //console.log(`${color}: ${-Math.pow((amount -  1), 3) + 1}`)
  return chroma(color)
    //.set('hsv.h', `/${Math.sqrt(amount)}`)
    .set('hsv.s', `/${amount}`)
    //.set('hsv.v', `*${-Math.pow((amount -  1), 3) + 1}`).hex()
    .luminance(chroma(color).luminance() * amount).hex();
}

const generateColorMix = (color: string, amountL: number, amountR: number) => {
  return chroma.mix(generateColor(color, amountL), generateColorRelative(color, amountR), 0.55, 'hsv').hex();
}

const generateColorMixShade = (color: string, amountL: number, amountR: number, shade: number) => {
  if (shade > 1) {
    return chroma.mix(generateColorMix(color, amountL, amountR), 'black', (shade - 1), 'rgb').hex();
  } if (shade < 1) {
    return chroma.mix(generateColorMix(color, amountL, amountR), 'white', (1 - shade), 'rgb').hex();
  } else {
    return chroma(color).hex();
  }
}
