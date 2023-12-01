import { Route } from '@solidjs/router';
import type { Component } from 'solid-js';
import { lazy } from 'solid-js';
import TesterPage from './pages/testerPage';
import TextPlaygroundPage from './pages/textPlaygroundPage';
import LandingSamplePage from './pages/landingSamplePage';

const PlaygroundPage = lazy (() => import('../../pages/playgroundPage'));
const ButtonPlaygroundPage = lazy(() => import('./pages/buttonPlaygroundPage'));
const IntroPlaygroundPage = lazy(() => import('./pages/introPlaygroundPage'));
const DocumentationSamplePage = lazy (() => import('./pages/documentationSamplePage'));

const PlaygroundRoutes: Component = () => {
	return (
		<>
			<Route path="/playground" component={PlaygroundPage}>
				<Route path="/intro" component={IntroPlaygroundPage} />
				<Route path="/buttons" component={ButtonPlaygroundPage} />
				<Route path="/texts" component={TextPlaygroundPage} />

				<Route path="/documentation" component={DocumentationSamplePage} />
				<Route path="/landing" component={LandingSamplePage} />

				<Route path="/test" component={TesterPage} />
			</Route>
		</>
	);
};

export default PlaygroundRoutes;
