import chroma from "chroma-js"
import { darkMode } from "../components/shared/darkModeToggle";
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
    if (calcAPCA(textColor, bg) > (darkMode() ? 30 : 40)) return [calcAPCA(darkMode() ? text[2] : text[8], bg), darkMode() ? text[2] : text[8]]
    if (calcAPCA(textColor, bg) < (darkMode() ? -60 : -50)) return [calcAPCA(darkMode() ? text[8] : text[2], bg), darkMode() ? text[8] : text[2]]
  }
  return [0, '#000']
}

export const calcMaxAPCAText = (bg: string, txtBright: string, txtDark: string) => {
  const brightAPCA = Math.abs(calcAPCA(txtBright, bg))
  const darkAPCA = Math.abs(calcAPCA(txtDark, bg))
  return brightAPCA > darkAPCA ? txtBright : txtDark
}