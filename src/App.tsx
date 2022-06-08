import type {Component} from 'solid-js';
import GlobalStyles from "./shared/styles/base/global.styled";
import {Container} from "./shared/styles/components/container.styled";
import {Color, ColorRelative} from "./shared/styles/utils/variables.styled";
import {For} from "solid-js";
import chroma from "chroma-js";

const App: Component = () => {

  console.log(Color)



  return (
    <>
      <GlobalStyles/>
      <div style={{
        display: 'flex',
      }}>
        <div style={{
          width: '500px'
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
          width: '500px'
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
      </div>
    </>
  );
};

export default App;
