import type { Component } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';
import { BaseColorScaleDark, colors } from '../../assets/color';
import Select from '../../assets/components/select.styled';
import { generatedColors } from '../../functions/colorConfig';

export const [currScaleText, setCurrScaleText] = createSignal('Flex Design Colors Uniform');
export const [visibleColorScale, setColorScale] = createSignal(BaseColorScaleDark);

const ToggleColorScale: Component = () => {
	const [currScale, setCurrScale] = createSignal('fu');

	createEffect(() => {
		if (currScale() === 'fc')
			setColorScale(colors());
		if (currScale() === 'fu')
			setColorScale(generatedColors());
		else setColorScale(colors());
	});

	const handleColorScaleChange = (type: any) => {
		if (type.target.value === 'fc') {
			setCurrScale('fc');
			setCurrScaleText('Flex Design Colors (Legacy)');
		}
		else if (type.target.value === 'fu') {
			setCurrScale('fu');
			setCurrScaleText('Flex Design Colors Uniform');
		};
	};
	return (
		<Select aria-label="Change Color Pallet" value="fu" onChange={handleColorScaleChange}>
			<option value="fc">
				Flex Design Colors
			</option>
			<option value="fu" selected>
				Flex Design Colors Uniform
			</option>
		</Select>
	);
};

export default ToggleColorScale;
