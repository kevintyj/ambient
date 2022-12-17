import { Component, createEffect, createSignal, onMount } from "solid-js"
import { BaseColorScaleDark, colors } from "../../assets/color";
import Select from "../../assets/components/select.styled";
import { generatedColors } from "../../functions/colorConfig";

const DEBUG = true;

export const [currScaleText, setCurrScaleText] = createSignal('Flex Design Colors Uniform')
export const [visibleColorScale, setColorScale] = createSignal(BaseColorScaleDark)

const ToggleColorScale: Component = () => {

  const [currScale, setCurrScale] = createSignal('fu')

  createEffect(() => {
    if (currScale() == 'fc') setColorScale(colors())
    if (currScale() == 'fu') setColorScale(generatedColors())
    else setColorScale(colors())
  })

  const handleColorScaleChange = (type: any) => {
    if (type.target.value == 'fc'){
      setCurrScale('fc')
      setCurrScaleText('Flex Design Colors (Legacy)')
    } else if (type.target.value == 'fu') {
      setCurrScale('fu')
      setCurrScaleText('Flex Design Colors Uniform')
    };
  }
  return(
    <Select value="fu" onChange={handleColorScaleChange}>
      <option value={'fc'}>
        Flex Design Colors
      </option>
      <option value={'fu'} selected>
        Flex Design Colors Uniform
      </option>
    </Select>
  )
}

export default ToggleColorScale;