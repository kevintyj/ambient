import type { Accessor, Component, Setter } from 'solid-js';
import { createContext, createSignal, useContext } from 'solid-js';
import ColorSelectorComponent from '../components/colorSelectorComponent';
import {
	BaseBackgroundArr,
	ScalePrimObj,
	colorsToArr,
	genColorScale,
	generateDarkScales,
} from '../functions/colorConfig';
import { currScaleText, visibleColorScale } from '../components/shared/toggleColorScale';
import ColorSwatch from '../components/colorSwatch';
import ColorSwatchLarge from '../components/colorSwatchLarge';
import DataPlot from '../components/dataPlot';
import { darkMode } from '../components/shared/darkModeToggle';
import Button from '../assets/components/button.styled';

const ColorArrContext = createContext<ColorArrContextType>();

type ColorArrContextType = [Accessor<[string, string[]][]>, Setter<[string, string[]][]>];

const ColorGenerationPage: Component = () => {
	const [colors, setColors] = createSignal(Object.entries(ScalePrimObj));
	const colorObj: ColorArrContextType = [
		colors,
		setColors,
	];

	const [jsonFile, setJsonFile] = createSignal();

	const handleColorExport = (mode: 'obj' | 'arr') => {
		const darkText = darkMode() ? 'dark' : 'light';
		const fileName = `${currScaleText()}-${darkText}.json`;
		const obj = mode === 'obj' ? Object.fromEntries(colors()) : colors();
		const file = new Blob([JSON.stringify(obj, undefined, 2)], {
			type: 'application/json',
		});
		const link = document.createElement('a');
		link.download = fileName;
		link.href = URL.createObjectURL(file);
		link.click();
		link.remove();
	};

	const handleFileChange = (e: any) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0]);
		fileReader.onload = (e) => {
			// console.log(e.target?.result);
			// eslint-disable-next-line no-eval
			setJsonFile(eval(`(${e.target?.result as string})`));
			// console.log(eval(`(${jsonFile() as string})`))
			setColors(Object.entries(jsonFile() as object));
			// setColorScale(jsonFile() as any);
		};
	};

	const generatedColors = () => darkMode()
		? genColorScale(generateDarkScales(Object.fromEntries(colors()), BaseBackgroundArr), true)
		: genColorScale(Object.fromEntries(colors()), false);

	const generatedColorsArr = () => colorsToArr(generatedColors());

	return (
		<ColorArrContext.Provider value={colorObj}>
			<div class="flex justify-center w-full px-4 sm:px-6 pt-6 md:pt-8">
				<div class="flex flex-col w-full max-w-screen-2xl gap-y-1 pb-6">
					<h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200">
						Color Table
					</h1>
					<p class="text-slate-600 dark:text-neutral-400 pb-4">
						Ambient color generation algorithm utilizes: 1. the lightest color 2. most saturated color 3. darkest color to generate the full color palette. The dark scales are also automatically generated using a fixed background color variable.
					</p>
					<div class="flex gap-2 flex-wrap pb-4">
						<Button aria="Import Color Set" type="submit">
							<label class="cursor-pointer">
								Import Color Table (JSON)
								<input type="file" onChange={handleFileChange} class="hidden" />
							</label>
						</Button>
						<a onClick={() => handleColorExport('obj')}>
							<Button aria="Export Current Table as Object">
								Export Color Table
							</Button>
						</a>
						<a onClick={() => handleColorExport('arr')}>
							<Button aria="Export Current Table as Array">
								Export Color Table as Array
							</Button>
						</a>
					</div>

					<ColorSelectorComponent />
					<h1 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200">
						Color Swatch
					</h1>
					<p class="text-slate-600 dark:text-neutral-400 pb-2">
						This tool was designed with the Flex Design Colors in mind. This color set can be modified and also exported.
					</p>
				</div>
			</div>
			<div class="flex justify-center w-full px-4 sm:px-6">
				<div class="flex flex-row gap-x-8 flex-wrap 2xl:flex-nowrap w-full max-w-screen-2xl">
					<div class="flex flex-col basis-full 2xl:basis-1/2 pb-10">
						<h2 class="text-slate-600 dark:text-neutral-400">
							Active Color Swatch
						</h2>
						<h3 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200 pb-2">
							Customized Color Scale

							{/* {currScaleText()} */}
						</h3>
						<ColorSwatch swatch={generatedColors()} />
					</div>

					<div class="grow w-full basis-full 2xl:basis-1/2">
						<ColorSwatchLarge swatch={visibleColorScale()} swatchArr={generatedColorsArr()} trackIndex="color" />
						<div class="flex flex-row gap-x-4 pb-6 flex-wrap">
							<div class="grow basis-ful md:basis-0">
								<DataPlot swatchArr={generatedColorsArr()} plotArea={1} plotType="l" />
							</div>
							<div class="grow basis-full md:basis-0">
								<DataPlot swatchArr={generatedColorsArr()} plotArea={1} plotType="c" />
							</div>
							<div class="grow basis-full md:basis-0">
								<DataPlot swatchArr={generatedColorsArr()} plotArea={1} plotType="h" />
							</div>
						</div>
						<ColorSwatchLarge swatch={visibleColorScale()} swatchArr={generatedColorsArr()}trackIndex="id" />
						<div class="flex flex-row gap-x-4 pb-6 flex-wrap">
							<div class="grow basis-ful md:basis-0">
								<DataPlot swatchArr={generatedColorsArr()} plotArea={0} plotType="l" />
							</div>
							<div class="grow basis-full md:basis-0">
								<DataPlot swatchArr={generatedColorsArr()} plotArea={0} plotType="c" />
							</div>
							<div class="grow basis-full md:basis-0">
								<DataPlot swatchArr={generatedColorsArr()} plotArea={0} plotType="h" />
							</div>
						</div>
					</div>

				</div>
			</div>
		</ColorArrContext.Provider>
	);
};

export function useColorArrContext() {
	return useContext(ColorArrContext)!;
}

export default ColorGenerationPage;
