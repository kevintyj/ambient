import { Component, createEffect, createSignal, For } from "solid-js";
import { styled } from "solid-styled-components";
import { ColorIdentifier } from "../styles/components/colorIdentifier.styled";
import { Flex } from "../styles/components/flex.styled";
import { INormal, relativeLuminanceCalc } from "../styles/functions/relativeLuminanceCalc";

type ColorGraphComponent<T = {}> = Component<T &{
  colorSwatch: Record<string, string>[];
  displayType: INormal | string;
}>

const ColorGraph: ColorGraphComponent = (props) => {

  const swatch = () => props.colorSwatch;
  const displayType = () => props.displayType;

  const [swatchCalc, setSwatchCalc] = createSignal(relativeLuminanceCalc(swatch(), displayType()));

  createEffect(() => {
    setSwatchCalc(relativeLuminanceCalc(swatch(), displayType()));
  })

  const ColorGraphNodeText = styled('p')`
    margin-top: -22px;
    font-size: 10px;
    opacity: 0;
    transition: opacity 100ms ease-in-out;
    line-height: 2;
    &:hover {
      opacity: 1;
    }
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
        margin-top: -4px;
      }
    }

    .start{
      border-left: 1px solid rgba(256, 256, 256, 0.14);
      margin-left: -1px;
      p {
        margin-left: -20px;
      }
    }

    .end {
      border-right: 1px solid rgba(256, 256, 256, 0.14);
      margin-right: -1px;
      p {
        transform: translateX(20px);
      }
    }
  `

  return(
    <>
      <Flex style={{
        width: `100%`,
        height: '33px',
        position: 'relative',
        "padding-top": '16px',
        cursor: 'crosshair',
      }}>
        <GraphLine>
          <div class="start">
            <p>0</p>
          </div>
          <div class="end">
            <p>1</p>
          </div>
        </GraphLine>
        <For each={Object.entries(swatchCalc())}>{([key, val], i) => 
          <ColorIdentifier color={key} style={{
            position: 'absolute',
            left: `calc(${val * 100}% - 8px)`
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