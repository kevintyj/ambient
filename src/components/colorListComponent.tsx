import {Component, createEffect, createSignal, For} from "solid-js";
import SwatchList from "../shared/components/swatchList";
import { Button } from "../shared/styles/components/button.styled";
import { Flex } from "../shared/styles/components/flex.styled";
import { ColorLegacy, ColorMix, ColorRelative, colorScale, ColorShades} from "../shared/styles/utils/variables.styled";

export type ISwatchItem = {
  name: string;
  swatch: Record<string, Record<string, {}>>
}


const ColorListPage: Component = () => {

  const fileDownloadFull = () => {
    const fileData = JSON.stringify(sList());
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'ambientcolors-full.json';
    link.href = url;
    link.click();
  }

  const fileDownloadTW = () => {
    const fileData = JSON.stringify(sList()[0].swatch);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'ambientcolors-full.json';
    link.href = url;
    link.click();
  }

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
      <Flex flexDirection="row" gap={8} style={{
        margin: '0 0 24px -2px'
      }}>
        <Button type="submit" onclick={fileDownloadFull}>
          Export colors
        </Button>
        <Button type="submit" onclick={fileDownloadTW}>
          Export colors (Tailwind)
        </Button>
      </Flex>
      <SwatchList swatchList={sList()}/>
      <br/>
    </>
  )

}

export default ColorListPage;