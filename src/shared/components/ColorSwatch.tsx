import type {Component} from "solid-js";
import {For} from "solid-js";
import {ISwatchItem} from "../../App";
import {styled} from "solid-styled-components";
import {chunk, forEach, max} from 'lodash';
import chroma from "chroma-js";
import { calcMaxAPCA, calcMaxWCAG } from "../styles/functions/contrastcalc";

const ColorSwatch: Component<{colorSwatch: Record<string, string>}> = ({colorSwatch}) => {

  const swatch: Record<string, string> = colorSwatch;
  const aSwatch: { [p: string]: string }[] = Object.entries(swatch).map(([key, value]) => ({ [key]: value }));
  const swatchKeys: string[] = Object.keys(swatch);
  // @ts-ignore
  const swatchLength: number = Number(swatchKeys[swatchKeys.length - 1].match(/\d+/)[0].charAt(0));
  const splitChunks = chunk(aSwatch, 7);


  const copy = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      /* clipboard successfully set */
    }, () => {
      /* clipboard write failed */
    })
  }

  const calculateContrast = (swatch: {[p: string]: string;}[], textDefault: {[p: string]: string}[], bg: string) => {
    const MaxWCAG = Number(calcMaxWCAG(swatch, bg)[0]);
    const MaxAPCA = Number(calcMaxAPCA(swatch, bg)[0]);
    const MaxTextWCAG = Number(calcMaxWCAG(textDefault, bg)[0]);
    const MaxTextAPCA = Number(calcMaxAPCA(textDefault, bg)[0]);

    if (MaxTextWCAG < 4.5 || MaxWCAG < 4.5) {
      if (MaxTextAPCA < 60) {
        return (<i class="bi bi-x-circle"></i>);
      } if (MaxAPCA < 60) {
        return (<i class="bi bi-dash-circle"></i>);
      }
      return (<i class="bi bi-exclamation-circle"></i>);
    }
    
    return (<i class="bi bi-check2-circle"></i>);
  }

  const textArry: Array<Record<string, string>> = [
    {
      WHITE: "#FFFFFF"
    }, {
      BLACK: "#131313"
    }
  ];

  // console.log(swatch);
  // console.log(aSwatch);
  // console.log(swatchKeys);
  // console.log(swatchLength);
  // console.log(splitChunks);

  const SwatchRow = styled('div')`
    display:flex;
    column-gap: 10px;
    padding: 5px 0;
  `

  const ContrastPassFail = styled('div')`
    position: absolute;
    top: 8px;
    right: 8px;
  `

  const SwatchBox = styled('div')`
    background-color: ${props => props.color};
    height: 84px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 8px 10px;
    position: relative;

    p {
      color: ${props => calcMaxAPCA(textArry, props.color ? props.color : textArry[1].BLACK)[2]} !important;
      font-size: 10px;
      font-weight: 400;
      line-height: 12px;
    }
    strong {
      font-weight: 700;
    }
    .contrast {
      display: none;
      opacity: 0;
      align-self: flex-start;
      width: 100%;
      color: white;
    }
    .helper {
      align-self: flex-end;
      margin-top: auto;
      width: 100%;
    }

    &:hover {
      .contrast {
        display: block;
        opacity: 1;
      }
    }
  `

  return (
    <>


      <div style={{

      }}>

        <For each={splitChunks}>{(arr, i) =>
          <SwatchRow>

            <For each={arr}>{(obj, j) =>
            <>
              <SwatchBox color={Object.values(obj)[0]} style={{
                border: j() == 3 ? '1.5px solid white' : '',
                "flex": j() == 3 ? 'none' : '1',
                width: j() == 3 ? '15%' : 'auto',
                'border-radius': j() == 3 ? '4px' : '3px'
              }} onClick={() => copy(Object.values(obj)[0])}>
                <ContrastPassFail style={{
                    color: calcMaxAPCA(textArry, Object.values(obj)[0])[2]
                  }}>
                  {calculateContrast(splitChunks[i()], textArry, Object.values(obj)[0])}
                </ContrastPassFail>
                <p class="contrast">
                  <object style={{
                    color: calcMaxWCAG(splitChunks[i()], Object.values(obj)[0])[2]
                  }}><strong>WCAG: </strong> {calcMaxWCAG(splitChunks[i()], Object.values(obj)[0])[0]}</object>
                  <br/>
                  <object style={{
                    color: calcMaxAPCA(splitChunks[i()], Object.values(obj)[0])[2]
                  }}><strong>APCA: </strong> {calcMaxAPCA(splitChunks[i()], Object.values(obj)[0])[0]}</object>
                  <br/>
                  <object style={{
                    color: calcMaxAPCA(textArry, Object.values(obj)[0])[2]
                  }}><strong>APCA TEXT: </strong> {calcMaxAPCA(textArry, Object.values(obj)[0])[0]}</object>
                </p>
                <p class="helper">
                  <strong>{Object.keys(obj)[0]}</strong>
                  <br/>
                  <strong>HEX: </strong>{Object.values(obj)[0]}
                </p>
              </SwatchBox>
            </>
            }</For>

          </SwatchRow>
        }</For>

      </div>
    </>
  )
}

export default ColorSwatch;