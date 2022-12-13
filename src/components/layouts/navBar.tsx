import {Component} from "solid-js";
import logoUrl from "../../assets/images/ambient_logo_black_new.png";
import Button from "../shared/button";

const NavBar: Component = () => {
  return (
    <nav class="border-b-neutral-200 border-b h-12 p-6 flex justify-center fixed backdrop-blur-lg bg-white bg-opacity-80 w-full z-50">
      <div class="flex items-center w-full max-w-screen-2xl">
        <div class="flex items-center space-x-4 w-full">
          <a href="/"><img src={logoUrl} alt={"Ambient Logo"} class="h-5 pr-4"/></a>
          <a href="/dashboard" class="font-medium text-sm font-display text-slate-700 rounded-lg hover:text-slate-900">Home</a>
          <a href="/team" class="font-medium text-sm font-display text-slate-700 rounded-lg hover:text-slate-900">Team</a>
          <a href="/projects" class="font-medium text-sm font-display text-slate-700 rounded-lg hover:text-slate-900">Projects</a>
          <a href="/reports" class="font-medium text-sm font-display text-slate-700 rounded-lg hover:text-slate-900">Reports</a>
        </div>
        <div class="flex items-center space-x-6">
          <Button>
            Something
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
