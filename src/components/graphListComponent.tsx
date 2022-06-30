import { Component, createEffect, createSignal, For } from "solid-js";
import ColorGraph from "../shared/components/colorGraph";
import { Flex } from "../shared/styles/components/flex.styled";
import { Select } from "../shared/styles/components/select.styled";
import { INormal } from "../shared/styles/functions/relativeLuminanceCalc";

type ColorGraphComponent<T = {}> = Component<T &{
  colorSwatch: Record<string, Record<string, string>>
  displayType?: INormal;
}>

const GraphList: ColorGraphComponent = (props) => {

  const swatch = () => props.colorSwatch;

  const [displayType, setDisplayType] = createSignal('to-primary');

  const updateType = (type: any) => {
    setDisplayType(type.target.value);
  }
  
  return(
    <>
      <Flex flexDirection="column" gap={10} style={{
        padding: '0 28px'
      }}>
        <For each={Object.entries(swatch())}>{([name, arr], i) => 
          <ColorGraph colorSwatch={arr} displayType={displayType()}/>
        }</For>
      </Flex>
      <br/>
      <Select value={displayType()} onChange={updateType}>
        <option value='to-primary' selected>
          Primary Normalization (Recommended)
        </option>
        <option value='to-min-max'>
          Min Max Normalization
        </option>
        <option value='none'>
          No Normalization
        </option>
      </Select>
      <br/>
      <p style={{
        'padding-top': '12px',
        'color': 'rgba(256, 256, 256, 0.5)'
      }}>
        Graph Normalization Techniques:
        <br/>
        <strong>No Normalization:</strong> All colors represent the raw 0 to 1 value in luminance.
        <br/>
        <strong>Min Max Normalization:</strong> All data is normalized to min and max of each color group from 0 to 1.
        <br/>
        <strong>Primary Normalization (Recommended):</strong> Luminance values are normalized based on the primary color's luminance value as 0.5 (center).
      </p>
    </>
  )
}

export default GraphList;