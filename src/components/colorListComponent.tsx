import chroma from "chroma-js";
import {Component, createEffect, createSignal, For} from "solid-js";
import SwatchList from "../shared/components/swatchList";
import { Button } from "../shared/styles/components/button.styled";
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
    }, {
      name: 'Blended (Lab Color Mix)',
      swatch: ColorMix()
    }, {
      name: 'Relative (HSV & Relative Luminance)',
      swatch: ColorRelative()
    }, {
      name: 'Brighten and Darken (Legacy)',
      swatch: ColorLegacy()
    }
  ]);

  createEffect(() => {
    console.log('master update');
    setSList([
      {
        name: 'Shades Corrected (RGB)',
        swatch: ColorShades()
      }, {
        name: 'Blended (Lab Color Mix)',
        swatch: ColorMix()
      }, {
        name: 'Relative (HSV & Relative Luminance)',
        swatch: ColorRelative()
      }, {
        name: 'Brighten and Darken (Legacy)',
        swatch: ColorLegacy()
      }
    ])
  })

  return(
    <>
      <h3>
        Generated Colors
      </h3>
      <SwatchList swatchList={sList()}/>
      <Button type="submit">
        Export colors
      </Button>
    </>
  )

}

export default ColorListPage;