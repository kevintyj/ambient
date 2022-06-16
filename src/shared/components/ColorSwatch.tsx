import {Component, createEffect, createSignal} from "solid-js";
import {For} from "solid-js";
import {styled} from "solid-styled-components";
import {chunk, forEach, max} from 'lodash';
import chroma from "chroma-js";
import { calcMaxAPCA, calcMaxWCAG } from "../styles/functions/contrastcalc";
import { toast } from "solid-toast";
import Toast from "./toast";
import { arrSize } from "../styles/functions/functions.styled";
import { Flex } from "../styles/components/flex.styled";
import { textColorScale } from "../styles/utils/variables.styled";

type ColorSwatchComponent<T = {}> = Component<T &{
  colorSwatch: Record<string, Record<string, string>>

}>

const ColorSwatch: ColorSwatchComponent = (props) => {

  const swatch = () => props.colorSwatch;

  const [textArray, setTextArray] = createSignal(textColorScale());


  createEffect(() => {
    setTextArray(textColorScale());
  })

  // Object.entries(swatch()).forEach(([name, obj]) => {
  //   console.log(name);
  //   console.log(obj);
  //   console.log(Object.entries(obj));
  //   Object.entries(obj).forEach(([keys, value]) => {
  //     console.log(keys);
  //     console.log(value);
  //   })
  // });

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

  const calculateContrast = (swatch: Record<string, string>, textDefault: Record<string, string>, bg: string) => {
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
    border: 1px solid ${props => calcMaxAPCA(textArray(), props.color!)[2] == '#FFFFFF' ? chroma(props.color!).brighten(1.02).hex() : chroma(props.color!).darken(1.02).hex()};
    width: 100%;

    p {
      color: ${props => calcMaxAPCA(textArray(), props.color!)[2]} !important;
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

        <For each={Object.entries(swatch())}>{([name, arr], i) =>
          <>
          <p>
            {name}
          </p>
          <SwatchRow>
            <For each={Object.entries(arr)}>{([name, hex], j) =>
            <Flex flexDirection="column" style={{
              'flex-basis': '100%',
              'overflow': 'hidden'
            }}>
              <SwatchBox color={hex} style={{
                border: j() == Math.floor(arrSize() / 2) ? '1px solid rgba(256, 256, 256, 1)' : '',
                "flex": j() == arrSize() / 2 ? 'none' : '1',
                'border-radius': j() == Math.floor(arrSize() / 2) ? '3px' : '3px'
              }} onClick={() => copy(hex)}>
                <ContrastPassFail style={{
                    color: calcMaxAPCA(textArray(), hex)[2]
                  }}>
                  {calculateContrast(arr, textArray(), hex)}
                </ContrastPassFail>
                <p class="contrast">
                  <object style={{
                    color: calcMaxWCAG(arr, hex)[2]
                  }}><strong>WCAG: </strong> {calcMaxWCAG(arr, hex)[0]}</object>
                  <br/>
                  <object style={{
                    color: calcMaxAPCA(arr, hex)[2]
                  }}><strong>APCA: </strong> {calcMaxAPCA(arr, hex)[0]}</object>
                  <br/>
                  <object style={{
                    color: calcMaxAPCA(textArray(), hex)[2]
                  }}><strong>APCA TEXT: </strong> {calcMaxAPCA(textArray(), hex)[0]}</object>
                </p>
              </SwatchBox>
              <p class="helper">
                  <strong>{name}</strong>
                  <br/>
                  {hex}
              </p>
            </Flex>
            }</For>
          </SwatchRow>
          </>
        }</For>

      </div>
    </>
  )
}

export default ColorSwatch;