import chroma from "chroma-js";
import { createSignal } from "solid-js";

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

const Legacy: Array<number> = [1.7, 1.3, 1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.1];
const Relative: Array<number> = [1.3, 1.2, 1.15, 1.1, 1, 0.9, 0.85, 0.6, 0.5];
const Shades: Array<number> = [0.4, 0.6, 0.8, 0.9, 1, 1.1, 1.2, 1.4, 1.6];

export const [arrSize] = createSignal(Legacy.length);

/* Manual generation of color */
export const generatedColor = (scale: Record<string,string>) => {
  let output: Record<string, {}> = {}
  for (const [key, color] of Object.entries(scale)) {
    let colorScale: Record<string, string> = {};
    for (let i = 1; i <= arrSize(); i++) {
      colorScale[`${i}00`] = `${generateColor(color, Legacy[i - 1])}`;
    }
    output[`${key}`] = colorScale;
  }
  return output as Record<string, {}>;
};

/* Automatic generation of color */
export const generatedColorRelative = (scale: Record<string,string>) => {
  let output: Record<string, {}> = {}
  for (const [key, color] of Object.entries(scale)) {
    let colorScale: Record<string, string> = {};
    for (let i = 1; i <= arrSize(); i++) {
      colorScale[`${i}00`] = `${generateColorRelative(color, Relative[i - 1])}`;
    }
    output[`${key}`] = colorScale;
  }
  return output as Record<string, {}>;
};

/* Automatic generation of color */
export const generatedColorMix = (scale: Record<string,string>) => {
  let output: Record<string, {}> = {}
  for (const [key, color] of Object.entries(scale)) {
    let colorScale: Record<string, string> = {};
    for (let i = 1; i <= arrSize(); i++) {
      colorScale[`${i}00`] = `${generateColorMix(color, Legacy[i - 1], Relative[i - 1])}`;
    }
    output[`${key}`] = colorScale;
  }
  return output as Record<string, {}>;
};

export const generatedColorMixShadeCorrected = (scale: Record<string, string>) => {
  let output: Record<string, {}> = {}
  for (const [key, color] of Object.entries(scale)) {
    let colorScale: Record<string, string> = {};
    for (let i = 1; i <= arrSize(); i++) {
      colorScale[`${i}00`] = `${generateColorMixShade(color, Legacy[i - 1], Relative[i - 1], Shades[i -1])}`;
    }
    output[`${key}`] = colorScale;
  }
  return output as Record<string, {}>
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
  return chroma.mix(generateColor(color, amountL), generateColorRelative(color, amountR), 0.6, 'hsv').hex();
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