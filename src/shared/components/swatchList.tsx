import {Component, createComputed, createEffect, createSignal} from "solid-js";
import {For} from "solid-js";
import { ISwatchItem } from "../../pages/colorListPage";
import ColorSwatch from "./colorSwatch";

type SwatchListComponent<T = {}> = Component<T & {
    swatchList: ISwatchItem[];
  }
>

const SwatchList: SwatchListComponent = (props) => {
  const [sList, setSList] = createSignal(props.swatchList);
  const sListLength: number = Object.keys(sList).length;
  const sLength: number = Object.keys(props.swatchList[0]).length;

  createComputed(() =>{
    setSList(props.swatchList);
  });

  return (
    <>
      <For each={sList()}>{(swatch) =>
        <>
          <h5>
            {swatch.name}
          </h5>
          <ColorSwatch colorSwatch={swatch.swatch}/>
          <br/>
        </>
      }</For>
    </>
  )
}

export default SwatchList;