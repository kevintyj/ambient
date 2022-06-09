import type {Component} from 'solid-js';
import GlobalStyles from "./shared/styles/base/global.styled";
import {Container} from "./shared/styles/components/container.styled";
import {Color, ColorMix, ColorRelative, ColorShades} from "./shared/styles/utils/variables.styled";
import {For} from "solid-js";
import chroma from "chroma-js";
import SwatchList from "./shared/components/swatchList";
import ColorSelector from "./shared/components/colorSelector";
import NavBar from './shared/components/navBar';

export type ISwatchItem = {
  name: string;
  swatch: Record<string, string>
}

const App: Component = () => {

  const sList: Array<ISwatchItem> = [
    {
      name: 'Shades Corrected (RGB)',
      swatch: ColorShades
    }, {
      name: 'Blended (Lab Color Mix)',
      swatch: ColorMix
    }, {
      name: 'Relative (HSV & Relative Luminance)',
      swatch: ColorRelative
    }, {
      name: 'Brighten and Darken (Legacy)',
      swatch: Color
    }, 
  ]



  return (
    <>
      <GlobalStyles/>

      <NavBar/>

      <Container style={{
        padding: ` 60px 16px 20px 16px`
      }}>
        <h1 style={{
          "margin-bottom": `15px`,
          "margin-top": `20px`
        }}>
          Color Generation Tool
        </h1>

        <ColorSelector/>

        <SwatchList swatchList={sList}/>
      </Container>
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
            <For each={Object.entries(Color)}>{([key, value], i) =>
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
  );
};

export default App;
