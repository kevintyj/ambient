import chroma from "chroma-js";
import {Component, createEffect, createSignal, For} from "solid-js";
import SwatchList from "../shared/components/swatchList";
import { Container } from "../shared/styles/components/container.styled";
import { ColorLegacy, ColorMix, ColorRelative, colorScale, ColorShades} from "../shared/styles/utils/variables.styled";

export type ISwatchItem = {
  name: string;
  swatch: Record<string, string>
}


const ColorListPage: Component = () => {

  const [sList, setSList] = createSignal<Array<ISwatchItem>>([
    {
      name: 'Shades Corrected (RGB)',
      swatch: ColorShades()
    }/*, {
      name: 'Blended (Lab Color Mix)',
      swatch: ColorMix()
    }, {
      name: 'Relative (HSV & Relative Luminance)',
      swatch: ColorRelative()
    }, {
      name: 'Brighten and Darken (Legacy)',
      swatch: ColorLegacy()
    },*/
  ]);

  createEffect(() => {
    console.log('master update');
    setSList([
      {
        name: 'Shades Corrected (RGB)',
        swatch: ColorShades()
      }
    ])
  })

  return(
    <>
      <h4>
        Generated Colors
      </h4>
      <SwatchList swatchList={sList()}/>
      <Container>
        <div style={{
          // display: 'flex',
          display: 'none',
        }}>
          <div style={{
            width: '300px'
          }}>
            <p>
              Constant (Legacy)
            </p>
            <For each={Object.entries(colorScale())}>{([key, value], i) =>
              <div style={{
                background: value,
                color: 'white',
                padding: '5px'
              }}>
                <p>
                  {key.toLowerCase()}
                </p>
                <p>
                  HEX: {value} | HSV: {chroma(value).hsv().map((value) => `${value.toFixed(4)}... `)}
                </p>
              </div>
            }</For>
          </div>
          <div style={{
            width: '300px'
          }}>
            <p>
              Relative (New)
            </p>
            <For each={Object.entries(ColorRelative)}>{([key, value], i) =>
              <div style={{
                background: value,
                color: 'white',
                padding: '5px'
              }}>
                <p>
                  {key.toLowerCase()}
                </p>
                <p>
                  HEX: {value} | HSV: {chroma(value).hsv().map((value) => `${value.toFixed(4)}... `)}
                </p>
              </div>
            }</For>
          </div>
          <div style={{
            width: '300px'
          }}>
            <p>
              Blended (Lab Colour Mix)
            </p>
            <For each={Object.entries(ColorMix)}>{([key, value], i) =>
              <div style={{
                background: value,
                color: 'white',
                padding: '5px'
              }}>
                <p>
                  {key.toLowerCase()}
                </p>
                <p>
                  HEX: {value} | HSV: {chroma(value).hsv().map((value) => `${value.toFixed(4)}... `)}
                </p>
              </div>
            }</For>
          </div>
          <div style={{
            width: '300px'
          }}>
            <p>
              Shades Corrected (RGB)
            </p>
            <For each={Object.entries(ColorShades)}>{([key, value], i) =>
              <div style={{
                background: value,
                color: 'white',
                padding: '5px'
              }}>
                <p>
                  {key.toLowerCase()}
                </p>
                <p>
                  HEX: {value} | HSV: {chroma(value).hsv().map((value) => `${value.toFixed(4)}... `)}
                </p>
              </div>
            }</For>
          </div>
        </div>
      </Container>
    </>
  )

}

export default ColorListPage;