import { Component, createEffect, createSignal } from "solid-js"
import Button from "./button"

export const [darkMode, setDarkMode] = createSignal(window.matchMedia('(prefers-color-scheme: dark)').matches)

const DEBUG = true;

const DarkModeToggle: Component = () => {
  createEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (darkMode()) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light');
    }
    if (DEBUG) {
      console.log('Theme dark: ' + darkMode());
      console.log('Local storage theme: ' + localStorage.theme);
    }
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode());
  }

  return(
    <button onClick={() => toggleDarkMode()}>
      <Button>
        DM
      </Button>
    </button>
  )
}

export default DarkModeToggle;