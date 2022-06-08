import {
  generatedColor,
  generatedColorMix,
  generatedColorMixShadeCorrected,
  generatedColorRelative
} from "../functions/functions.styled";

/**
 * This file contains all application-wide pallet variables
 */

/* Base Variables */
export const Base = {
  TEXT_FONT_STACK: `'Inter', 'Open Sans', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif`,
  //TEXT_FONT_STACK: `'IBM Plex Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Monaco', monospace`,
  CODE_FONT_STACK: `'Courier New', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Monaco', monospace`,
  MAX_WIDTH: 1180
}

/* Color System */

const WHITE: string = '#FFF';
const BLACK: string = '#000';

const COLOR_SCALE = {
  PRIMARY: '#0066FF',
  COMPLETE: '#3DAAAD',
  SUCCESS: '#1AA35E',
  WARNING: '#ffcf37',
  DANGER: '#F12B56',
  INFO: '#2B364C'
}


const generatedColorScales = generatedColor(COLOR_SCALE);

type colorScale = {
  [K in keyof typeof generatedColorScales]: string;
}

export const Color: Record<string, string> = {
  ...generatedColor(COLOR_SCALE)
}

export const ColorRelative: Record<string, string> = {
  ...generatedColorRelative(COLOR_SCALE)
}

export const ColorMix: Record<string, string> = {
  ...generatedColorMix(COLOR_SCALE)
}

export const ColorShades: Record<string, string> = {
  ...generatedColorMixShadeCorrected(COLOR_SCALE)
}

/* Grid System */

const GRID_COLUMNS: number = 12;

