import chroma from "chroma-js";
import { APCAcontrast, sRGBtoY } from "./apca";

const calcWCAG = (text: string, bg: string) => {
    return chroma.contrast(text, bg);
}

export const calcMaxWCAG = (swatch: Record<string, string>, bg:string) => {
    let maxContrast = 0;
    let maxContrastSwatch: string = '';
    let maxContrastHEX: string = '';

    Object.entries(swatch).forEach(([name, hex]) => {
      let currContrast = calcWCAG(hex, bg);
      if (currContrast > maxContrast) {
        maxContrast = currContrast;
        maxContrastSwatch = name;
        maxContrastHEX = hex;
      }
    })

    return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
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

    Object.entries(swatch).forEach(([name, hex]) => {
      let currContrast = Math.abs(calcAPCA(hex, bg));
      if (currContrast > maxContrast) {
        maxContrast = currContrast;
        maxContrastSwatch = name;
        maxContrastHEX = hex;
      }
    })

    return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
  }

  export const calcMaxAPCABG = (swatch: Record<string, string>, bg:string) => {
    let maxContrast = 0;
    let maxContrastSwatch: string = '';
    let maxContrastHEX: string = '';

    Object.entries(swatch).forEach(([name, hex]) => {
      let currContrast = Math.abs(calcAPCA(bg, hex));
      if (currContrast > maxContrast) {
        maxContrast = currContrast;
        maxContrastSwatch = name;
        maxContrastHEX = hex;
      }
    })

    return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
  }