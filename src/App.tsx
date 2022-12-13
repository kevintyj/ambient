import type { Component } from 'solid-js';
import { Routes, Route } from "@solidjs/router"
import NavBar from "./components/layouts/navBar";
import Button from "./components/shared/button";
import ColorSwatch from "./components/colorSwatch";
import KeyHandler from "./functions/keyHandler";

const App: Component = () => {
  return (
   <>
     <NavBar/>
     <div class="h-16">

     </div>
     <KeyHandler/>
     <div class='pl-24'>
      <div class='flex flex-col gap-y-1 pb-6'>
        <h1 class="font-semibold font-display text-3xl text-slate-800">
          Color Table
        </h1>
        <p class='text-slate-600'>
          Color table of generated colors can be edited here. Only the primary color is considered.Color names must be unique.
        </p>
      </div>
      <h3 class="font-semibold font-display text-xl text-slate-800">
        Flex Design Colors
      </h3>
     </div>
     <ColorSwatch/>
     <Button>
       This is also a button
     </Button>
     <Routes>
        <Route path={"/"}/>
     </Routes>
   </>
  );
};

export default App;
