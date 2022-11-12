import {Component, For} from "solid-js";
import { ISwatchItem } from "../../components/colorListComponent";
import ColorSwatch from "./ColorSwatch";
import {Base, textColorScale} from "../styles/utils/variables.styled";

type SwatchListComponent<T = {}> = Component<T & {
    swatchList: ISwatchItem[];
}>

const SwatchList: SwatchListComponent = (props) => {
  const sList = () => props.swatchList;

  return (
    <>
      <For each={sList()}>{(swatch) =>
        <div style={{
          background: swatch.light ? textColorScale().WHITE : textColorScale().BLACK,
          "box-shadow":  swatch.light ? `${Base.MAX_WIDTH - 50}px 0px 0px 0px ${textColorScale().WHITE}, -${Base.MAX_WIDTH - 50}px 0px 0px 0px ${textColorScale().WHITE}` : ''
        }}>
          <h5 style={{
            color: swatch.light ? textColorScale().BLACK : textColorScale().WHITE,
            "padding-top": '24px'
          }}>
            {swatch.name}
          </h5>
          <ColorSwatch colorSwatch={swatch.swatch as unknown as Record<string, Record<string, string>>} light={swatch.light}/>
          <br/>
        </div>
      }</For>
    </>
  )
}

export default SwatchList;
