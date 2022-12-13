import chroma from "chroma-js"
import { APCAcontrast, sRGBtoY } from "./apca";

export const calcWCAG = (text: string, bg: string) => {
    return chroma.contrast(text, bg);
}

export const calcAPCA = (txt: string, bg: string) : number => {
  const textHex: number = parseInt(`0x${txt.substring(1)}`, 16);
  const bgHex: number = parseInt(`0x${bg.substring(1)}`, 16);

  return APCAcontrast(sRGBtoY(textHex), sRGBtoY(bgHex));
}

export const calcMinAPCA = (text: Array<string>, bg: string) : [number, string] => {
  for (const textColor of text) {
    if (calcAPCA(textColor, bg) > 40) return [calcAPCA(text[8], bg), text[8]]
    if (calcAPCA(textColor, bg) < -50) return [calcAPCA(text[2], bg), text[2]]
  }
  return [0, '#000']
}

