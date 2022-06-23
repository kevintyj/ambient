import {Component, For} from "solid-js";
import { ISwatchItem } from "../../components/colorListComponent";
import ColorSwatch from "./ColorSwatch";

type SwatchListComponent<T = {}> = Component<T & {
    swatchList: ISwatchItem[];
}>

const SwatchList: SwatchListComponent = (props) => {
  const sList = () => props.swatchList;

  return (
    <>
      <For each={sList()}>{(swatch) =>
        <>
          <h5>
            {swatch.name}
          </h5>
          <ColorSwatch colorSwatch={swatch.swatch as unknown as Record<string, Record<string, string>>}/>
          <br/>
        </>
      }</For>
    </>
  )
}

export default SwatchList;