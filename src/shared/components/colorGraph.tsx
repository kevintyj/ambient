import { chunk } from "lodash";
import { Component, For } from "solid-js";
import { styled } from "solid-styled-components";
import { ColorIdentifier } from "../styles/components/colorIdentifier.styled";
import { Flex } from "../styles/components/flex.styled";
import { relativeLuminanceCalc } from "../styles/functions/relativeLuminanceCalc";

type ColorGraphComponent<T = {}> = Component<T &{
  colorSwatch: Record<string, string>[]
}>

const ColorGraph: ColorGraphComponent = (props) => {

  const swatch = () => props.colorSwatch;

  const swatchCalc = relativeLuminanceCalc(swatch());


  const ColorGraphNodeText = styled('p')`
    margin-top: -20px;
  `

  const GraphLine = styled('div')`
    width: 100%;
    height: 1px;
    background-color: rgba(256, 256, 256, 0.14);
    margin-top: 8px;
    display: flex;
    justify-content: space-between;

    .start, .end {
      height: 10px;
      margin-top: -4px;
      
      p {
        margin: 12px -2px;
      }
    }

    .start{
      border-left: 1px solid rgba(256, 256, 256, 0.14);
      margin-left: -1px;
    }

    .end {
      border-right: 1px solid rgba(256, 256, 256, 0.14);
      margin-right: -1px;
    }
  `

  return(
    <>
      <Flex style={{
        width: `100%`,
        height: '48px',
        position: 'relative',
        "padding-top": '16px'
      }}>
        <GraphLine>
          <div class="start">
            <p>0</p>
          </div>
          <div class="end">
            <p>1</p>
          </div>
        </GraphLine>
        <For each={Object.entries(swatchCalc)}>{([key, val], i) => 
          <ColorIdentifier color={key} style={{
            position: 'absolute',
            left: `${val}%`
          }}>
            <ColorGraphNodeText>
              {key}
              <br/>
              <br/>
              {val}
            </ColorGraphNodeText>
          </ColorIdentifier>
        }</For>
      </Flex>
    </>
  )
}

export default ColorGraph;