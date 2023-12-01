import type { Component } from 'solid-js';
import lightLogoUrl from '../../assets/images/ambient_logo_black_new.png';
import darkLogoUrl from '../../assets/images/ambient_logo_white_new.png';

const Footer: Component = () => {
	return (
		<footer
			role="contentinfo"
			class="relative bottom-0 border-t h-auto px-4 sm:px-6 lg:px-10 flex justify-center backdrop-blur-md backdrop-brightness-125
    bg-white dark:bg-[#181819] border-neutral-200 dark:border-neutral-800
    bg-opacity-80 dark:bg-opacity-90 w-full z-50"
		>
			<div class="flex flex-col items-center justify-center w-full max-w-screen-2xl py-8 md:py-10">
				<div class="-mt-1">
					<a href="/" class="block dark:hidden w-28 saturate-0 opacity-60"><img src={lightLogoUrl} alt="Ambient Logo" /></a>
					<a href="/" class="hidden dark:block w-28 saturate-0 opacity-60"><img src={darkLogoUrl} alt="Ambient Logo" /></a>
				</div>
				<p class="text-slate-600 dark:text-neutral-400 pt-2 text-sm">
					Built with
					{' '}
					<a class="font-semibold underline" href="http://solidjs.com/">Solidjs</a>
					,
					with the help of
					<a class="font-semibold underline" href="https://vis4.net/chromajs/">Chromajs</a>
					,
					<a class="font-semibold underline" href="https://felte.dev/">Felte</a>
					,
					<a class="font-semibold underline" href="https://icons.getbootstrap.com/">Bootstrap Icons</a>
					,
					and
					<a class="font-semibold underline" href="https://github.com/Myndex/SAPC-APCA">WCAG APCA</a>
				</p>
				<p class="text-slate-600 dark:text-neutral-400 text-sm">
					Check out the
					{' '}
					<a class="font-semibold underline" href="https://github.com/kevintyj/ambient">
						<i class="bi bi-github"></i>
						{' '}
						Source Code!
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
