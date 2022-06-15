import type {Component} from "solid-js";
import {For} from "solid-js";
import {styled} from "solid-styled-components";
import {chunk, forEach, max} from 'lodash';
import chroma from "chroma-js";
import { calcMaxAPCA, calcMaxWCAG } from "../styles/functions/contrastcalc";
import { toast } from "solid-toast";
import Toast from "./toast";
import { arrSize } from "../styles/functions/functions.styled";
import { Flex } from "../styles/components/flex.styled";

type ColorSwatchComponent<T = {}> = Component<T &{
  colorSwatch: Record<string, string>
}>

const ColorSwatch: ColorSwatchComponent = (props) => {

  const swatch = () => props.colorSwatch;
  const aSwatch: { [p: string]: string }[] = Object.entries(swatch()).map(([key, value]) => ({ [key]: value }));
  const swatchKeys: string[] = Object.keys(swatch());
  // @ts-ignore
  const swatchLength: number = Number(swatchKeys[swatchKeys.length - 1].match(/\d+/)[0].charAt(0));
  const splitChunks = () => chunk(aSwatch, arrSize());


  const copy = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      /* clipboard successfully set */
      toast.custom((t) => (
        <Toast box={color} showExit={true} toast={t}>
          Pallette Copied! {color}
        </Toast>
      ));
    }, () => {
      /* clipboard write failed */
      toast.custom((t) => (
        <Toast color={'error'} showExit={true} toast={t}>
          Copying Failed
        </Toast>
      ));
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
    
    return (<i class="bi bi-check-circle"></i>);
  }

  const textArray: Array<Record<string, string>> = [
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

    .helper {
      font-size: 10px;
      line-height: 12px;
      align-self: flex-end;
      margin-top: 8px;
      width: 100%;
    }
  `

  const ContrastPassFail = styled('div')`
    position: absolute;
    top: 0px;
    right: 6px;
    i {
      font-size: 12px;
    }
  `

  const SwatchBox = styled('div')`
    background-color: ${props => props.color};
    height: 84px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 5px 8px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid ${props => chroma(calcMaxAPCA(textArray, props.color ? props.color : textArray[1].BLACK)[2]).alpha(0.21).hex()};
    width: 100%;

    p {
      color: ${props => calcMaxAPCA(textArray, props.color ? props.color : textArray[1].BLACK)[2]} !important;
      font-size: 10px;
      line-height: 12px;
    }
    .contrast {
      opacity: 0;
      align-self: flex-start;
      width: 100%;
      color: white;
      transition: opacity 100ms ease-in-out;
    }

    &:hover {
      .contrast {
        opacity: 1;
      }
    }
  `

  return (
    <>


      <div style={{

      }}>

        <For each={splitChunks()}>{(arr, i) =>
          <SwatchRow>

            <For each={arr}>{(obj, j) =>
            <Flex flexDirection="column" style={{
              'flex-basis': '100%',
              'overflow': 'hidden'
            }}>
              <SwatchBox color={Object.values(obj)[0]} style={{
                border: j() == Math.floor(arrSize() / 2) ? '1px solid white' : '',
                "flex": j() == arrSize() / 2 ? 'none' : '1',
                'border-radius': j() == Math.floor(arrSize() / 2) ? '3px' : '3px'
              }} onClick={() => copy(Object.values(obj)[0])}>
                <ContrastPassFail style={{
                    color: calcMaxAPCA(textArray, Object.values(obj)[0])[2]
                  }}>
                  {calculateContrast(splitChunks()[i()], textArray, Object.values(obj)[0])}
                </ContrastPassFail>
                <p class="contrast">
                  <object style={{
                    color: calcMaxWCAG(splitChunks()[i()], Object.values(obj)[0])[2]
                  }}><strong>WCAG: </strong> {calcMaxWCAG(splitChunks()[i()], Object.values(obj)[0])[0]}</object>
                  <br/>
                  <object style={{
                    color: calcMaxAPCA(splitChunks()[i()], Object.values(obj)[0])[2]
                  }}><strong>APCA: </strong> {calcMaxAPCA(splitChunks()[i()], Object.values(obj)[0])[0]}</object>
                  <br/>
                  <object style={{
                    color: calcMaxAPCA(textArray, Object.values(obj)[0])[2]
                  }}><strong>APCA TEXT: </strong> {calcMaxAPCA(textArray, Object.values(obj)[0])[0]}</object>
                </p>
              </SwatchBox>
              <p class="helper">
                  <strong>{Object.keys(obj)[0]}</strong>
                  <br/>
                  <strong>HEX: </strong>{Object.values(obj)[0]}
                </p>
            </Flex>
            }</For>

          </SwatchRow>
        }</For>

      </div>
    </>
  )
}

export default ColorSwatch;