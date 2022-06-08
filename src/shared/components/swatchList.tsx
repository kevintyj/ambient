import type {Component} from "solid-js";
import {For} from "solid-js";
import {ISwatchItem} from "../../App";
import {Color} from "../styles/utils/variables.styled";
import ColorSwatch from "./colorSwatch";

const SwatchList: Component<{swatchList: ISwatchItem[]}> = ({swatchList}) => {
  const sList: ISwatchItem[] = swatchList;
  const sListLength: number = Object.keys(sList).length;
  const sLength: number = Object.keys(swatchList[0]).length;

  return (
    <>
      <For each={sList}>{(swatch, i) =>
        <>
          <h5>
            {swatch.name}
          </h5>
          <ColorSwatch colorSwatch={swatch.swatch}/>
        </>
      }</For>
    </>
  )
}

export default SwatchList;