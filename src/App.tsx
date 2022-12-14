import type { Component } from 'solid-js';
import { Routes, Route } from "@solidjs/router"
import NavBar from "./components/layouts/navBar";
import ColorTablePage from './pages/colorTablePage';
import ComingSoonPage from './pages/comingSoonPage';

const App: Component = () => {
  return (
   <>
     <NavBar/>
     <div class="h-20">
     </div>
     <Routes>
        <Route path={"/"} component={ColorTablePage}/>
        <Route path={"/coming-soon"} component={ComingSoonPage}/>
        <Route path={"/*"} component={ComingSoonPage}/>
     </Routes>
   </>
  );
};

export default App;
