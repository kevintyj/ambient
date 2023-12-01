import type { Component } from 'solid-js';
import Divider from '../components/divider';

const IntroPlaygroundPage: Component = () => {
	return (
		<div class="flex flex-col w-full">
			<div class="flex flex-col w-full justify-center px-4 sm:px-6">
				<div class="flex flex-col w-full max-w-screen-2xl gap-y-1">
					<h6 class="font-semibold text-sm text-am-pink dark:text-am-pink-light">
						Components
					</h6>
					<h1 class="font-semibold font-display text-3xl text-slate-800 dark:text-slate-200">
						Introduction
					</h1>
					<p class="text-slate-600 dark:text-neutral-400">
						The Playground was created for users to quickly test and see how different colors may look in different UIUX applications.
					</p>
				</div>
				<Divider />
				<div class="flex flex-col w-full max-w-screen-2xl gap-y-2 pb-6">
					<div class="flex flex-col">
						<h3 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200">
							Changing Color Scales
						</h3>
					</div>
					<p class="text-slate-600 dark:text-neutral-400 pb-6">
						Some components supports the ability to change color schemes. To do this please select the desired color scheme from the top of the page.
					</p>
					<div class="flex flex-col">
						<h4 class="text-slate-600 dark:text-neutral-400">
							Shortcuts
						</h4>
						<h3 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200">
							Changing Dark/Light Modes
						</h3>
					</div>
					<p class="text-slate-600 dark:text-neutral-400 pb-6">
						Cmd + k or Ctrl + k can be used to quickly switch between Dark and Light Mode at any page in the application. There is also a helpful toggle on the top of the navigation page.
					</p>
					<div class="flex flex-col">
						<h4 class="text-slate-600 dark:text-neutral-400">
							Interactive components
						</h4>
						<h3 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200">
							Components with changing colors
						</h3>
					</div>
					<p class="text-slate-600 dark:text-neutral-400 pb-6">
						The Playground was created for users to quickly test and see how different colors may look in different UIUX applications.
					</p>
					<div class="flex flex-col">
						<h4 class="text-slate-600 dark:text-neutral-400">
							Components vs Pages
						</h4>
						<h3 class="font-semibold font-display text-xl text-slate-800 dark:text-slate-200">
							Playground Components
						</h3>
					</div>
					<p class="text-slate-600 dark:text-neutral-400 pb-6">
						Components define possible UIUX elements while Pages define the sample pages that are created through Ambient.
					</p>
				</div>
			</div>
		</div>
	);
};

export default IntroPlaygroundPage;
