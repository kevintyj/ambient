import { Component, createEffect } from "solid-js";
import { css } from "solid-styled";
import { visibleColorScale } from "../App";
import { BaseBackgroundArr, colorsToArr } from "../functions/colorConfig";
import { calcMaxAPCAText } from "../functions/contrastCalc";
import KeyHandler, { focused } from "../functions/keyHandler";
import ColorSwatchLarge from "./colorSwatchLarge";
import PlaygroundBtn from "./playground/button/playgroundButton";
import { darkMode } from "./shared/darkModeToggle";

const DEBUG = false

const PlaygroundDocumentation: Component = () => {

  const watchingSwatch = () => colorsToArr(visibleColorScale());
  const swatchNames = () => Object.keys(visibleColorScale());
  const focusRow = () => focused()[1]

  const textColor = () => "NEUTRAL" in visibleColorScale() ? 
  [visibleColorScale()["NEUTRAL"]["00"], visibleColorScale()["NEUTRAL"]["09"]] : ['red', 'red'];

  const baseSwatch = () => watchingSwatch()[focusRow()]
  const baseNeutral = () => watchingSwatch()[0]
  const headerColor = () => baseNeutral()[9]
  const bodyColor = () => baseNeutral()[7]
  const boldColor = () => baseNeutral()[8]
  const hintColor = () => baseNeutral()[5]
  const linkColor = () => baseSwatch()[7]

  const codeBG = () => baseNeutral()[0]
  const codeBorder = () => baseNeutral()[1]
  const codeBorderTop = () => baseNeutral()[2]
  const codeColor = () => baseNeutral()[8]

  const buttonBG = () => baseSwatch()[5]

  createEffect(() => {
    if (DEBUG) console.log("Page Effected");
    if (DEBUG) console.log(darkMode());
    if (DEBUG) console.log(watchingSwatch());
  })

  css`
    .link{
      color: ${linkColor()};
    }
    .link-border{
      border-color: ${linkColor()};
    }
    .border-color{
      border-color: ${codeBorder()};
    }
    .heading{
      color: ${headerColor()};
    }
    .paragraph{
      color: ${bodyColor()};
    }
    .bold{
      color: ${boldColor()};
      font-weight: 500;
    }
    .hint{
      color: ${hintColor()}
    }
    .code{
      background-color: ${codeBG()};
      border: 1px solid ${codeBorder()};
      border-top: 1px solid ${codeBorderTop()};
      color: ${codeColor()};
    }
  `

  const calcTextColor = () => {
    return calcMaxAPCAText(buttonBG(), textColor()[0], textColor()[1])
  }

  return (
    <div class="flex flex-col">
      <ColorSwatchLarge swatch={visibleColorScale()} swatchArr={watchingSwatch()}trackIndex='id'/>
      <KeyHandler/>
      <div class="flex pt-6 gap-x-6">
        <div class="flex-none w-64 h-full border-r border-color">
          <div class="flex flex-col pr-6">
            <PlaygroundBtn border={'full'}
              textColor={watchingSwatch()[0][9]}
              color={darkMode() ? watchingSwatch()[0][0] : BaseBackgroundArr[0]}
              hoverColor={darkMode() ? BaseBackgroundArr[1] : BaseBackgroundArr[0]}
              borderColor={watchingSwatch()[0][2]}
              hoverBorderColor={watchingSwatch()[0][1]} selfFlex>
              <i class="bi bi-search pr-3"></i>Quick Search
            </PlaygroundBtn>
            <h5 class="text-md heading font-medium pt-4 pb-2">Getting Started</h5>
            <div class="border-l border-color py-1 px-4 hint">
              Introduction
            </div>
            <div class="font-medium border-l-2 py-1 px-4 link link-border">
              Setup and Install
            </div>
            <div class="border-l border-color py-1 px-4 hint">
              Pre-requisite
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1 grow">
          <a class="link font-semibold">Getting Started</a>
          <h1 class="text-4xl heading font-bold">This is the heading</h1>
          <p class="paragraph">Required setup and install instructions</p>
          <h2 class="text-2xl heading font-bold pt-4">Enviornment Setup</h2>
          <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut <b class="bold">aliquip ex ea commodo consequat.</b> Duis aute irure 
            dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
            proident, sunt in culpa qui officia deserunt mollit anim id 
            est laborum.</p>
          <div class="flex flex-wrap py-2 gap-3">
            <PlaygroundBtn border={'full'}
              textColor={watchingSwatch()[0][9]}
              color={darkMode() ? watchingSwatch()[0][0] : BaseBackgroundArr[0]}
              hoverColor={darkMode() ? BaseBackgroundArr[1] : BaseBackgroundArr[0]}
              borderColor={watchingSwatch()[0][2]}
              hoverBorderColor={watchingSwatch()[0][1]}>
              More documentation
            </PlaygroundBtn>
            <PlaygroundBtn border={'top'} 
              textColor={calcTextColor()}
              color={buttonBG()}
              hoverColor={baseSwatch()[6]}
              borderColor={baseSwatch()[6]}
              hoverBorderColor={baseSwatch()[7]}>
                Go see examples!
            </PlaygroundBtn>
          </div>
          <h2 class="text-2xl heading font-bold pt-4">Using TurboPack</h2>
          <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          <code class="code rounded-md px-5 py-3 mt-4">npx create-spring-turbo@latest</code>
        </div>
      </div>
  </div>
  )
}

export default PlaygroundDocumentation
