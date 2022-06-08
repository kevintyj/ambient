import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {createSignal, onCleanup, onMount} from "solid-js";

const App: Component = () => {

  const [color, setColor] = createSignal([256, 256, 256]);

  const [luminanceR, setLuminanceR] = createSignal(0);

  onMount(() => {

  });

  onCleanup(() => {

  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div>

        </div>
        <h1>{ luminanceR() }</h1>
      </header>
    </div>
  );
};

export default App;
