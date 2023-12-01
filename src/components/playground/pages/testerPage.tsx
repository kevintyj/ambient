import type { Component } from 'solid-js';
import { createEffect } from 'solid-js';
import { css } from 'solid-styled';
import { colorsToArr } from '../../../functions/colorConfig';
import ToggleColorScale, { visibleColorScale } from '../../shared/toggleColorScale';

const TesterPage: Component = () => {
	// eslint-disable-next-line unused-imports/no-unused-vars
	const Array = () => visibleColorScale();
	const ColorArray = () => colorsToArr({});

	createEffect(() => {
		// eslint-disable-next-line no-console
		console.log(ColorArray()[5][2]);
	});

	css`
    .text-style{
      color: ${ColorArray()[5][2]};
    }
  `;

	return (
		<>
			<ToggleColorScale />
			<div class="text-2xl text-style">
				Testing Reactivity
			</div>
		</>
	);
};

export default TesterPage;
