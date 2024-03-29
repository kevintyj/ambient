import type { Component } from 'solid-js';
import { onMount } from 'solid-js';
import { Route, Routes } from '@solidjs/router';
import { Toaster } from 'solid-toast';
import NavBar from './components/layouts/navBar';
import ColorTablePage from './pages/colorTablePage';
import ComingSoonPage from './pages/comingSoonPage';
import Footer from './components/layouts/footer';
import PlaygroundRoutes from './components/playground/playgroundRoutes';
import KeyHandler from './functions/keyHandler';
import ColorGenerationPage from './pages/colorGenerationPage';

const App: Component = () => {
	onMount(() => {
		let ASCII = `
    █████   ███    ███ ██████  ██ ███████ ███    ██ ████████
    ██   ██ ████  ████ ██   ██ ██ ██      ████   ██    ██
    ███████ ██ ████ ██ ██████  ██ █████   ██ ██  ██    ██
    ██   ██ ██  ██  ██ ██   ██ ██ ██      ██  ██ ██    ██
    ██   ██ ██      ██ ██████  ██ ███████ ██   ████    ██
    `;

		ASCII += `\n    Using Ambient at work? Work with me on your next project!
    https://kevintyj.com
    `;
		// eslint-disable-next-line no-console
		console.log(`%c${ASCII}`, `font-family: monospace; color: #F13D52; `);
	});

	return (
		<>
			<KeyHandler />
			<Toaster
				position="bottom-right"
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					className: '',
					duration: 2000,
				}}
			/>
			<div class="flex flex-col z-50 min-h-screen justify-between bg-white dark:bg-[#181819]">
				<NavBar />
				<main role="main" class="my-auto lg:px-4">
					<div class="h-14">
					</div>
					<Routes>
						<Route path="/" component={ColorTablePage} />
						<Route path="/gen" component={ColorGenerationPage} />
						<PlaygroundRoutes />
						<Route path="/coming-soon" component={ComingSoonPage} />
						<Route path={'/*'} component={ComingSoonPage} />
					</Routes>
					<div class="h-20">
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default App;
