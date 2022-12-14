import {Component } from "solid-js";
import lightLogoUrl from "../../assets/images/ambient_logo_black_new.png";
import darkLogoUrl from "../../assets/images/ambient_logo_white_new.png";
import Button from "../shared/button";
import DarkModeToggle, { darkMode } from "../shared/darkModeToggle";

const NavBar: Component = () => {

  return (
    <nav class=" border-b h-14 p-6 flex justify-center fixed backdrop-blur-md backdrop-brightness-125
    bg-neutral-50 dark:bg-neutral-900 border-b-neutral-200 dark:border-b-neutral-800 
    bg-opacity-80 dark:bg-opacity-90 w-full z-50">
      <div class="flex items-center w-full max-w-screen-2xl">
        <div class="flex items-center space-x-4 w-full pt-[1px]">
          <div class="-mt-1">
            <a href="/" class="block dark:hidden w-28"><img src={lightLogoUrl} alt={"Ambient Logo"}/></a>
            <a href="/" class="hidden dark:block w-28"><img src={darkLogoUrl} alt={"Ambient Logo"}/></a>
          </div>
          <a href="https://kevintyj.com" class="font-medium text-sm font-display text-slate-700 dark:text-slate-300 rounded-lg hover:text-slate-900 underline">by Kevin (Taeyoon) Jin</a>
          {/* <a href="/dashboard" class="font-medium text-sm font-display text-slate-700 dark:text-slate-300 rounded-lg hover:text-slate-900">Home</a>
          <a href="/team" class="font-medium text-sm font-display text-slate-700 dark:text-slate-300 rounded-lg hover:text-slate-900">Team</a>
          <a href="/projects" class="font-medium text-sm font-display text-slate-700 dark:text-slate-300 rounded-lg hover:text-slate-900">Projects</a>
          <a href="/reports" class="font-medium text-sm font-display text-slate-700 dark:text-slate-300 rounded-lg hover:text-slate-900">Reports</a> */}
        </div>
        <div class="flex items-center space-x-2">
          <a href="/coming-soon">
            <Button>
              Documentation
            </Button>
          </a>
          <a href="https://github.com/kevintyj/ambient">
            <Button>
              <i class="bi bi-github"></i>
            </Button>
          </a>
          <DarkModeToggle/>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
