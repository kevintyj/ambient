import { Component, createEffect, createSignal, onMount } from "solid-js"
import { colors } from "../../assets/color";
import Button from "../../assets/components/button.styled"
import Select from "../../assets/components/select.styled";
import { generatedColors } from "../../functions/colorConfig";


const DEBUG = true;

export const [currScaleText, setCurrScaleTest] = createSignal('Flex Design Colors (Legacy)')
export const [visibleColorScale, setColorScale] = createSignal(colors())

const ToggleColorScale: Component = () => {
  
  const [currScale, setCurrScale] = createSignal('fc')

  createEffect(() => {
    if (currScale() == 'fc') setColorScale(colors())
    if (currScale() == 'fu') setColorScale(generatedColors())
    else setColorScale(colors())
  })

  const handleColorScaleChange = (type: any) => {
    if (type.target.value == 'fc'){
      setCurrScale('fc')
    } else if (type.target.value == 'fu') {
      setCurrScale('fu')
    };
  }
  return(
    <Select onChange={handleColorScaleChange}>
      <option value={'fc'} selected>
        Flex Design Colors
      </option>
      <option value={'fu'}>
        Flex Design Colors Uniform
      </option>
    </Select>
  )
}

export default ToggleColorScale;