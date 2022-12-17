import { Component, createEffect, onError, onMount } from "solid-js"
import { css } from "solid-styled"
import Button from "../../../assets/components/button.styled";
import { colorsToArr } from "../../../functions/colorConfig";
import ToggleColorScale, { visibleColorScale } from "../../shared/toggleColorScale";


const TesterPage: Component = () => {
  const Array = () => visibleColorScale();
  const ColorArray = () => colorsToArr(Array());

  createEffect(() => {
    console.log(ColorArray()[5][2])
  })

  css`
    .text-style{
      color: ${ColorArray()[5][2]};
    }
  `

  return (
    <>
      <ToggleColorScale/>
      <div class="text-2xl text-style">
        Testing Reactivity
      </div>
    </>
  )
}

export default TesterPage
