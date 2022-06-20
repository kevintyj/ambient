import chroma from "chroma-js";
import { contrastCalcType } from "../../../components/colorListComponent";
import { APCAcontrast, sRGBtoY } from "./apca";

const calcWCAG = (text: string, bg: string) => {
    return chroma.contrast(text, bg);
}

export const calcMaxWCAG = (swatch: Record<string, string>, bg:string) => {
  let maxContrast = 0;
  let maxContrastSwatch: string = '';
  let maxContrastHEX: string = '';

  for(const [name, hex] of Object.entries(swatch)) {
    let currContrast = calcWCAG(hex, bg);

    if (currContrast < maxContrast) {
      if (maxContrast > 4.5 && contrastCalcType() == 1) {
        return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
      }
    }
    else {
      maxContrast = currContrast;
      maxContrastSwatch = name;
      maxContrastHEX = hex;

      if (maxContrast > 4.5 && contrastCalcType() == 1) {
        return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
      }
    }
  }

  if (maxContrast > 4.5) {
    return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
  }
  return ['NA', 'NA', maxContrastHEX];
}

const calcAPCA = (txt: string, bg: string) => {
  const textHex: number = parseInt(`0x${txt.substring(1)}`, 16);
  const bgHex: number = parseInt(`0x${bg.substring(1)}`, 16);

  return APCAcontrast(sRGBtoY(textHex), sRGBtoY(bgHex));
}

export const calcMaxAPCA = (swatch: Record<string, string>, bg:string) => {
  let maxContrast = 0;
  let maxContrastSwatch: string = '';
  let maxContrastHEX: string = '';

  for (const [name, hex] of Object.entries(swatch)) {
    let currContrast = Math.abs(calcAPCA(hex, bg));

    if (currContrast < maxContrast) {
      if (maxContrast > 60 && contrastCalcType() == 1) {
        return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
      }
    }
    else {
      maxContrast = currContrast;
      maxContrastSwatch = name;
      maxContrastHEX = hex;
      if (maxContrast > 60 && contrastCalcType() == 1) {
        return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
      }
    }
  }

  if (maxContrast > 60) {
    return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
  }
  return ['NA', 'NA', maxContrastHEX];
}

export const calcMaxAPCABG = (swatch: Record<string, string>, bg:string) => {
  let maxContrast = 0;
  let maxContrastSwatch: string = '';
  let maxContrastHEX: string = '';

  for (const [name, hex] of Object.entries(swatch)) {
    let currContrast = Math.abs(calcAPCA(bg, hex));
    if (currContrast > maxContrast) {
      maxContrast = currContrast;
      maxContrastSwatch = name;
      maxContrastHEX = hex;
      if (maxContrast > 60 && contrastCalcType() == 1) {
        return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
      }
    }
  }
  
  if (maxContrast > 60) {
    return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
  }
  return ['NA', 'NA', maxContrastHEX];
}