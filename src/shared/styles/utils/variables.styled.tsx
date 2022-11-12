import { createSignal } from "solid-js";
import {
  generatedColor, generatedColorLight,
  generatedColorMix, generatedColorMixLight,
  generatedColorMixShadeCorrected, generatedColorMixShadeCorrectedLight,
  generatedColorRelative, generatedColorRelativeLight
} from "../functions/functions.styled";

/**
 * This file contains all application-wide pallet variables
 */

/* Base Variables */
export const Base = {
  TEXT_FONT_STACK: `'Inter', 'Open Sans', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif`,
  //TEXT_FONT_STACK: `'IBM Plex Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Monaco', monospace`,
  CODE_FONT_STACK: `'IBM Plex Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Monaco', monospace`,
  MAX_WIDTH: 1180
}

/* Color System */
const WHITE: string = '#FFF';
const BLACK: string = '#000';

export const [textColorScale, setTextColorScale] = createSignal({
  WHITE: '#FFFFFF',
  BLACK: '#131313'
})

export const [colorScale, setColorScale] = createSignal({
  OCEAN: "#1893f6",

  // PRIMARY BLUE
  BLUE:"#2b50e2",

  INDIGO: "#4c0cc7",

  // SECONDARY VIOLET
  VIOLET: "#6d2fc2",

  CRIMSON: "#e14785",
  WINE: "#9d1635",

  // PRIMARY RED
  RED:"#C31F2E",

  SUN:"#EA3E33",

  // SECONDARY ORANGE
  ORANGE:"#FB7912",

  // PRIMARY YELLOW
  YELLOW:"#f8c51a",

  SAPLING:"#a2c940",

  //SECONDARY GREEN
  GREEN:"#0DA750",

  AURORA: "#3bcbab",
  CYAN: "#09c8de",
});

export const ColorLegacy = () => generatedColor(colorScale());

export const ColorRelative = () => generatedColorRelative(colorScale());

export const ColorMix = () => generatedColorMix(colorScale());

export const ColorShades = () => generatedColorMixShadeCorrected(colorScale());



export const ColorLegacyLight = () => generatedColorLight(colorScale());

export const ColorRelativeLight = () => generatedColorRelativeLight(colorScale());

export const ColorMixLight = () => generatedColorMixLight(colorScale());

export const ColorShadesLight = () => generatedColorMixShadeCorrectedLight(colorScale());



/* Grid System */

const GRID_COLUMNS: number = 12;

