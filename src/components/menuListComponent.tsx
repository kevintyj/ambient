import {Component, createEffect, createSignal, For, onCleanup, onMount} from "solid-js";
import {ColorShades, ColorShadesLight, textColorScale} from "../shared/styles/utils/variables.styled";
import TesterButton from "../shared/components/testerButton";
import {Flex} from "../shared/styles/components/flex.styled";
import {calcMaxAPCA} from "../shared/styles/functions/contrastCalc";
import {transform} from "lodash";
import TesterMenu from "../shared/components/testerMenu";

type IMenuListComponent<T = {}> = Component<T & {
  mode: 'dark' | 'light',
  baseColor?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | string,
  baseBgColor?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  switchMode?: boolean
  highlight?: boolean
  solid?: boolean
}>

const MenuListcomponent: IMenuListComponent = (props) => {

  const shades = () => props.mode == 'dark' ? ColorShades() : ColorShadesLight()

  const cList = () => Object.values(shades());

  const [active, setActive] = createSignal([true, false, false, false]);

  createEffect(() => {
    console.log(active())
  })

  return(
    <Flex gap={14} flexWrap={"wrap"}>
      <For each={cList()}>{(swatch: Record<number, any>, i) =>
        <Flex flexDirection={"column"}>
          <a onClick={() => setActive([true, false, false, false])}>
            <TesterMenu swatch={swatch} active={active()[0]} solid={props.solid}>
              Active Item
            </TesterMenu>
          </a>
          <a onClick={() => setActive([false, true, false, false])}>
            <TesterMenu swatch={swatch} active={active()[1]} highlight={props.highlight} solid={props.solid}>
              Highlight Item
              <a>
                <i class="bi bi-circle-fill"></i>
              </a>
            </TesterMenu>
          </a>
          <a onClick={() => setActive([false, false, true, false])}>
            <TesterMenu swatch={swatch} active={active()[2]} solid={props.solid}>
              Third Menu Item
            </TesterMenu>
          </a>
          <a onClick={() => setActive([false, false, false, true])}>
            <TesterMenu swatch={swatch} active={active()[3]} solid={props.solid}>
              Fourth Menu Item
            </TesterMenu>
          </a>
        </Flex>
      }</For>
    </Flex>
  )
}

export default MenuListcomponent;
