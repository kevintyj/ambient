import { chunk } from "lodash";
import { Component, For } from "solid-js";
import { styled } from "solid-styled-components";
import ColorGraph from "../shared/components/colorGraph";
import { Flex } from "../shared/styles/components/flex.styled";
import { relativeLuminanceCalc } from "../shared/styles/functions/relativeLuminanceCalc";

type ColorGraphComponent<T = {}> = Component<T &{
  colorSwatch: Record<string, string>
}>

const GraphList: ColorGraphComponent = (props) => {

  const swatch = () => props.colorSwatch;
  const aSwatch: { [p: string]: string }[] = Object.entries(swatch()).map(([key, value]) => ({ [key]: value }));
  const splitChunks = chunk(aSwatch, 7);

  /**
  for (var i of splitChunks){
    console.log(i);
    relativeLuminanceCalc(i);
  }
  */

  return(
    <>
      <Flex flexDirection="column" gap={10}>
        <For each={splitChunks}>{(graph, i) => 
          <ColorGraph colorSwatch={graph}/>
        }</For>
      </Flex>
    </>
  )
}

export default GraphList;