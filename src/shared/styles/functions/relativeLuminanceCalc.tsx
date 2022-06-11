import chroma from "chroma-js"

export type INormal = 'to-primary' | 'to-min-max' | 'none';

const LuminanceCalc = (color: string) => {
  return (chroma(color).luminance() * 100).toFixed(2) 
}

const normalize = (val: number, max: number, min: number) => { 
  return (val - min) / (max - min); 
}

const normalizeArr = (obj: Record<string, number>, norm: INormal | string) => {
  const output: Record<string, number> = {};

  const objVal = Object.values(obj);
  
  const objCenter = objVal[Math.floor(objVal.length/2)];
  const min = Math.min(...objVal);
  const max = Math.max(...objVal);

  const swatchEntries = Object.entries(obj);

  let iterator = 0;

  if (norm == 'to-primary') {
    for(var [val, key] of swatchEntries) {
      // console.log(iterator);
      if (iterator > Math.floor(objVal.length/2)) {
        // console.log(val)
        output[val] = Number(normalize(key, objCenter, min).toFixed(2)) * 0.5;
      } if (iterator == Math.floor(objVal.length/2)) {
        // console.log(val)
        output[val] = 0.50;
      } if (iterator < Math.floor(objVal.length/2)) {
        // console.log(val)
        output[val] = Number(normalize(key, max, objCenter).toFixed(2)) * 0.5 + 0.5;
      }
      iterator += 1;
    }
  } if (norm == 'to-min-max') {
    for(var [val, key] of swatchEntries) {
      output[val] = Number(normalize(key, max, min).toFixed(2));
    }
  } if (norm == 'none') {
    for(var [val, key] of swatchEntries) {
      output[val] = Number((key / 100).toFixed(2));
    }
  }

  return output;
}


export const relativeLuminanceCalc = (aSwatch: { [p: string]: string }[], normalize: INormal | string) => {
  const swatchKeys = aSwatch.map((obj) => Object.values(obj)[0]);
  // const swatchValues = aSwatch.map((obj) => Object.values(obj)[1]);

  const interNormalize: Record<string, number> = {};

  for(var val of swatchKeys) {
    interNormalize[val] = Number(LuminanceCalc(val));
  }


  return normalizeArr(interNormalize, normalize);
}