import chroma from "chroma-js";
import { APCAcontrast, sRGBtoY } from "./apca";

const calcWCAG = (text: string, bg: string) => {
    return chroma.contrast(text, bg);
}

export const calcMaxWCAG = (swatch: { [p: string]: string; }[], bg:string) => {
    let maxContrast = 0;
    let maxContrastSwatch: string = '';
    let maxContrastHEX: string = ''

    swatch.forEach((obj: {[p: string]: string}) => {
      let currContrast = calcWCAG(Object.values(obj)[0], bg);
      if (currContrast > maxContrast) {
        maxContrast = currContrast;
        maxContrastSwatch = Object.keys(obj)[0];
        maxContrastHEX = Object.values(obj)[0];
      }
    })

    return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
  }

  const calcAPCA = (txt: string, bg: string) => {
    const textHex: number = parseInt(`0x${txt.substring(1)}`,16);
    const bgHex: number = parseInt(`0x${bg.substring(1)}`,16);

    return APCAcontrast(sRGBtoY(textHex), sRGBtoY(bgHex));
  }

  export const calcMaxAPCA = (swatch: { [p: string]: string }[], bg:string) => {
    let maxContrast = 0;
    let maxContrastSwatch: string = '';
    let maxContrastHEX: string = '';

    console.log(swatch)

    swatch.forEach((obj: {[p: string]: string}) => {
      let currContrast = Math.abs(calcAPCA(Object.values(obj)[0], bg));
      console.log(Object.values(obj)[0])
      console.log(bg)
      console.log(currContrast)
      if (currContrast > maxContrast) {
        maxContrast = currContrast;
        maxContrastSwatch = Object.keys(obj)[0];
        maxContrastHEX = Object.values(obj)[0];
      }
    })

    return [maxContrast.toFixed(2), maxContrastSwatch, maxContrastHEX];
  }