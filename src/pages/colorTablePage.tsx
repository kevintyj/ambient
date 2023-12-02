import type { Component } from 'solid-js';
import { createMemo } from 'solid-js';
import ColorSwatch from '../components/colorSwatch';
import ColorSwatchLarge from '../components/colorSwatchLarge';
import DataPlot from '../components/dataPlot';
import Button from '../assets/components/button.styled';
import { colorsToArr } from '../functions/colorConfig';
import ToggleColorScale, { currScaleText, visibleColorScale } from '../components/shared/toggleColorScale';
import { darkMode } from '../components/shared/darkModeToggle';

const ColorTablePage: Component = () => {
	const visibleColorScaleArr = createMemo(() => colorsToArr(visibleColorScale()));

	const ColorExportAsArr = () => {
		const out: Record<string, Array<string>> = {};
		Object.keys(visibleColorScale()).forEach((key, i) => {
			out[key.toLowerCase()] = visibleColorScaleArr()[i];
		});
		return out;
	};

	const ColorExportAsArrJS = () => {
		let out: string = '';
		Object.keys(visibleColorScale()).forEach((key, i) => {
			out += `const ${key.toLowerCase()} = [${visibleColorScaleArr()[i]}];\r\n`;
		});
		return out;
	};

	const ColorExportAsObjJS = () => {
		let out: string = '';
		const type: string = 'ColorScale<HexColor>';
		Object.keys(visibleColorScale()).forEach((key, i) => {
			let newobj: string = `export const ${key.toLowerCase()}: ${type} = {\r\n`;
			Object.keys(visibleColorScale()[key]).forEach((_, k) => {
				newobj += `   ${k}: '${visibleColorScaleArr()[i][k]}',\r\n`;
			});
			newobj += '}';
			out += `${newobj};\r\n\r\n`;
		});
		return out;
	};

	const ColorExportAsObj = () => {
		const out: Record<string, Record<string, string>> = {};
		Object.keys(visibleColorScale()).forEach((key, i) => {
			const colorOut: Record<string, string> = {};
			Object.keys(visibleColorScale()[key]).forEach((key, k) => {
				colorOut[k] = visibleColorScaleArr()[i][k];
			});
			out[key.toLowerCase()] = colorOut;
		});
		return out;
	};

	const handleColorExport = (mode: 'obj' | 'arr') => {
		const darkText = darkMode() ? 'dark' : 'light';
		const fileName = `${currScaleText()}-${darkText}.json`;
		const obj = mode === 'obj' ? ColorExportAsObj() : ColorExportAsArr();
		const file = new Blob([JSON.stringify(obj, undefined, 2)], {
			type: 'application/json',
		});
		const link = document.createElement('a');
		link.download = fileName;
		link.href = URL.createObjectURL(file);
		link.click();
		link.remove();
	};

	const handleJSExport = (mode: 'arrjs' | 'objjs') => {
		const darkText = darkMode() ? 'dark' : 'light';
		const fileName = `${currScaleText()}-${darkText}.js`;
		const str = mode === 'arrjs' ? ColorExportAsArrJS() : ColorExportAsObjJS();
		const file = new Blob([str], {
			type: 'application/javascript',
		});
		const link = document.createElement('a');
		link.download = fileName;
		link.href = URL.createObjectURL(file);
		link.click();
		link.remove();
	};

	return (
		<>
			<div class="flex justify-center w-full px-4 sm:px-6 pt-6 md:pt-8">
				<div class="flex flex-col w-full max-w-screen-2xl gap-y-1 pb-6">
					<h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200">
						Ambient Color Generation Tool
					</h1>
					<p class="text-slate-600 dark:text-neutral-400 pb-6">
						This tool is designed to generate contrast ready color pallets built specifically for UIUX design. Unlike other palette generation tools, Ambient generates the colors based on the primary color. Hues, saturation, and relative lightness adjustments are made automatically using our algorithm. These values can be adjusted by adjusting the base functions.styled.tsx file located inside the styles folder. As ambient relies on the primary color for alternative color generation, primary colors must be contrast compliant. Ambient displays both WACG and APCA definitions of text contrast, a 4.5:1(WACG) or 60Lc(APCA) is recommended for text contrast. Please remember that for the best results, contrast in colors or differences in color should not represent meaningful information in UIUX design to prevent accessability issues.
					</p>
					<h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200 pb-4">
						Color Table
					</h1>
					<h1 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200">
						Color Swatch
					</h1>
					<p class="text-slate-600 dark:text-neutral-400 pb-2">
						This tool was designed with the Flex Design Colors in mind. This color set can be modified and also exported.
					</p>
					<div class="flex gap-2 flex-wrap">
						<a href="/gen">
							<Button aria="Configure Colors">
								Configure Colors
							</Button>
						</a>
						<a href="/#">
							<Button aria="Import Color Set">
								Import Colorset
							</Button>
						</a>
						<Button
							aria="Export Current Colors as Object"
							onClick={() => handleColorExport('obj')}
						>
							Export Colorset
						</Button>
						<Button
							aria="Export Current Colors as Object"
							onClick={() => handleColorExport('arr')}
						>
							Export Colorset as Array
						</Button>
						<Button
							aria="Export Current Colors as Object"
							onClick={() => handleJSExport('arrjs')}
						>
							Export Colorset as Array (JS)
						</Button>
						<Button
							aria="Export Current Colors as Object"
							onClick={() => handleJSExport('objjs')}
						>
							Export Colorset as Object (JS)
						</Button>

						<ToggleColorScale />
					</div>
				</div>
			</div>
			<div class="flex justify-center w-full px-4 sm:px-6">
				<div class="flex flex-row gap-x-8 flex-wrap 2xl:flex-nowrap w-full max-w-screen-2xl">
					<div class="flex flex-col basis-full 2xl:basis-1/2 pb-10">
						<h2 class="text-slate-600 dark:text-neutral-400">
							Active Color Swatch
						</h2>
						<h3 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200 pb-2">
							{currScaleText()}
						</h3>
						<ColorSwatch swatch={visibleColorScale()} />
					</div>
					<div class="grow w-full basis-full 2xl:basis-1/2">
						<ColorSwatchLarge swatch={visibleColorScale()} swatchArr={visibleColorScaleArr()} trackIndex="color" />
						<div class="flex flex-row gap-x-4 pb-6 flex-wrap">
							<div class="grow basis-ful md:basis-0">
								<DataPlot swatchArr={visibleColorScaleArr()} plotArea={1} plotType="l" />
							</div>
							<div class="grow basis-full md:basis-0">
								<DataPlot swatchArr={visibleColorScaleArr()} plotArea={1} plotType="c" />
							</div>
							<div class="grow basis-full md:basis-0">
								<DataPlot swatchArr={visibleColorScaleArr()} plotArea={1} plotType="h" />
							</div>
						</div>
						<ColorSwatchLarge swatch={visibleColorScale()} swatchArr={visibleColorScaleArr()}trackIndex="id" />
						<div class="flex flex-row gap-x-4 pb-6 flex-wrap">
							<div class="grow basis-ful md:basis-0">
								<DataPlot swatchArr={visibleColorScaleArr()} plotArea={0} plotType="l" />
							</div>
							<div class="grow basis-full md:basis-0">
								<DataPlot swatchArr={visibleColorScaleArr()} plotArea={0} plotType="c" />
							</div>
							<div class="grow basis-full md:basis-0">
								<DataPlot swatchArr={visibleColorScaleArr()} plotArea={0} plotType="h" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ColorTablePage;
