import type { Component } from 'solid-js';
import { Routes, Route } from "@solidjs/router"
import NavBar from "./components/layouts/navBar";
import Button from "./components/shared/button";
import ColorTablePage from './pages/colorTablePage';

const App: Component = () => {
  return (
   <>
     <NavBar/>
     <div class="h-16">
     </div>
     <Routes>
        <Route path={"/"} component={ColorTablePage}/>
     </Routes>
   </>
  );
};

export default App;
