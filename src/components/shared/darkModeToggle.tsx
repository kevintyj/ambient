import type { Component } from 'solid-js';
import { createEffect, createSignal, onMount } from 'solid-js';
import { colors } from '../../assets/color';
import Button from '../../assets/components/button.styled';
import { generatedColors } from '../../functions/colorConfig';
import { currScaleText, setColorScale } from './toggleColorScale';

export const [darkMode, setDarkMode] = createSignal(window.matchMedia('(prefers-color-scheme: dark)').matches);

const DEBUG = false;

const DarkModeToggle: Component = () => {
	onMount(() => {
		if (localStorage.getItem('theme'))
			setDarkMode(localStorage.getItem('theme') === 'dark');
	});

	createEffect(() => {
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (darkMode()) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		}
		else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
		if (DEBUG) {
			// eslint-disable-next-line no-console
			console.log(`Theme dark: ${darkMode()}`);
			// eslint-disable-next-line no-console
			console.log(`Local storage theme: ${localStorage.theme}`);
		}
		if (currScaleText() === 'Flex Design Colors Uniform')
			setColorScale(generatedColors());
		else
			setColorScale(colors());
	});

	const toggleDarkMode = () => {
		setDarkMode(!darkMode());
	};

	return (
		<Button aria="Dark-mode Toggle" onClick={() => toggleDarkMode()}>
			{darkMode() ? <i class="bi bi-lightbulb-fill"></i> : <i class="bi bi-moon-stars-fill"></i>}
		</Button>
	);
};

export default DarkModeToggle;
