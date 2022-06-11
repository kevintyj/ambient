import chroma from "chroma-js"

const LuminanceCalc = (color: string) => {
  return (chroma(color).luminance() * 100).toFixed(2) 
}

export const relativeLuminanceCalc = (aSwatch: { [p: string]: string }[]) => {
  const swatchKeys = aSwatch.map((obj) => Object.values(obj)[0]);
  // const swatchValues = aSwatch.map((obj) => Object.values(obj)[1]);

  const output: Record<string, string> = {};

  for(var val of swatchKeys) {
    output[val] = `${LuminanceCalc(val)}`;
  }

  return output;
}