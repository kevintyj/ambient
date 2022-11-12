import {Component, createEffect, For} from "solid-js";
import {styled} from "solid-styled-components";
import chroma from "chroma-js";
import { calcMaxAPCA, calcMaxAPCABG, calcMaxWCAG } from "../styles/functions/contrastcalc";
import { toast } from "solid-toast";
import Toast from "./toast";
import { arrSize } from "../styles/functions/functions.styled";
import { Flex } from "../styles/components/flex.styled";
import { textColorScale } from "../styles/utils/variables.styled";
import { showContrast } from "../../components/colorListComponent";

type ColorSwatchComponent<T = {}> = Component<T &{
  colorSwatch: Record<string, Record<string, string>>,
  light: boolean
}>

const ColorSwatch: ColorSwatchComponent = (props) => {

  const swatch = () => props.colorSwatch;
  const light = () => props.light;

  createEffect(() => {
    textColorScale();
  })

  const copy = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      /* clipboard successfully set */
      toast.custom((t) => (
        <Toast box={color} showExit={true} toast={t}>
          Pallette Copied! {color}
        </Toast>
      ), {
        unmountDelay: 0
      });
    }, () => {
      /* clipboard write failed */
      toast.custom((t) => (
        <Toast color={'error'} showExit={true} toast={t}>
          Copying Failed!
        </Toast>
      ));
    })
  }

  const calculateContrast = (swatch: Record<string, string>, textDefault: Record<string, string>, bg: string) => {
    const MaxWCAG = calcMaxWCAG(swatch, bg)[0];
    const MaxAPCA = calcMaxAPCA(swatch, bg)[0];
    const MaxTextWCAG = calcMaxWCAG(textDefault, bg)[0];
    const MaxTextAPCA = calcMaxAPCA(textDefault, bg)[0];
    const MaxBGAPCA = calcMaxAPCABG(textDefault, bg)[0];

    if (MaxTextWCAG == 'NA' || MaxWCAG == 'NA') {
      if (MaxTextAPCA == 'NA' && MaxBGAPCA) {
        return (<i class="bi bi-x-circle"></i>);
      } if (MaxAPCA == 'NA') {
        return (<i class="bi bi-dash-circle"></i>);
      }
      return (<i class="bi bi-exclamation-circle"></i>);
    }

    return (<i class="bi bi-check-circle"></i>);
  }

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

    .left {
      background-color: aliceblue;
      height: 110px;
      width: 500px;
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

  const calcSwatchStyle = (index: number) => {
    if (index == 0) {
      return {
        'border-radius': '5px 0 0 5px',
        'padding':  '5px 5px 5px 5px',
        'border-width': '1px 0 1px 1px',
        'margin-right': '-5px'
      }
    } if (index == 1) {
      return {
        'border-radius': '0 5px 5px 0',
        'padding':  '5px 5px 5px 5px',
        'border-width': '1px 1px 1px 0',
        'margin': '0 -5px'
      }
    } if (index == arrSize() - 2) {
      return {
        'border-radius': '5px 0 0 5px',
        'padding':  '5px 5px 5px 5px',
        'border-width': '1px 0 1px 1px',
        'margin': '0 -5px'
      }
    } if (index == arrSize() - 1) {
      return {
        'border-radius': '0 5px 5px 0',
        'padding':  '5px 5px 5px 5px',
        'border-width': '1px 1px 1px 0',
        'margin-left': '-5px'
      }
    } else {
      return {
        'padding':  '5px 0',
      }
    }
  }

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
    border: 1px solid ${props => calcMaxAPCA(textColorScale(), props.color!)[2] == '#FFFFFF' ? chroma(props.color!).brighten(1.02).hex() : chroma(props.color!).darken(1.02).hex()};
    width: 100%;

    p {
      color: ${props => calcMaxAPCA(textColorScale(), props.color!)[2]} !important;
      font-size: 10px;
      line-height: 12px;
    }
    .contrast {
      opacity: ${() => showContrast()};
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
        // background: light() ? 'white' : 'none'
      }}>

        <For each={Object.entries(swatch())}>{([name, arr], i) =>
          <>
          <p>
            {name}
          </p>
          <SwatchRow>
            <For each={Object.entries(arr)}>{([name, hex], j) =>
            <Flex flexDirection="column" style={Object.assign({
              'flex-basis': '100%',
              'overflow': 'hidden',
              'border-style': 'solid',
              'border-color': light() ? 'rgba(0, 0, 0, 0.14)' : 'rgba(256, 256, 256, 0.14)',
            }, calcSwatchStyle(j()))}>
              <SwatchBox color={hex} style={{
                border: j() == Math.floor(arrSize() / 2) ? '1px solid rgba(256, 256, 256, 1)' : '',
                "flex": j() == arrSize() / 2 ? 'none' : '1',
                'border-radius': j() == Math.floor(arrSize() / 2) ? '3px' : '3px'
              }} onClick={() => copy(hex)}>
                <ContrastPassFail style={{
                    color: calcMaxAPCA(textColorScale(), hex)[2]
                  }}>
                  {calculateContrast(arr, textColorScale(), hex)}
                </ContrastPassFail>
                <p class="contrast">
                  <object style={{
                    color: calcMaxWCAG(arr, hex)[2]
                  }}><strong>WCAG: </strong> {`${calcMaxWCAG(arr, hex)[1]} (${calcMaxWCAG(arr, hex)[0]})`}</object>
                  <br/>
                  <object style={{
                    color: calcMaxAPCA(arr, hex)[2]
                  }}><strong>APCA: </strong> {`${calcMaxAPCA(arr, hex)[1]} (${calcMaxAPCA(arr, hex)[0]})`}</object>
                  <br/>
                  <object style={{
                    color: calcMaxAPCA(textColorScale(), hex)[2]
                  }}><strong>APCA TEXT: </strong> {calcMaxAPCA(textColorScale(), hex)[0]}</object>
                  <br/>
                  <object style={{
                    color: calcMaxAPCABG(textColorScale(), hex)[2]
                  }}><strong>APCA BG: </strong> {calcMaxAPCABG(textColorScale(), hex)[0]}</object>
                </p>
              </SwatchBox>
              <p class="helper" style={{
                color: light() ? textColorScale().BLACK : textColorScale().WHITE,
              }}>
                  <strong>{name}</strong>
                  <br/>
                  {hex}
              </p>
            </Flex>
            }</For>
          </SwatchRow>
          <Flex flexDirection="row" flexJustify={'space-between'} style={{
            color: light() ? 'rgba(0, 0, 0, 0.4)' : 'rgba(256, 256, 256, 0.4)',
            "margin-top": '-3px',
            padding: '0 5px 9px 5px'
          }}>
            <p style={{
              'font-size': '12px'
            }}>
              BG Color Safe
            </p>
            <p style={{
              'font-size': '12px'
            }}>
              BG Color Safe
            </p>
          </Flex>
          </>
        }</For>

      </div>
    </>
  )
}

export default ColorSwatch;
