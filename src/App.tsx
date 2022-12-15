import type { Component } from 'solid-js';
import { Routes, Route } from "@solidjs/router"
import NavBar from "./components/layouts/navBar";
import ColorTablePage from './pages/colorTablePage';
import ComingSoonPage from './pages/comingSoonPage';
import Footer from './components/layouts/footer';
import { Toaster } from 'solid-toast';
import PlaygroundPage from './pages/playgroundPage';

const App: Component = () => {
  return (
   <>
      <Toaster 
        position='bottom-right'
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 2000
        }}
      />
     <div class='flex flex-col min-h-screen justify-between bg-white dark:bg-[#181819]'>
      <NavBar/>
      <main class='my-auto'>
        <div class="h-20">
        </div>
        <Routes>
            <Route path={"/"} component={ColorTablePage}/>
            <Route path={"/playground"} component={PlaygroundPage}/>
            <Route path={"/coming-soon"} component={ComingSoonPage}/>
            <Route path={"/*"} component={ComingSoonPage}/>
        </Routes>
        <div class="h-20">
        </div>
      </main>
      <Footer/>
     </div>
   </>
  );
};

export default App;
