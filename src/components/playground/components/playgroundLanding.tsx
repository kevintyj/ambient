import type { Component } from 'solid-js';
import { createEffect } from 'solid-js';
import { css } from 'solid-styled';
import { colorsToArr } from '../../../functions/colorConfig';
import { focused } from '../../../functions/keyHandler';
import { darkMode } from '../../shared/darkModeToggle';
import { visibleColorScale } from '../../shared/toggleColorScale';
import DefaultButton from './defaultButton';

const DEBUG = false;

const PlaygroundLanding: Component = () => {
	const watchingSwatch = () => colorsToArr(visibleColorScale());

	// eslint-disable-next-line unused-imports/no-unused-vars
	const swatchNames = () => Object.keys(visibleColorScale());
	const focusRow = () => focused()[1];

	const baseSwatch = () => watchingSwatch()[focusRow()];
	const baseNeutral = () => watchingSwatch()[0];

	const headerColor = () => baseNeutral()[9];
	const bodyColor = () => baseNeutral()[7];
	const boldColor = () => baseNeutral()[8];
	const hintColor = () => baseNeutral()[5];
	const linkColor = () => baseSwatch()[7];

	const codeBG = () => baseNeutral()[0];
	const codeBorder = () => baseNeutral()[1];
	const codeBorderTop = () => baseNeutral()[2];
	const codeColor = () => baseNeutral()[8];

	createEffect(() => {
		if (DEBUG)
			// eslint-disable-next-line no-console
			console.log('Page Effected');
		if (DEBUG)
			// eslint-disable-next-line no-console
			console.log(darkMode());
		if (DEBUG)
			// eslint-disable-next-line no-console
			console.log(watchingSwatch());
	});

	css`
    .link{
      color: ${linkColor()};
    }

    .link:hover{
      color: ${baseSwatch()[8]}
    }

    .link-border{
      border-color: ${linkColor()};
    }
    .border-color{
      border-color: ${codeBorder()};
    }
    .heading{
      color: ${headerColor()};
    }
    .heading-special{
      background: -webkit-linear-gradient(${baseSwatch()[6]}, ${baseSwatch()[5]});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .over{
      color: ${baseSwatch()[6]}
    }

    .icon{
      color: ${baseSwatch()[5]}
    }

    .neutral-01{
      fill: ${baseNeutral()[1]}
    }
    .neutral-02{
      fill: ${baseNeutral()[2]}
    }
    .neutral-03{
      fill: ${baseNeutral()[3]}
    }

    .color-01{
      fill: ${baseSwatch()[1]}
    }
    .color-02{
      fill: ${baseSwatch()[2]}
    }
    .color-03{
      fill: ${baseSwatch()[3]}
    }
    .color-04{
      fill: ${baseSwatch()[4]}
    }
    .color-05{
      fill: ${baseSwatch()[5]}
    }
    .color-06{
      fill: ${baseSwatch()[6]}
    }

    .bg-neutral-00{
      background: ${baseNeutral()[0]}
    }

    .bg-neutral-01{
      background: ${baseNeutral()[1]}
    }

    .paragraph{
      color: ${bodyColor()};
    }
    .bold{
      color: ${boldColor()};
      font-weight: 500;
    }
    .hint{
      color: ${hintColor()}
    }
    .code{
      background-color: ${codeBG()};
      border: 1px solid ${codeBorder()};
      border-top: 1px solid ${codeBorderTop()};
      color: ${codeColor()};
    }
  `;

	return (
		<>
			<div class="flex flex-col pb-3 overflow-hidden rounded -m-6 sm:-m-8">
				<div class="flex justify-between items-center px-16 h-16 border-b border-neutral-300 dark:border-neutral-700">
					<div class="flex gap-2">
						<div class="w-6">
							<svg viewBox="0 0 88 96" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M41.7835 3.21448C43.5002 0.126508 47.4331 -0.925881 50.4625 0.892138L60.0019 6.61697C65.437 9.87873 63.1244 18.2263 56.7857 18.2263H44.0638C39.2974 18.2263 36.2852 13.1053 38.601 8.93931L41.7835 3.21448Z" class="color-06" />
								<path d="M0 30.7266C0 27.2747 2.79829 24.4764 6.25015 24.4764H11.7339C16.5678 24.4764 19.572 29.729 17.1211 33.8955L11.6374 43.2179C8.40882 48.7064 0 46.4166 0 40.0489V30.7266Z" class="color-06" />
								<path d="M33.5285 36.6747C31.113 32.5658 25.1718 32.5641 22.754 36.6717L7.88563 61.9319C5.43317 66.0984 8.43723 71.3525 13.272 71.3525H42.9898C47.823 71.3525 50.8273 66.1015 48.3779 61.9349L33.5285 36.6747Z" class="color-06" />
								<path d="M87.5019 55.78C87.5019 49.4123 79.0931 47.1225 75.8646 52.6111L70.3808 61.9334C67.9299 66.0999 70.9341 71.3525 75.7681 71.3525H81.2518C84.7036 71.3525 87.5019 68.5542 87.5019 65.1023V55.78Z" class="color-06" />
								<path d="M44.5121 24.4764C39.6789 24.4764 36.6746 29.7275 39.124 33.894L53.9734 59.1542C56.3889 63.2632 62.3301 63.2648 64.7479 59.1572L79.6163 33.897C82.0687 29.7305 79.0647 24.4764 74.2299 24.4764H44.5121Z" class="color-06" />
								<path d="M30.2677 17.5443C33.9787 10.8645 26.4502 3.5828 19.8978 7.51428C13.4032 11.411 16.166 21.3854 23.7398 21.3854C26.4518 21.3854 28.9507 19.9151 30.2677 17.5443Z" class="color-06" />
								<path d="M27.5266 89.2132C22.0893 85.9528 24.4009 77.6027 30.7408 77.6027H43.4577C48.2211 77.6027 51.2337 82.7179 48.9238 86.8837L45.7506 92.6063C44.0365 95.6977 40.102 96.7536 37.0704 94.9358L27.5266 89.2132Z" class="color-06" />
								<path d="M63.7438 73.796C60.7932 73.796 58.0749 75.3967 56.6438 77.9771C52.6159 85.2395 60.7997 93.1493 67.9209 88.8766C74.9817 84.6401 71.9781 73.796 63.7438 73.796Z" class="color-06" />
							</svg>
						</div>
						<div class="font-[800] text-lg heading">Ambient</div>
					</div>
					<div>
						<DefaultButton type="default">
							Sign in
						</DefaultButton>
					</div>
				</div>
				<section class="flex items-center p-16 ">
					<div class="flex flex-col gap-4 w-9/12 max-w-xl">
						<h1 class="text-5xl heading font-bold">
							Let your imagination run
							{' '}
							<div class="heading-special inline">wild!</div>
						</h1>
						<h2 class="text-2xl paragraph">
							Contrast safe, tested, and beautiful colors!
							{' '}
							<br />
							Use Flex Colors to design your next website's color palette.
						</h2>
						<div class="flex flex-wrap py-2 gap-3">
							<DefaultButton type="primary">
								Get started
							</DefaultButton>
							<DefaultButton type="secondary">
								Why choose Flex?
							</DefaultButton>
						</div>
						<div class="hint">
							<i class="bi bi-arrow-90deg-down pr-2" />
							See what we are all about
						</div>
					</div>
					<div class="flex flex-col w-full items-end justify-center gap-2">
						<div class="hidden sm:block w-40 sm:w-52 md:w-64 xl:w-72">
							<svg viewBox="0 0 88 96" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M41.7835 3.21448C43.5002 0.126508 47.4331 -0.925881 50.4625 0.892138L60.0019 6.61697C65.437 9.87873 63.1244 18.2263 56.7857 18.2263H44.0638C39.2974 18.2263 36.2852 13.1053 38.601 8.93931L41.7835 3.21448Z" class="neutral-01" />
								<path d="M0 30.7266C0 27.2747 2.79829 24.4764 6.25015 24.4764H11.7339C16.5678 24.4764 19.572 29.729 17.1211 33.8955L11.6374 43.2179C8.40882 48.7064 0 46.4166 0 40.0489V30.7266Z" class="neutral-02" />
								<path d="M33.5285 36.6747C31.113 32.5658 25.1718 32.5641 22.754 36.6717L7.88563 61.9319C5.43317 66.0984 8.43723 71.3525 13.272 71.3525H42.9898C47.823 71.3525 50.8273 66.1015 48.3779 61.9349L33.5285 36.6747Z" class="color-06" />
								<path d="M87.5019 55.78C87.5019 49.4123 79.0931 47.1225 75.8646 52.6111L70.3808 61.9334C67.9299 66.0999 70.9341 71.3525 75.7681 71.3525H81.2518C84.7036 71.3525 87.5019 68.5542 87.5019 65.1023V55.78Z" class="color-01" />
								<path d="M44.5121 24.4764C39.6789 24.4764 36.6746 29.7275 39.124 33.894L53.9734 59.1542C56.3889 63.2632 62.3301 63.2648 64.7479 59.1572L79.6163 33.897C82.0687 29.7305 79.0647 24.4764 74.2299 24.4764H44.5121Z" class="color-05" />
								<path d="M30.2677 17.5443C33.9787 10.8645 26.4502 3.5828 19.8978 7.51428C13.4032 11.411 16.166 21.3854 23.7398 21.3854C26.4518 21.3854 28.9507 19.9151 30.2677 17.5443Z" class="neutral-03" />
								<path d="M27.5266 89.2132C22.0893 85.9528 24.4009 77.6027 30.7408 77.6027H43.4577C48.2211 77.6027 51.2337 82.7179 48.9238 86.8837L45.7506 92.6063C44.0365 95.6977 40.102 96.7536 37.0704 94.9358L27.5266 89.2132Z" class="color-02" />
								<path d="M63.7438 73.796C60.7932 73.796 58.0749 75.3967 56.6438 77.9771C52.6159 85.2395 60.7997 93.1493 67.9209 88.8766C74.9817 84.6401 71.9781 73.796 63.7438 73.796Z" class="color-03" />
							</svg>
						</div>
					</div>
				</section>
				<section class="flex flex-col p-16 py-12 bg-neutral-00">
					<p class="over">What sets us apart</p>
					<h2 class="text-4xl heading font-bold pb-2">
						Features
					</h2>
					<p class="paragraph pb-8">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut
						<b class="bold">aliquip ex ea commodo consequat.</b>
					</p>
					<div class="flex flex-row gap-8">
						<div class="bg-neutral-01 p-8 rounded-md">
							<i class="bi bi-cloud-sun-fill text-4xl icon" />
							<h3 class="text-xl heading font-bold pt-4">Lightweight</h3>
							<p class="hint pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							<a class="link font-semibold underline cursor-pointer">
								Read More
								<i class="bi bi-arrow-right" />
							</a>
						</div>
						<div class="bg-neutral-01 p-8 rounded-md">
							<i class="bi bi-bounding-box text-4xl icon" />
							<h3 class="text-xl heading font-bold pt-4">Composable</h3>
							<p class="hint pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							<a class="link font-semibold underline cursor-pointer">
								Read More
								<i class="bi bi-arrow-right" />
							</a>
						</div>
						<div class="bg-neutral-01 p-8 rounded-md">
							<i class="bi bi-lightning-fill text-4xl icon" />
							<h3 class="text-xl heading font-bold pt-4">Fast</h3>
							<p class="hint pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							<a class="link font-semibold underline cursor-pointer">
								Read More
								<i class="bi bi-arrow-right" />
							</a>
						</div>
					</div>
				</section>
				<section class="flex flex-col md:flex-row p-16 py-12 gap-12 items-center">
					<div class="flex flex-col">
						<h2 class="text-4xl heading font-bold pb-2">
							About our team
						</h2>
						<p class="paragraph pb-8">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco
							laboris nisi ut
							<b class="bold">aliquip ex ea commodo consequat.</b>
							Duis aute irure
							dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id
							est laborum.
						</p>
						<DefaultButton type="default">
							Read our blog post
							{' '}
							<i class="bi bi-arrow-right pl-1" />
						</DefaultButton>
					</div>
					<img
						class="flex rounded-md w-full md:w-2/5 h-auto object-cover"
						src="https://images.unsplash.com/photo-1546407341-a6b1cff53f9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4170&q=80"
					/>
				</section>
				<section>

				</section>
			</div>
		</>
	);
};

export default PlaygroundLanding;
