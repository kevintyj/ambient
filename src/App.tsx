import type { Component } from 'solid-js';
import { Routes, Route } from "@solidjs/router"

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  return (
   <>
    Solid is running! That's pretty solid!
     <Routes>
        <Route path={"/"}/>
     </Routes>
   </>
  );
};

export default App;
