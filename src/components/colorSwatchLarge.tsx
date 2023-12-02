import type { Component } from 'solid-js';
import { For, Show } from 'solid-js';
import { colors, colorsArr } from '../assets/color';
import ColorIdentifier from '../assets/components/colorIdentifier.styled';
import { focused, setFocused } from '../functions/keyHandler';
import { copy } from './shared/toast';

type ColorSwatchLargeProps<T = object> = Component<T & {
	swatch?: Record<string, Record<string, string>>
	swatchArr?: Array<Array<string>>
	trackIndex?: 'color' | 'id'
	disableText?: boolean
}>;

const ColorSwatchLarge: ColorSwatchLargeProps = (props) => {
	const watchingSwatch = () => props.swatch ? props.swatch : colors();
	const watchingSwatchArr = () => props.swatchArr ? props.swatchArr : colorsArr();

	return (
		<>
			<div class="flex flex-col w-full pb-6">
				<Show when={!props.disableText}>
					<h2 class="text-slate-600 dark:text-neutral-400">
						{props.trackIndex === 'color' ? 'Color Name' : 'Color ID'}
					</h2>
					<h2 class="font-display text-xl capitalize font-semibold text-slate-800 dark:text-slate-200">
						{props.trackIndex === 'color'
							? Object.keys(watchingSwatch())[focused()[1]]?.toLocaleLowerCase()
							?? setFocused([focused()[0], watchingSwatchArr().length - 1])
							: `0${Object.keys(Object.values(watchingSwatch()))[focused()[0]]}`}
					</h2>
				</Show>
				<div class="flex h-9 items-center w-full overflow-hidden">
					<For each={props.trackIndex === 'color'
						? Object.keys(Object.values(watchingSwatch())[0])
						: Object.keys(watchingSwatch())}
					>
						{(id, i) => (
							<div class={`${props.trackIndex === 'color' ? 'font-mono' : ''}
            w-full text-slate-600 dark:text-neutral-400 capitalize text-xs sm:text-sm`}
							>
								{props.trackIndex === 'color' ? id : Object.keys(watchingSwatch())[i()].toLocaleLowerCase()}
							</div>
						)}
					</For>
				</div>
				<div class="flex">
					<For each={props.trackIndex === 'color'
						? watchingSwatchArr()[focused()[1]]
						: watchingSwatchArr().map(val => val[focused()[0]])}
					>
						{(color, k) => (
							<ColorIdentifier
								color={color}
								tabindex={0}
								onClick={() => copy(color)}
								class={`h-12 flex flex-1 justify-center items-center font-mono font-medium outline-none
								${(focused()[0] === k() && props.trackIndex === 'color') || (focused()[1] === k() && props.trackIndex === 'id') ? 'focused' : ''}`}
							/>
						)}
					</For>
				</div>
			</div>
		</>
	);
};

export default ColorSwatchLarge;
