import chroma from "chroma-js";

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

/* Manual generation of color */
export const generatedColor = (scale: Record<string,string>) => {
  let output: Record<string, string> = {}
  for (const [key, value] of Object.entries(scale)) {
    output[`${key}_100`] = generateColor(value, 1.3);
    output[`${key}_200`] = generateColor(value, 1.2);
    output[`${key}_300`] = generateColor(value, 1.1);
    output[`${key}_400`] = chroma(value).hex();
    output[`${key}_500`] = generateColor(value, 0.9);
    output[`${key}_600`] = generateColor(value, 0.8);
    output[`${key}_700`] = generateColor(value, 0.7);
  }
  return output as Record<string, string>;
};

/* Manual generation of color */
export const generatedColorRelative = (scale: Record<string,string>) => {
  let output: Record<string, string> = {}
  for (const [key, value] of Object.entries(scale)) {
    output[`${key}_100`] = generateColorRelative(value, 1.3);
    output[`${key}_200`] = generateColorRelative(value, 1.2);
    output[`${key}_300`] = generateColorRelative(value, 1.1);
    output[`${key}_400`] = chroma(value).hex();
    output[`${key}_500`] = generateColorRelative(value, 0.9);
    output[`${key}_600`] = generateColorRelative(value, 0.8);
    output[`${key}_700`] = generateColorRelative(value, 0.7);
  }
  return output as Record<string, string>;
};

export const generateColorScale = (color: string, step: number) => {
  if (step == 3) {
    return color;
  }
}

/* Multiplies amount by the multiplier */
const HUE_MULTIPLIER = 1;
const SAT_MULTIPLIER = 1;

/* Number in scale from 0-1 */
const generateColor = (color: string, amount: number) => {
  return chroma(color)
    .set('hsv.h', `*${HUE_MULTIPLIER}`)
    .set('hsv.s', `*${SAT_MULTIPLIER}`)
    .luminance(chroma(color).luminance() - (1 - amount) * 0.1 ).hex();
}

const generateColorRelative = (color: string, amount: number) => {
  return chroma(color)
    .set('hsv.h', `*${HUE_MULTIPLIER}`)
    .set('hsv.s', `*${SAT_MULTIPLIER}`)
    .luminance(chroma(color).luminance() * amount).hex();
}