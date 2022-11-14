import {Component, For, onCleanup, onMount} from "solid-js";
import {ColorShades, ColorShadesLight, textColorScale} from "../shared/styles/utils/variables.styled";
import TesterButton from "../shared/components/testerButton";
import {Flex} from "../shared/styles/components/flex.styled";
import {calcMaxAPCA} from "../shared/styles/functions/contrastCalc";
import {transform} from "lodash";

type IButtonListComponent<T = {}> = Component<T & {
  mode: 'dark' | 'light',
  baseColor: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | string,
  baseBgColor: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  transparent?: boolean,
  border?: boolean,
  strictBorder?: boolean,
  APCAText?: boolean,
}>

const ButtonListComponent: IButtonListComponent = (props) => {

  const shades = () => props.mode == 'dark' ? ColorShades() : ColorShadesLight()

  const cList = () => Object.values(shades());
  const cListName = () => Object.keys(shades());

  const checkTextColor = (swatchObj: Record<any, any>) => {
    if (typeof props.baseColor == "number"){
      if (props.APCAText == true) {
        return calcMaxAPCA(textColorScale(), swatchObj[props.baseBgColor])[2]
      } else {
        return swatchObj[props.baseColor]
      }
    } return props.baseColor
  }

  const checkBgColor = (swatchObj: Record<any, any>) => {
    if (props.transparent) {
      return "transparent"
    } else {
      return swatchObj[props.baseBgColor]
    }
  }

  const checkValidSwatchVal = (num: number) => {
    if (num < 100) {
      return false
    }else if (num > 800) {
      return false
    }
    return true
  }

  return(
    <Flex gap={14} flexWrap={"wrap"}>
      <For each={cList()}>{(swatch: Record<number, any>, i) =>
        <TesterButton
          textColor={checkTextColor(swatch)}
          bgColor={checkBgColor(swatch)}
          borderColor={props.border ? props.transparent ? swatch[400] : swatch[props.baseBgColor + 100] : null}

          hoverBgColor={checkValidSwatchVal(swatch[props.baseBgColor]) ? swatch[props.baseBgColor - 100] : swatch[props.baseBgColor]}
          hoverBorderColor={checkValidSwatchVal(swatch[props.baseBgColor]) ?
            props.border ?
              props.strictBorder ?
                swatch[props.baseBgColor] : props.transparent ? swatch[400] : swatch[props.baseBgColor + 100] : null : null}

          activeBgColor={checkValidSwatchVal(swatch[props.baseBgColor]) ? props.transparent ? swatch[props.baseBgColor] : swatch[props.baseBgColor + 100] : swatch[props.baseBgColor]}
          activeBorderColor={checkValidSwatchVal(swatch[props.baseBgColor]) ?
            props.border ?
              props.strictBorder ?
                swatch[props.baseBgColor + 200] : props.transparent ? swatch[400] : swatch[props.baseBgColor + 100] : null: null}
        >
          {/*Name of the Swatch*/}
          {cListName()[i()]}
        </TesterButton>
      }</For>
    </Flex>
  )
}

export default ButtonListComponent;
