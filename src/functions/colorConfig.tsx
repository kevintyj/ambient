import chroma from 'chroma-js';
import { darkMode } from '../components/shared/darkModeToggle';

export const BaseBackgroundArr: Array<string> = ['#FFFFFF', '#181819'];

const BaseBackgroundDarkMixed = chroma.mix(BaseBackgroundArr[1], '#000', 0.2, 'rgb');

export const ScalePrimObj = {
	NEUTRAL: ['#F8F8F6', '#626262', '#181816'],
	OCEAN: ['#E6F5FA', '#359AFA', '#081F46'],
	// "SKY": ['#E2F1FF', '#1B78E7', '#091847'],
	BLUE: ['#E9EEFE', '#264FE3', '#061148'],
	INDIGO: ['#EBEDFB', '#4624D3', '#0B003D'],
	VIOLET: ['#F0E9F8', '#6C1CDB', '#1c063d'],
	PINK: ['#FAEAF2', '#E03780', '#420518'],
	CRIMSON: ['#FCECEF', '#d22952', '#3D0314'],
	WINE: ['#FDE9ED', '#b91d42', '#32000A'],
	RED: ['#FEEEEC', '#CA2331', '#380004'],
	SUN: ['#FEF2EE', '#ea3e33', '#460405'],
	ORANGE: ['#FDF6ED', '#fb7912', '#52160B'],
	AMBER: ['#fdfaf2', '#fdad18', '#542210'],
	YELLOW: ['#FDFCF2', '#f8c51a', '#58280F'],
	SAPLING: ['#FAFEEC', '#a2c940', '#2b3a06'],
	GREEN: ['#EEFDF3', '#0da750', '#002f0f'],
	AURORA: ['#EBFDF9', '#02B192', '#003228'],
	CYAN: ['#EFFDFD', '#20C4D9', '#01313F'],
};

// Generate dark scales using background colors
export const generateDarkScales = (genScaleObj: Record<string, Array<string>>, _darkScale: Array<string>) => {
	const out: Record<string, Array<string>> = {};
	for (const prop in genScaleObj) {
		const primary = chroma.mix(genScaleObj[prop][0], genScaleObj[prop][1], (prop === 'NEUTRAL' ? 0.8 : 0.95), 'lab');
		const mixedDark = chroma.mix(chroma(genScaleObj[prop][1]), BaseBackgroundDarkMixed, 0.8, 'rgb');
		const mixedLight = chroma.mix(primary, genScaleObj[prop][0], 0.7, 'lch');
		out[prop] = [
			prop === 'NEUTRAL'
				? chroma(genScaleObj[prop][2]).brighten(0.3).hex()
				: chroma.mix(chroma(genScaleObj[prop][2]).darken(0.44), mixedDark, 0.15, 'lab').saturate(0.7).hex(),
			chroma.mix(primary.hex(), mixedLight.hex(), 0.03).hex(),
			prop === 'NEUTRAL'
				? chroma(mixedLight).brighten(0.75).hex()
				: chroma.mix(mixedLight, genScaleObj[prop][0], 0.86, 'lab').hex(),
		];
	}
	return out;
};

// Steps to elect using the color scales generator
const ColorTakeInd = [0, 2, 5, 9, 16, 19];

// Generate color scales from the primitive scale for one color
const generateScalePrim = (genPrim: Array<string>) => {
	return [...chroma.scale([genPrim[0], genPrim[1]]).mode('lab').colors(24).filter((val, i) => ColorTakeInd.includes(i)), ...chroma.scale([genPrim[1], genPrim[2]]).mode('lab').colors(7).filter((val, i) => i % 2 === 0)];
};

// Generate color scale object with name for one color
const generateScalePrimObject = (genScale: Array<string>) => {
	return genScale.reduce((memo, val, i) => ({ ...memo, [`0${i}`]: val }), {});
};

const DarkenInd = [0.87, 0.7, 0.5, 0.4, 0.1, 0];

// Correct dark scales for background
const redefineDarkScale = (genScale: Array<string>) => {
	const out: Array<string> = genScale;
	const BackgroundMixed = chroma(BaseBackgroundArr[1]).brighten(0.05);
	for (let c = 0; c < 6; c++)
		out[c] = chroma.mix(genScale[c], BackgroundMixed, DarkenInd[c], 'rgb').hex();

	return out;
};

// Generate the entire object map for the color scale
export const genColorScale = (genScaleObj: Record<string, Array<string>>, dark: boolean) => {
	const out: Record<string, Record<string, string>> = {};
	for (const prop in genScaleObj) {
		if (dark)
			out[prop] = generateScalePrimObject(redefineDarkScale(generateScalePrim(genScaleObj[prop])));
		else out[prop] = generateScalePrimObject(generateScalePrim(genScaleObj[prop]));
	}
	return out;
};

const genLightScale = genColorScale(ScalePrimObj, false);
const genDarkScale = genColorScale(generateDarkScales(ScalePrimObj, BaseBackgroundArr), true);

export const generatedColors = () => darkMode() ? genDarkScale : genLightScale;

export const colorsToArr = (colorObj: Record<string, Record<string, string>>) => {
	return Object.values(colorObj).map((obj) => {
		return Object.values(obj);
	});
};
export const generatedColorsArr = () => darkMode() ? colorsToArr(genDarkScale) : colorsToArr(genLightScale);
