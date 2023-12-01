import type { Component } from 'solid-js';
import { colorsToArr } from '../../../functions/colorConfig';
import ColorSwatchLarge from '../../colorSwatchLarge';
import { visibleColorScale } from '../../shared/toggleColorScale';
import PlaygroundDocumentation from '../components/playgroundDocumentation';
import SandboxCard from '../components/sandboxCard';

const DocumentationSamplePage: Component = () => {
	return (
		<>
			<div class="flex flex-col justify-center px-4 sm:px-6">
				<div class="flex flex-col w-full max-w-screen-2xl gap-y-1 pb-6">
					<h6 class="font-semibold text-sm text-am-pink dark:text-am-pink-light">
						Pages
					</h6>
					<h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200">
						Documentation
					</h1>
				</div>

				<ColorSwatchLarge swatch={visibleColorScale()} swatchArr={colorsToArr(visibleColorScale())}trackIndex="id" disableText />

				<SandboxCard>
					<PlaygroundDocumentation />
				</SandboxCard>
			</div>
		</>
	);
};

export default DocumentationSamplePage;
