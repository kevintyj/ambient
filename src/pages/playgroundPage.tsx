import { A, Outlet, useLocation } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Show, createSignal } from 'solid-js';
import { css } from 'solid-styled';
import Button from '../assets/components/button.styled';
import DocumentationMenuList from '../assets/components/documentationMenu.styled';
import Divider from '../components/playground/components/divider';

const PlaygroundPage: Component = () => {
	const [mobileMenu, setMobileMenu] = createSignal(false);

	const [menuList, _setMenuList] = createSignal({
		Components: '',
		Introduction: '/playground/intro',
		Buttons: '/playground/buttons',
		Texts: '/playground/texts',
		Pages: '',
		Documentation: '/playground/documentation',
		Landing: '/playground/landing',
	});

	const pathname = () => useLocation().pathname;
	const currInd = () => Object.entries(menuList()).findIndex(val => val[1] === pathname());
	const prevPath = () => Object.values(menuList())[currInd() - 1] ? Object.values(menuList())[currInd() - 1] : '';
	const nextPath = () => Object.values(menuList())[currInd() + 1] ? Object.values(menuList())[currInd() + 1] : '';

	css`
    .menuBG {
      display: flex;
    }
    .menuShown {
      transform: translateX(0) !important;
    }
  `;

	return (
		<>
			<div
				class="hidden h-screen w-screen fixed top-0 left-0
      backdrop-blur-sm z-[100] bg-neutral-50 dark:bg-[#181819]
      bg-opacity-60 dark:bg-opacity-70 cursor-pointer"
				classList={{ menuBG: mobileMenu() }}
				onClick={() => setMobileMenu(false)}
			>
				<div
					class="left-0 h-screen border-r p-4 py-3 sm:px-6 flex flex-col
         backdrop-blur-md bg-neutral-50 dark:bg-[#181819]
         border-neutral-200 dark:border-neutral-800
         w-64 shadow-xl"
					classList={{ menuShown: mobileMenu() }}
				>
					<a onClick={() => setMobileMenu(false)} class="my-2 mb-6">
						<Button aria="Open Mobile Menu">
							<i class="bi bi-list"></i>
						</Button>
					</a>
					<DocumentationMenuList list={menuList()} />
				</div>
			</div>
			<div class="flex justify-center lg:px-6">
				<div class="flex flex-row flex-auto overflow-x-hidden -mb-20 w-full max-w-screen-2xl">
					<div class="flex-none h-screen w-0 sm:w-4 md:w-8 lg:w-64 transition-all">
						<div class="border-b h-12 px-0 lg:px-10 flex fixed backdrop-blur-md backdrop-brightness-125
        bg-neutral-50 dark:bg-[#181819] border-b-neutral-200 dark:border-b-neutral-800
        bg-opacity-80 dark:bg-opacity-90 w-full z-50 md:hidden justify-start items-center"
						>
							<a
								onClick={() => setMobileMenu(true)}
								class="
            block pl-4 sm:pl-10
            z-50 md:z-[60] rounded-md
            drop-shadow-[0_0_4px_rgba(0,0,0,0.08)]"
							>
								<Button aria="Open Mobile Menu" square>
									<i class="bi bi-list -ml-1"></i>
								</Button>
							</a>
						</div>
						<div class="hidden sm:flex flex-col fixed w-64 overflow-x-visible lg:-mx-4
          backdrop-blur-md backdrop-brightness-125 lg:backdrop-blur-0 lg:backdrop-brightness-100 bg-opacity-80
          bg-neutral-50 dark:bg-[#181819] lg:bg-transparent dark:lg:bg-transparent
          border-r border-neutral-200 dark:border-neutral-800
          mb-20 z-50 justify-between transition-[transform]
          -translate-x-60 md:-translate-x-56 lg:translate-x-0 ease-in-out
          hover:translate-x-0 dark:hover:shadow-[0_35px_35px_rgba(0,0,0,0.4)]
          hover:shadow-[0_35px_35px_#00000032]
          h-[calc(100vh-56px)] hover:lg:shadow-none hover:lg:dark:shadow-none"
						>
							<a
								onClick={() => setMobileMenu(true)}
								class="
            hidden md:block lg:hidden absolute left-60 top-8
            bg-white dark:bg-neutral-900 z-50 md:z-[60] rounded-md
            drop-shadow-[0_0_8px_rgba(0,0,0,0.14)]"
							>
								<Button aria="Toggle Mobile Navigation List" square>
									<i class="bi bi-chevron-bar-right -ml-1"></i>
								</Button>
							</a>
							<div class="p-6 pl-4 sm:pl-6 lg:pl-4 pt-2">
								<DocumentationMenuList list={menuList()} />
							</div>
							<div class="h-28" />
						</div>
					</div>
					<div class="flex flex-col overflow-x-hidden pt-16 md:pt-8 lg:-mr-4 pb-12">
						<Outlet />
						<div class="flex flex-col justify-center px-4 sm:px-6 pt-12">
							<div class="flex flex-col w-full max-w-screen-2xl gap-y-1">
								<Divider />
								<div class="flex justify-between w-full text-slate-600 dark:text-neutral-400">
									<div>
										<Show when={prevPath() !== ''}>
											<A href={prevPath() ? prevPath() : '#'}>
												<i class="bi bi-arrow-left pr-2" />
												<a class="font-semibold font-display text-slate-700 dark:text-neutral-300">
													{Object.keys(menuList())[currInd() - 1]}
												</a>
											</A>
										</Show>
									</div>
									<Show when={nextPath() !== ''}>
										<A href={nextPath() ? nextPath() : '#'}>
											<a class="font-semibold font-display text-slate-700 dark:text-neutral-300">
												{Object.keys(menuList())[currInd() + 1]}
											</a>
											<i class="bi bi-arrow-right pl-2" />
										</A>
									</Show>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PlaygroundPage;
