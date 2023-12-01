import type { Component } from 'solid-js';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import { colorsArr } from '../assets/color';
import { darkMode, setDarkMode } from '../components/shared/darkModeToggle';

export const [focused, setFocused] = createSignal([7, 5]);

const KeyHandler: Component = () => {
	onCleanup(() => {
		document.removeEventListener('keydown', () => true);
	});

	createEffect(() => {
		document.removeEventListener('keydown', () => true);
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'k')
				setDarkMode(!darkMode());

			if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code))
				e.preventDefault();

			if (e.code === 'ArrowUp' && focused()[1] > 0)
				setFocused([focused()[0], focused()[1] - 1]);

			if (e.code === 'ArrowDown' && focused()[1] < colorsArr().length - 1)
				setFocused([focused()[0], focused()[1] + 1]);

			if (e.code === 'ArrowLeft' && focused()[0] > 0)
				setFocused([focused()[0] - 1, focused()[1]]);

			if (e.code === 'ArrowRight' && focused()[0] < colorsArr()[0].length - 1)
				setFocused([focused()[0] + 1, focused()[1]]);
		});
	});
	return (<></>);
};

export default KeyHandler;
